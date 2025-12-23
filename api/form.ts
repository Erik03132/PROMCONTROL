// api/form.ts

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const data = await req.json();

  // Здесь ваша логика отправки email через Resend/Firebase/Telegram и т.д.
  // Например:
  // await sendEmail(data);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
