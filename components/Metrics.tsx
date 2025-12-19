
import React from 'react';

const Metrics: React.FC = () => {
  return (
    <section className="z-20 bg-[#050505] w-full border-white/5 border-t pt-24 pb-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-fade-up w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            { 
              icon: 'lucide:gauge', 
              label: 'OEE (Эффективность)', 
              val: '+15', 
              unit: '%', 
              desc: 'Рост общей эффективности оборудования после внедрения АСУ ТП.',
              bars: [20, 30, 35, 45, 60, 70, 85, 100]
            },
            { 
              icon: 'lucide:timer-off', 
              label: 'Снижение простоев', 
              val: '-40', 
              unit: '%', 
              desc: 'Сокращение аварийных простоев благодаря техническому аудиту и диагностике.',
              bars: [100, 80, 65, 50, 40, 30, 25, 20]
            },
            { 
              icon: 'lucide:leaf', 
              label: 'Энергосбережение', 
              val: '+25', 
              unit: '%', 
              desc: 'Экономия ресурсов за счет оптимизации алгоритмов BMS и диспетчеризации.',
              bars: [90, 85, 80, 75, 70, 65, 60, 55]
            }
          ].map((card, i) => (
            <div key={i} className="card-shine relative bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#facf39]/30 hover:shadow-[0_0_50px_-12px_rgba(250,207,57,0.2)] transition-all duration-500 hover:-translate-y-1 h-[420px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,207,57,0.08),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <iconify-icon icon={card.icon} className="text-[#facf39] group-hover:scale-110 transition-transform duration-300"></iconify-icon>
                  {card.label}
                </h3>
              </div>
              <div className="relative z-10 my-auto">
                <span className="text-7xl lg:text-8xl font-medium tracking-tighter text-white block group-hover:text-[#facf39] transition-colors duration-500">
                  {card.val}<span className="text-[#facf39] group-hover:text-white transition-colors duration-500">{card.unit}</span>
                </span>
                <p className="text-sm font-light text-neutral-300 mt-2">{card.desc}</p>
              </div>
              <div className="relative z-10 h-16 w-full flex items-end gap-1.5">
                {card.bars.map((h, idx) => (
                  <div key={idx} className="w-full bg-[#facf39]/20 group-hover:bg-[#facf39]/40 rounded-sm transition-all duration-500" style={{ height: `${h}%`, opacity: idx / 8 + 0.2 }}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;
