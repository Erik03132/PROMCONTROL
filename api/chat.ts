// api/chat.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

// Function to search the web for specific domain knowledge
async function searchWebForEngineering(query: string): Promise<string> {
  try {
    // Using Google Search API integrated with Gemini
    // This requires search enabled in your Gemini setup
    const searchQuery = `АСУ ТП автоматизация инжинеринг ${query}`;
    
    // Since we don't have direct web search API, we'll use the model's knowledge
    // augmented with engineering-specific context
    return searchQuery;
  } catch (error) {
    console.error('Search error:', error);
    return '';
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { history } = await req.json();

  // Extract the latest user message for context enhancement
  const latestUserMessage = history[history.length - 1]?.parts?.[0]?.text || '';
  
  // Create an engineering-focused system prompt
  const systemPrompt = `Вы - опытный инженер в области автоматизации и систем управления промышленным оборудованием. Можете помочь с выбором вида тахографа (ТОТХ), ПЛК, SCADA систем, расчётом ятоги ресурсов BMS, а также с другими вопросами в области технического аудита и проектирования. Но во внимание темо, что за кадом вапросом стандартные нормы и наложения безопасности.`;

  const tools = [
    {
      googleSearch: {},
    },
  ];

  try {
    // Enhance history with system context
    const enhancedHistory = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      ...history,
    ];

    // Generate response using the model
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: latestUserMessage }],
        },
      ],
      tools,
    });

    const response = result.response.text();

    return new Response(
      JSON.stringify({ response: response }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error:
          'Ошибка при генерировании ответа. Попытайтесь позже.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
