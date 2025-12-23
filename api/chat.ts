// api/chat.ts

import { GoogleGenerativeAI, DynamicRetrievalMode } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { userPrompt } = await req.json();

  const tools = [
    {
      googleSearchRetrieval: {
        dynamicRetrievalConfig: {
          mode: DynamicRetrievalMode.DYNAMIC, // Важно: используем enum, а не строку!
          dynamicThreshold: 0.5,
        },
      },
    },
  ];

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    tools,
  });

  return new Response(JSON.stringify({ response: result.response.text() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
