// api/chat.ts
export default async function handler(req: any, res: any) {
   const cleanText = (text: string) => text.replace(/[*_`~]/g, '').trim();

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { history } = req.body;

    // Validate input
    if (!history || !Array.isArray(history) || history.length === 0) {
      res.status(400).json({ error: 'Неверные данные' });
      return;
    }

    // Get the last user message
    const userMessage = history[history.length - 1];
    if (!userMessage || !userMessage.parts || !userMessage.parts[0]) {
      res.status(400).json({ error: 'Неверное сообщение' });
      return;
    }

    // Convert Gemini format to OpenAI format for Perplexity
    const messages = history.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'model' ? 'assistant' : msg.role,
      content: msg.parts[0].text
    }));

    // Add the last user message
    messages.push({
      role: 'user',
      content: userMessage.parts[0].text
    });

    // Call Perplexity API
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: messages,
        temperature: 0.7,
        top_p: 0.95,
        max_tokens: 1024,
        return_citations: true,
        return_images: false,
        search_recency_filter: 'month'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Perplexity API Error:', errorData);
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    console.log('Perplexity Response:', JSON.stringify(data, null, 2));

    const text = cleanText(data.choices[0].message.content);
    const citations = data.citations || [];
    
    res.status(200).json({ 
      text,
      citations
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Ошибка генерации ответа',
      details: error.message 
    });
  }
}
