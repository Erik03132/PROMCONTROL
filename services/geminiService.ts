
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании "ПРОМ КОНТРОЛЬ".
ПРАВИЛА:
1. Отвечай максимально лаконично и по делу.
2. Не используй разметку Markdown (звездочки, решетки).
3. Тон экспертный, инженерный.
4. Темы: АСУ ТП, проектирование, ТЗ по ГОСТ, аудит оборудования.
`;

export async function getGeminiResponse(userPrompt: string) {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("Критическая ошибка: Переменная окружения API_KEY не найдена. Проверьте настройки Vercel!");
      return "Системная ошибка: API ключ не настроен. Пожалуйста, убедитесь, что вы добавили переменную API_KEY в Vercel и сделали редеплой.";
    }

    // Инициализация строго по гайдлайнам
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    // Обращение к .text как к свойству
    const text = response.text;

    if (!text) {
      throw new Error("Модель вернула пустой ответ");
    }

    return text.replace(/[*#_~`]/g, '').trim();
  } catch (error: any) {
    console.error("Gemini API Error Context:", error);
    
    if (error.message?.includes("API key not valid")) {
      return "Ошибка: Ваш API ключ недействителен. Проверьте его в Google AI Studio.";
    }
    
    if (error.message?.includes("User location is not supported")) {
      return "Ошибка: Данный регион не поддерживается Google API. Попробуйте использовать другой сервер или VPN для деплоя (хотя для Vercel это редкость).";
    }

    return "Произошла ошибка при связи с инженерным модулем. Пожалуйста, попробуйте позже.";
  }
}
