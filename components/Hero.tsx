
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col min-h-[85vh] max-w-7xl z-10 mx-auto pt-32 pb-12 px-6 relative items-center justify-center">
      <div className="animate-fade-up delay-100 mb-6">
        <div className="inline-flex bg-slate-950 border-amber-200/90 border rounded-full py-2.5 px-5 backdrop-blur-sm gap-3 items-center">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#facf39] animate-pulse"></span>
          <span className="text-xs font-bold text-neutral-300 tracking-wider uppercase">
            Разработка ТЗ на АСУ ТП
          </span>
        </div>
      </div>

      <h1 className="animate-fade-up delay-200 leading-[0.9] tracking-tighter text-center max-w-6xl mb-10">
        <span className="block text-white font-black text-5xl md:text-8xl lg:text-9xl mb-4">
          Интеллектуальная автоматизация
        </span>
        <span className="text-neutral-500 md:text-5xl lg:text-6xl text-3xl font-medium">
          для стабильного производства
        </span>
      </h1>

      <p className="animate-fade-up delay-300 leading-relaxed md:text-xl text-lg font-light text-neutral-300 tracking-tight text-center max-w-3xl">
        Ваша уверенность в стабильности производства — наш приоритет. Мы предоставляем исчерпывающие доказательства эффективности предлагаемых алгоритмов и систем управления САУ.
      </p>

      <div className="animate-fade-up delay-400 mt-8">
        <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#facf39] hover:bg-[#ffe066] text-black rounded-full font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_-5px_rgba(250,207,57,0.4)] group">
          Заказать технический аудит
          <iconify-icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" width="16"></iconify-icon>
        </a>
      </div>
    </section>
  );
};

export default Hero;
