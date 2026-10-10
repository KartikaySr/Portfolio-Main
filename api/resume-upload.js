import { sendApiError } from '../lib/ai.js';
import { createResumeSession, createResumeUploadUrl, ResumeStorageError } from '../lib/resume-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  try {
    const sessionToken = createResumeSession();
    const { signedURL } = await createResumeUploadUrl(sessionToken);
    return res.status(200).json({ sessionToken, signedURL });
  } catch (error) {
    if (error instanceof ResumeStorageError) return res.status(error.status).json({ error: error.message });
    return sendApiError(res, error);
  }
}
