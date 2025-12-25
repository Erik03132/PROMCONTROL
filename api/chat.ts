// api/chat.ts
// Vercel Serverless Function for Chat with Web Search Integration
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Using Gemini 2.0 Flash with extended thinking for better context
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
  systemInstruction: `Вы - высококвалифицированный инженер в области промышленной автоматизации и руководству техническими системами.

Вы специализируетесь на:
- ПЛК (Программируемые логические контроллеры)
- SCADA системы
- АСУ ТП (Автоматизированные системы управления технологическими процессами)
- Автоматизация BMS (системы управления зданиями)
- Технического аудита и оценки
- Проектирование систем управления

Вы высоко класный специалист готовый оказать практические экспертные советы и по МОГОСТ, ГОСТ, интернациональным стандартам.`,
});

interface Message {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export default async function handler(req: Request): Promise<Response> {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { history } = await req.json();

    if (!history || !Array.isArray(history)) {
      return new Response(
        JSON.stringify({ error: 'Неверные данные' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Get the latest user message
    const latestMessage = history[history.length - 1];
    if (!latestMessage || latestMessage.role !== 'user') {
      return new Response(
        JSON.stringify({ error: 'Не найдено сообщение' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const userQuery = latestMessage.parts[0]?.text || '';

    // Generate response using Gemini with chat history
    const result = await model.generateContent({
      contents: history.map((msg: Message) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.parts,
      })),
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const response = result.response.text();

    return new Response(
      JSON.stringify({
        response: response,
        timestamp: new Date().toISOString(),
        success: true,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
  } catch (error: any) {
    console.error('Chat API Error:', error);

    const errorMessage =
      error?.message || 'Ошибка при генерировании ответа';

    return new Response(
      JSON.stringify({
        error: `Ошибка: ${errorMessage}. Попытайтесь ещё раз.`,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
