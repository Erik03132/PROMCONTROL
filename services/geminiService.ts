
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании "ПРОМ КОНТРОЛЬ", ведущего эксперта в области АСУ ТП и промышленного инжиниринга.
Твоя задача — консультировать потенциальных клиентов.
ПРАВИЛА ОТВЕТА:
1. Отвечай МАКСИМАЛЬНО ЛАКОНИЧНО. Избегай длинных вступлений и лишних слов.
2. НИКОГДА не используй спецсимволы разметки, такие как звездочки (*), для выделения текста. Текст должен быть чистым.
3. Твой тон — экспертный и деловой.
4. Если вопрос касается услуг, кратко упоминай "ПРОМ КОНТРОЛЬ".
5. Концентрируйся на разработке ТЗ по ГОСТ, автоматизации BMS, SCADA и техническом аудите.
`;

export async function getGeminiResponse(userPrompt: string) {
  try {
    // В некоторых средах process может быть не определен, делаем проверку
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    
    if (!apiKey) {
      console.error("API_KEY is missing in process.env");
      return "Системная ошибка: API ключ не настроен. Пожалуйста, обратитесь к администратору.";
    }

    // Создаем экземпляр при каждом вызове, чтобы гарантировать актуальность ключа
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Немного увеличим для более естественных ответов
        topP: 0.95,
        topK: 40,
      },
    });

    if (!response || !response.text) {
      throw new Error("Empty response from AI");
    }

    // Очистка текста от лишних символов разметки
    const cleanText = response.text.replace(/[*#_~`]/g, '').trim();
    return cleanText;
  } catch (error: any) {
    // Выводим подробности ошибки в консоль для отладки пользователем
    console.error("Gemini API Error details:", error);
    
    if (error.message?.includes("403") || error.message?.includes("PermissionDenied")) {
      return "Ошибка доступа: проверьте, включено ли API в Google Cloud и нет ли ограничений по региону.";
    }
    if (error.message?.includes("404") || error.message?.includes("not found")) {
      return "Ошибка: модель не найдена или API ключ не имеет к ней доступа.";
    }
    
    return "Произошла ошибка связи с ИИ. Пожалуйста, убедитесь, что ваш API ключ активен и привязан к платному аккаунту (billing).";
  }
}
