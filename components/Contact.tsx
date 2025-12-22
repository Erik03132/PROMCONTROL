import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setResponseMessage(data.message);
        // Очистить форму
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
        setResponseMessage(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      setStatus('error');
      setResponseMessage('Не удалось отправить заявку. Проверьте подключение.');
    }
  };

  return (
    <section id="contact" className="bg-[#080808] pt-24 px-6 pb-24 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          <h2 className="text-4xl font-medium text-white tracking-tight mb-6">
            Готовы повысить эффективность производства?
          </h2>
          <p className="text-neutral-300 max-w-md mb-8">
            Оставьте заявку на бесплатную консультацию и аудит ваших производственных мощностей.
          </p>
          <div className="space-y-6">
            {['Комплексный технический аудит', 'Расчет ROI автоматизации', 'Оценка текущей SCADA/MES системы'].map((feat, i) => (
              <div key={i} className="flex items-center gap-4 text-sm text-neutral-300 group">
                <iconify-icon icon="solar:check-circle-linear" className="text-[#facf39] group-hover:scale-125 transition-transform duration-300"></iconify-icon>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-zoom-fade bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-[#facf39]/40 hover:shadow-[0_0_80px_-20px_rgba(250,207,57,0.15)] transition-all duration-700">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Имя</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all"
                  placeholder="Иван"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all"
                  placeholder="Иванов"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Рабочий Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all"
                placeholder="ivan@factory.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Сообщение</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all resize-none"
                placeholder="Опишите вашу задачу..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-[#facf39] hover:bg-[#ffd866] text-black text-sm font-bold tracking-tight transition-all mt-2 shadow-lg hover:shadow-[0_0_40px_-10px_rgba(250,207,57,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Отправка...' : 'Заказать консультацию'}
            </button>

            {/* Сообщение о статусе */}
            {status === 'success' && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                <p className="text-green-400 text-sm">{responseMessage}</p>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
                <p className="text-red-400 text-sm">{responseMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/5 text-center">
        <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Контакты</h3>
        <a href="mailto:info@prom-control.ru" className="flex items-center gap-2 justify-center text-[#facf39] font-lg group-hover:scale-125 transition-transform duration-500">
          <iconify-icon icon="lucide:mail" className="text-[#facf39] text-lg group-hover:scale-125 transition-transform duration-500"></iconify-icon>
          <span className="text-sm font-medium">info@prom-control.ru</span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
