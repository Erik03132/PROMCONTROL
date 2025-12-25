import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { history } = req.body;

    // Validate input
    if (!history || !Array.isArray(history) || history.length === 0) {
      res.status(400).json({ error: 'Неверные данные' });
      return;
    }

    // Get the last user message
    const userMessage = history[history.length - 1];
    if (!userMessage || !userMessage.parts || !userMessage.parts[0]) {
      res.status(400).json({ error: 'Неверное сообщение' });
      return;
    }

    // Initialize Google GenAI with new SDK
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Convert history to new SDK format
    const contents = history.map((msg: Message) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: Array.isArray(msg.parts) ? msg.parts : [{ text: '' }],
    }));

    // Generate response using new SDK structure
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: contents,
      config: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Extract text from response
    const text = response.text || '';

    res.status(200).json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Ошибка генерации ответа',
      details: error.message 
    });
  }
}
