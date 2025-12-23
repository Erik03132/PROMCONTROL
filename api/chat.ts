// api/chat.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `
Ты — профессиональный ассистент компании «ПРОМ КОНТРОЛЬ» по промышленной автоматизации.

ВАЖНО: 
- Всегда отвечай на конкретный вопрос пользователя
- Используй информацию из Google Search для предоставления актуальных данных
- Отвечай кратко и по существу, без использования Markdown
- Если вопрос о АСУ ТП, инжиниринге, ГОСТ — давай профессиональный ответ
- Не спрашивай "Чем могу помочь?" — сразу отвечай на вопрос
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

    // Используем Gemini 2.0 Flash Thinking для лучшего анализа
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-thinking-exp-1219',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Передаём всю историю сообщений
    const result = await model.generateContent({
      contents: history,
      tools: [{
        googleSearchRetrieval: {
          dynamicRetrievalConfig: {
            mode: 'MODE_DYNAMIC',
            dynamicThreshold: 0.3 // Автоматически использует поиск когда нужно
          }
        }
      }],
    });

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
