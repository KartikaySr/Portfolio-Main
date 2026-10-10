import { sendApiError } from '../lib/ai.js';
import { getResumeSession, ResumeStorageError, verifyResumeUpload } from '../lib/resume-storage.js';

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const token = getResumeSession(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: 'Résumé session expired. Start the review again.' });
  }
  const image = req.body?.image;
  const pageNumber = req.body?.pageNumber;
  if (typeof image !== 'string' || image.length < 100 || image.length > 850_000 || !Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > 8) {
    return res.status(400).json({ error: 'The PDF page image is invalid or exceeds the OCR limit.' });
  }
  try {
    await verifyResumeUpload(token);
    const hfToken = process.env.HF_TOKEN?.trim();
    if (!hfToken) return res.status(503).json({ error: 'Scanned-PDF OCR is not configured yet.' });
    const model = process.env.HF_OCR_MODEL?.trim() || 'microsoft/trocr-base-printed';
    const modelPath = model.split('/').map(encodeURIComponent).join('/');
    const response = await fetch(`https://router.huggingface.co/hf-inference/models/${modelPath}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'image/jpeg',
      },
      body: Buffer.from(image, 'base64'),
      signal: AbortSignal.timeout(45_000),
    });
    if (!response.ok) {
      console.error(`Hugging Face OCR request failed with status ${response.status}.`);
      return res.status(502).json({ error: 'Scanned-PDF OCR could not process this page. Please try a text-based PDF.' });
    }
    const data = await response.json();
    const text = Array.isArray(data) && typeof data[0]?.generated_text === 'string' ? data[0].generated_text : '';
    if (!text.trim()) return res.status(200).json({ text: '' });
    return res.status(200).json({ text: text.trim().slice(0, 4000) });
  } catch (error) {
    if (error instanceof ResumeStorageError) return res.status(error.status).json({ error: error.message });
    return sendApiError(res, error);
  }
}
