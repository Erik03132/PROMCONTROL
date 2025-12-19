
import React from 'react';

const Contact: React.FC = () => {
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
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Имя</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all" placeholder="Иван" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Фамилия</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all" placeholder="Иванов" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Рабочий Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all" placeholder="ivan@factory.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Сообщение</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/70 focus:bg-white/[0.08] transition-all resize-none" placeholder="Опишите вашу задачу..."></textarea>
            </div>
            <button type="button" className="w-full py-3.5 rounded-xl bg-[#facf39] hover:bg-[#ffe066] text-black text-sm font-bold tracking-tight transition-all mt-2 shadow-lg hover:shadow-[#facf39]/20">
              Заказать консультацию
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Контакты</h3>
            <a href="mailto:info@prom-control.ru" className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#facf39]/50 transition-all group">
              <iconify-icon icon="lucide:mail" className="text-[#facf39] text-lg group-hover:scale-125 transition-transform duration-500"></iconify-icon>
              <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">info@prom-control.ru</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
