const MODEL = 'openai/gpt-oss-120b';

export class AiServiceError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = 'AiServiceError';
    this.status = status;
  }
}

export async function completeWithAi(messages, maxTokens = 1200) {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new AiServiceError('The AI service is not configured yet.', 503);
  }

  let response;
  try {
    response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.35,
        max_tokens: maxTokens,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    console.error('AI provider request could not be completed.', error);
    throw new AiServiceError('The AI service could not be reached. Please try again.');
  }

  if (!response.ok) {
    console.error(`AI provider request failed with status ${response.status}.`);
    throw new AiServiceError('The AI provider could not complete this request. Please try again.');
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    console.error('AI provider returned an empty response.');
    throw new AiServiceError('The AI provider returned an empty response. Please try again.');
  }

  return content.replace(/<think>[\s\S]*?(?:<\/think>|$)/g, '').trim();
}

export function sendApiError(res, error) {
  if (error instanceof AiServiceError) {
    return res.status(error.status).json({ error: error.message });
  }

  console.error('AI API request failed unexpectedly.', error);
  return res.status(500).json({ error: 'The request could not be processed. Please try again.' });
}
