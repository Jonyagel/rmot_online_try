interface ClaudeResponse {
  content: Array<{text: string}>;
}

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export async function callClaude(prompt: string, context?: string): Promise<string> {
  const response = await fetch('/api/claude', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, context })
  });

  if (!response.ok) {
    throw new Error('Failed to get response from Claude');
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return data.response;
}