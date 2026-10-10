import { sendApiError } from '../lib/ai.js';
import { deleteResumeSession, getResumeSession, ResumeStorageError } from '../lib/resume-storage.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const token = getResumeSession(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: 'Résumé session expired. Start the review again.' });
  }
  try {
    await deleteResumeSession(token);
    return res.status(200).json({ deleted: true });
  } catch (error) {
    if (error instanceof ResumeStorageError) return res.status(error.status).json({ error: error.message });
    return sendApiError(res, error);
  }
}
