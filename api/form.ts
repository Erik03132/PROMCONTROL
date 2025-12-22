// Serverless endpoint для обработки формы заявок на консультацию
// Vercel Serverless Function - автоматически деплоится как /api/form

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

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
    // Отправка на email через Resend (АКТИВНО)
    // ============================================
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'erik03132@gmail.com',
      subject: `Новая заявка от ${firstName} ${lastName}`,
      html: `
        <h2>Новая заявка с сайта PROMCONTROL</h2>
        <p><strong>Имя:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Дата: ${formData.timestamp}</em></p>
      `
    });

    // Логирование для отладки
    console.log('📩 Новая заявка отправлена на email:', formData);

    return res.status(200).json({ 
      success: true,
      message: 'Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время!'
    });

  } catch (error: any) {
    console.error('❌ Ошибка обработки формы:', error);
    return res.status(500).json({ 
      error: 'Ошибка сервера. Попробуйте позже или свяжитесь напрямую: erik03132@gmail.com',
      details: error.message 
    });
  }
}
