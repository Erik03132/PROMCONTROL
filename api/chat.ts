import { GoogleGenerativeAI } from '@google/generative-ai';

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

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Create chat with history (excluding the last message)
    const chat = model.startChat({
      history: history.slice(0, -1),
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1024,
      },
    });

    // Send the last message and get response
    const result = await chat.sendMessage(userMessage.parts[0].text);
        console.log('Result:', JSON.stringify(result, null, 2));
    const text = result.response.text();
        console.log('Extracted text:', text);

    res.status(200).json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Ошибка генерации ответа',
      details: error.message 
    });
  }
}
