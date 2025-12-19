
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" class="bg-[#080808] pt-24 px-6 pb-24 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-medium text-white tracking-tight mb-6">
            Готовы повысить эффективность производства?
          </h2>
          <p className="text-neutral-300 max-w-md mb-8">
            Оставьте заявку на бесплатную консультацию и аудит ваших производственных мощностей.
          </p>
          <div className="space-y-6">
            {['Комплексный технический аудит', 'Расчет ROI автоматизации', 'Оценка текущей SCADA/MES системы'].map((feat, i) => (
              <div key={i} className="flex items-center gap-4 text-sm text-neutral-300">
                <iconify-icon icon="solar:check-circle-linear" className="text-[#facf39]"></iconify-icon>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Имя</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/50 transition-colors" placeholder="Иван" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-300 ml-1">Фамилия</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/50 transition-colors" placeholder="Иванов" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Рабочий Email</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/50 transition-colors" placeholder="ivan@factory.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-300 ml-1">Сообщение</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#facf39]/50 transition-colors resize-none" placeholder="Опишите вашу задачу..."></textarea>
            </div>
            <button type="button" className="w-full py-3.5 rounded-xl bg-[#facf39] hover:bg-[#e0b932] text-black text-sm font-semibold tracking-tight transition-colors mt-2">
              Заказать консультацию
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <h3 className="text-xs font-bold text-neutral-300 uppercase tracking-widest mb-4">Контакты</h3>
            <a href="mailto:info@prom-control.ru" className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#facf39]/30 transition-all group">
              <iconify-icon icon="lucide:mail" className="text-[#facf39] text-lg group-hover:scale-110 transition-transform"></iconify-icon>
              <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">info@prom-control.ru</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
