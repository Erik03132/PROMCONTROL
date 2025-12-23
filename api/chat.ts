import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании «ПРОМ КОНТРОЛЬ».
Отвечай кратко, профессионально, без использования Markdown (никаких звёздочек и решёток).
Тематика: АСУ ТП, инжиниринг, ТЗ по ГОСТ.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history } = req.body;

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API_KEY not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history || [],
    });

    const lastMessage = history && history.length > 0 ? history[history.length - 1].text : '';
    
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    if (!text) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    return res.status(200).json({
      response: text,
    });

  } catch (error: any) {
    console.error('Ошибка API Gemini:', error);
    return res.status(500).json({
      error: 'Не удалось получить ответ от ИИ',
      details: error.message
    });
  }
}
