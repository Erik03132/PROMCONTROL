
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Ты — интеллектуальный ассистент компании "ПРОМ КОНТРОЛЬ". 
Отвечай кратко, профессионально, без использования Markdown (никаких звездочек и решеток). 
Твои темы: АСУ ТП, инжиниринг, ТЗ по ГОСТ.
`;

export async function getGeminiResponse(userPrompt: string) {
  try {
    // Согласно инструкциям: создаем экземпляр прямо перед вызовом
    // и используем process.env.NEXT_PUBLIC_API_KEY напрямую.
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");

    // Очистка от Markdown если модель его применила
    return text.replace(/[*#_~`]/g, '').trim();
  } catch (error: any) {
    console.error("Gemini Service Error Detail:", error);
    
    // Если ошибка связана с ключом, API вернет 403 или 400
    if (error.message?.includes("API_KEY_INVALID") || error.message?.includes("API key not found")) {
      return "Ошибка доступа: API ключ не распознан. Пожалуйста, проверьте настройки переменной API_KEY в Vercel и убедитесь, что был выполнен Redeploy.";
    }
    
    return "Не удалось связаться с ИИ-модулем. Пожалуйста, попробуйте позже или используйте форму обратной связи.";
  }
}
