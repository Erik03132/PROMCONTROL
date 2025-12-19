
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании "ПРОМ КОНТРОЛЬ". 
Отвечай кратко, профессионально, без использования Markdown (никаких звездочек и решеток). 
Твои темы: АСУ ТП, инжиниринг, ТЗ по ГОСТ.
`;

export async function getGeminiResponse(userPrompt: string) {
  try {
    // Инициализация строго по гайдлайнам с использованием process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    // Обращаемся к свойству .text
    const text = response.text;
    
    if (!text) {
      return "Извините, не удалось сформировать ответ. Попробуйте еще раз.";
    }

    // Очистка текста от возможных символов разметки
    return text.replace(/[*#_~`]/g, '').trim();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка при обработке запроса. Пожалуйста, убедитесь, что API_KEY настроен верно в панели управления проектом.";
  }
}
