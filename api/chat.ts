import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании «ПРОМ КОНТРОЛЬ».
Отвечай кратко, профессионально, без использования Markdown (никаких звёздочек и решёток).
Тематика: АСУ ТП, инжиниринг, ТЭ по ГОСТ.
`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API_KEY not configured' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // 🎯 GROUNDING: Сначала база знаний (когда добавишь), потом Google Search
    const tools: any[] = [];
    
    // Если указан Vertex AI datastore - ищем в базе знаний
    if (process.env.VERTEX_DATASTORE_ID) {
      tools.push({
        retrieval: {
          vertexAiSearch: {
            datastore: `projects/${process.env.GCP_PROJECT_ID}/locations/global/collections/default_collection/dataStores/${process.env.VERTEX_DATASTORE_ID}`
          }
        }
      });
    }
    
    // Google Search как fallback
    tools.push({
      googleSearchRetrieval: {
        dynamicRetrievalConfig: {
          mode: 'MODE_DYNAMIC',
          dynamicThreshold: 0.3 // Автоматически решает, нужен ли поиск
        }
      }
    });

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: [
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      tools: tools.length > 0 ? tools : undefined,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = result.text;

    if (!text) {
      return res.status(500).json({ error: 'No response from AI' });
    }

    // Возвращаем ответ с источниками (если есть)
    return res.status(200).json({ 
      response: text,
      // Метаданные о grounding для будущего отображения источников
      groundingMetadata: result.groundingMetadata || null
    });

  } catch (error: any) {
    console.error('Ошибка API Gemini:', error);
    return res.status(500).json({
      error: 'Не удалось получить ответ от ИИ',
      details: error.message
    });
  }
}
