
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
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API_KEY is not defined in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    const cleanText = (response.text || "").replace(/\*/g, '').trim();
    return cleanText || "Извините, произошла ошибка при генерации ответа.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка связи с ИИ. Пожалуйста, попробуйте позже.";
  }
}
