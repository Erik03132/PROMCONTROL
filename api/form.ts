// Serverless endpoint для обработки формы заявок на консультацию
// Vercel Serverless Function - автоматически деплоится как /api/form

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  timestamp?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS для локальной разработки (можно убрать для прода)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, message } = req.body as FormData;

    // Валидация
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ 
        error: 'Заполните все обязательные поля' 
      });
    }

    // Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Некорректный email' });
    }

    const formData: FormData = {
      firstName,
      lastName,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    // ============================================
    // ВАРИАНТ 1: Отправка на email через Resend
    // ============================================
    // Раскомментируй и установи: npm install resend
    // Добавь RESEND_API_KEY в Vercel Environment Variables
    /*
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Замени на свой домен
      to: 'info@prom-control.ru',
      subject: `Новая заявка от ${firstName} ${lastName}`,
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
        <p><em>Дата: ${formData.timestamp}</em></p>
      `
    });
    */

    // ============================================
    // ВАРИАНТ 2: Сохранение в Firebase Firestore
    // ============================================
    // Установи: npm install firebase-admin
    // Добавь FIREBASE_ADMIN_SDK (JSON) в Vercel env
    /*
    const admin = await import('firebase-admin');
    
    if (!admin.apps.length) {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_ADMIN_SDK || '{}'
      );
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    const db = admin.firestore();
    await db.collection('leads').add(formData);
    */

    // ============================================
    // ВАРИАНТ 3: Webhook в Telegram Bot
    // ============================================
    // Добавь TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в env
    /*
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `🔔 Новая заявка\n\n👤 ${firstName} ${lastName}\n📧 ${email}\n\n💬 ${message}`,
        parse_mode: 'HTML'
      })
    });
    */

    // ============================================
    // ВАРИАНТ 4: Простое логирование (для теста)
    // ============================================
    console.log('📩 Новая заявка:', formData);

    return res.status(200).json({ 
      success: true,
      message: 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время!'
    });

  } catch (error: any) {
    console.error('❌ Ошибка обработки формы:', error);
    return res.status(500).json({ 
      error: 'Ошибка сервера. Попробуйте позже или свяжитесь напрямую: info@prom-control.ru',
      details: error.message 
    });
  }
}
