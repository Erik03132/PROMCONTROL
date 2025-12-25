import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

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

    // Convert history to Gemini format
    const convertedHistory = history.map((msg: Message) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: Array.isArray(msg.parts) ? msg.parts : [{ text: '' }],
    }));

    // Generate response
    const result = await model.generateContent({
      contents: convertedHistory,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    const text = result.response.text();

    res.status(200).json({
      response: text,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    
    res.status(500).json({
      error: error?.message || 'Ошибка при генерировании ответа',
      timestamp: new Date().toISOString(),
    });
  }
}
