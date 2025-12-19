
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-white/5 border-t pt-16 px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 group">
              <div className="flex items-center justify-center w-[24px] h-[24px] rounded-sm bg-gradient-to-br from-[#fbb040] to-[#f9ed32]">
                <iconify-icon icon="lucide:cpu" className="text-black text-sm"></iconify-icon>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white uppercase">PROM CONTROL</span>
            </div>
            <p className="leading-relaxed text-xs text-neutral-300 mb-6">
              Инжиниринг, АСУ ТП и промышленная автоматизация. Стандарты качества и безопасность вашего производства.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Услуги</h4>
            <ul className="space-y-3 text-xs text-neutral-300 font-medium">
              <li><a href="#services" className="hover:text-[#facf39] transition-colors">Разработка ТЗ</a></li>
              <li><a href="#services" className="hover:text-[#facf39] transition-colors">Технический аудит</a></li>
              <li><a href="#services" className="hover:text-[#facf39] transition-colors">Автоматизация BMS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Компания</h4>
            <ul className="space-y-3 text-xs text-neutral-300 font-medium">
              <li><a href="#" className="hover:text-[#facf39] transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-[#facf39] transition-colors">Проекты</a></li>
              <li><a href="#contact" className="hover:text-[#facf39] transition-colors">Контакты</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-400">
          <p>© 2025 ПРОМ КОНТРОЛЬ. Все права защищены.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Системы в норме</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
