
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="border-y bg-[#050505] border-white/5 pt-32 px-6 pb-32 relative" id="testimonials">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10 flex justify-center">
          <div className="p-3 rounded-full bg-white/5 border border-white/5">
            <iconify-icon icon="solar:stars-minimalistic-linear" className="text-[#facf39]" width="24"></iconify-icon>
          </div>
        </div>
        <h2 className="md:text-5xl leading-tight text-3xl font-medium text-white tracking-tight mb-8">
          "Команда ПРОМ КОНТРОЛЬ демонстрирует исключительный подход к автоматизации. 
          Никто другой не обеспечивает такую глубину проработки ТЗ и надежность систем."
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex text-xs font-bold text-white bg-neutral-800 w-10 h-10 rounded-full items-center justify-center">АП</div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">Алексей Петров</div>
            <div className="text-xs text-neutral-400">Главный инженер, МеталлСтройМаш</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
