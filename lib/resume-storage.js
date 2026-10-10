import { createHash, randomBytes } from 'node:crypto';

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const BUCKET = process.env.SUPABASE_RESUME_BUCKET?.trim() || 'resume-uploads';

export class ResumeStorageError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = 'ResumeStorageError';
    this.status = status;
  }
}

function credentials() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new ResumeStorageError('Private résumé storage is not configured. Set the Supabase URL and server-only service-role key.', 503);
  }
  return { url: url.replace(/\/+$/, ''), key };
}

async function storageRequest(path, options = {}) {
  const { url, key } = credentials();
  let response;
  try {
    response = await fetch(`${url}/storage/v1${path}`, {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        ...(options.body && typeof options.body !== 'string' ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    console.error('Supabase Storage request could not be completed.', error);
    throw new ResumeStorageError('Private résumé storage could not be reached.');
  }
  if (!response.ok) {
    const message = await response.text();
    console.error(`Supabase Storage request failed with status ${response.status}: ${message.slice(0, 500)}`);
    throw new ResumeStorageError('Private résumé storage could not complete the request.', response.status >= 500 ? 502 : response.status);
  }
  return response;
}

export async function ensureResumeBucket() {
  const { url, key } = credentials();
  let check;
  try {
    check = await fetch(`${url}/storage/v1/bucket/${encodeURIComponent(BUCKET)}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    console.error('Supabase bucket check could not be completed.', error);
    throw new ResumeStorageError('Private résumé storage could not be reached.');
  }
  if (check.ok) {
    const bucket = await check.json();
    if (bucket.public === true) {
      throw new ResumeStorageError('The résumé storage bucket must be private. Set it to private in Supabase Storage.', 503);
    }
    return;
  }
  if (check.status !== 404) {
    console.error(`Supabase bucket check failed with status ${check.status}.`);
    throw new ResumeStorageError('Private résumé storage could not verify its bucket.', 502);
  }

  const created = await fetch(`${url}/storage/v1/bucket`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: false,
      file_size_limit: MAX_UPLOAD_BYTES,
      allowed_mime_types: ['application/pdf', 'application/json'],
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!created.ok && created.status !== 409) {
    const message = await created.text();
    console.error(`Supabase bucket creation failed with status ${created.status}: ${message.slice(0, 500)}`);
    throw new ResumeStorageError('Private résumé storage could not create its bucket.', 502);
  }
}

export function createResumeSession() {
  return randomBytes(32).toString('base64url');
}

function sessionPrefix(token) {
  if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{40,50}$/.test(token)) {
    throw new ResumeStorageError('The résumé session is invalid. Start the review again.', 400);
  }
  const digest = createHash('sha256').update(token).digest('hex');
  return digest;
}

export function getResumeSession(authorization) {
  if (!authorization?.startsWith('Bearer ')) return null;
  const token = authorization.slice(7);
  return /^[A-Za-z0-9_-]{40,50}$/.test(token) ? token : null;
}

export function resumeObjectPath(token, filename) {
  if (!['resume.pdf', 'report.json'].includes(filename)) {
    throw new ResumeStorageError('The requested résumé object is invalid.', 400);
  }
  return `${sessionPrefix(token)}/${filename}`;
}

export async function createResumeUploadUrl(token) {
  await ensureResumeBucket();
  const path = resumeObjectPath(token, 'resume.pdf');
  const response = await storageRequest(`/object/upload/sign/${encodeURIComponent(BUCKET)}/${path}`, {
    method: 'POST',
    body: JSON.stringify({ upsert: false }),
  });
  const data = await response.json();
  const returnedURL = typeof data.url === 'string' ? data.url : data.signedURL;
  if (typeof returnedURL !== 'string' || !returnedURL) {
    console.error('Supabase did not return a signed upload URL.');
    throw new ResumeStorageError('Private résumé storage returned an invalid upload URL.');
  }
  const { url } = credentials();
  const signedURL = returnedURL.startsWith('http') ? returnedURL : `${url}/storage/v1${returnedURL}`;
  return { signedURL, path };
}

export async function verifyResumeUpload(token) {
  const path = resumeObjectPath(token, 'resume.pdf');
  await storageRequest(`/object/${encodeURIComponent(BUCKET)}/${path}`, { method: 'HEAD' });
}

export async function deleteResumeSession(token) {
  const files = ['resume.pdf', 'report.json'].map((filename) => resumeObjectPath(token, filename));
  await storageRequest(`/object/${encodeURIComponent(BUCKET)}`, {
    method: 'DELETE',
    body: JSON.stringify({ prefixes: files }),
  });
}

export const resumeMaxBytes = MAX_UPLOAD_BYTES;
