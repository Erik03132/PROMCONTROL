
import React from 'react';

const DiagramSection: React.FC = () => {
  return (
    <section className="z-20 overflow-hidden bg-[#050505] w-full border-white/5 border-t pt-24 pb-24 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#facf39]/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="md:text-4xl leading-[1.05] text-2xl font-medium text-white tracking-tight mb-6">
              Результат, подтвержденный документально.
            </h2>
            <p className="leading-relaxed text-lg font-light text-neutral-300 max-w-lg mb-8">
              Наша цель — долгосрочное партнерство, основанное на прозрачности документации (ТЗ, ВОР, ПЗ), высокой скорости реагирования на запросы и безукоризненном соблюдении стандартов.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'lucide:file-check', title: 'Прозрачность процессов', desc: 'Детальная проработка ТЗ и пояснительных записок (ПЗ). Вы всегда знаете, как работает ваша автоматика.' },
                { icon: 'lucide:shield-check', title: 'Стандарты безопасности', desc: 'Безукоризненное соблюдение ГОСТ и международных стандартов при проектировании систем диспетчеризации.' },
                { icon: 'lucide:zap', title: 'Скорость и Эффективность', desc: 'Высокая скорость реагирования на запросы и оптимизация работы промышленного оборудования.' }
              ].map((item, idx) => (
                <div key={idx} className="flex group gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#facf39]/50 group-hover:bg-[#facf39]/10 transition-all duration-300">
                    <iconify-icon icon={item.icon} className="text-neutral-300 group-hover:text-[#facf39] transition-colors" width="14"></iconify-icon>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="leading-relaxed text-sm text-neutral-300 mt-1.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="overflow-hidden min-h-[320px] sm:aspect-[4/3] bg-[#0a0a0a] border-white/10 border rounded-3xl relative shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#facf39 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-30 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#facf39]/20 bg-[#facf39]/10 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facf39] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#facf39]"></span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-[#facf39] uppercase font-mono">SYSTEM: ACTIVE</span>
              </div>

              {/* Responsive Container for Diagram - Adjusted Scaling for Mobile */}
              <div className="relative w-[500px] h-[360px] scale-[0.52] min-[380px]:scale-[0.65] min-[480px]:scale-[0.8] sm:scale-[0.9] md:scale-100 transition-all duration-500 origin-center flex-shrink-0">
                <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none">
                  <g stroke="#facf39" strokeWidth="1.5" strokeOpacity="0.2" fill="none">
                    {/* Paths connect center to center or edge to edge */}
                    <path d="M 90 180 L 105 180" />
                    <path d="M 185 180 L 200 180" />
                    <path d="M 280 180 L 295 180 L 295 90 L 310 90" />
                    <path d="M 280 180 L 295 180 L 295 270 L 310 270" />
                    <path d="M 390 270 L 410 270" />
                  </g>
                </svg>
                
                {/* Node 1: Sensor/Activity */}
                <div className="animate-node-pulse absolute left-[10px] top-[140px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg" style={{ animationDelay: '0s' }}>
                   <iconify-icon icon="lucide:activity" className="text-[#facf39] text-2xl" />
                   <span className="text-[9px] text-neutral-400 mt-1 uppercase font-bold">Сенсор</span>
                </div>
                
                {/* Node 2: PLC */}
                <div className="animate-node-pulse absolute left-[105px] top-[140px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg" style={{ animationDelay: '1s' }}>
                   <iconify-icon icon="lucide:cpu" className="text-[#facf39] text-2xl" />
                   <span className="text-[9px] text-neutral-400 mt-1 uppercase font-bold">ПЛК</span>
                </div>
                
                {/* Node 3: Logic Split */}
                <div className="animate-node-pulse absolute left-[200px] top-[140px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl rotate-45 flex items-center justify-center z-10 shadow-lg" style={{ animationDelay: '2s' }}>
                  <div className="-rotate-45 flex flex-col items-center">
                    <iconify-icon icon="lucide:git-branch" className="text-[#facf39] text-xl" />
                  </div>
                </div>
                
                {/* Node 4: SCADA/HMI */}
                <div className="animate-node-pulse absolute left-[310px] top-[50px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg" style={{ animationDelay: '3s' }}>
                   <iconify-icon icon="lucide:monitor-dot" className="text-[#facf39] text-xl" />
                   <span className="text-[9px] text-neutral-400 mt-1 uppercase font-bold">SCADA</span>
                </div>
                
                {/* Node 5: Actuators */}
                <div className="animate-node-pulse absolute left-[310px] top-[230px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg" style={{ animationDelay: '3.5s' }}>
                   <iconify-icon icon="lucide:settings" className="text-[#facf39] text-2xl animate-spin" style={{ animationDuration: '6s' }} />
                   <span className="text-[9px] text-neutral-400 mt-1 uppercase font-bold">Привод</span>
                </div>
                
                {/* Node 6: Reporting */}
                <div className="animate-node-pulse absolute left-[410px] top-[230px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-xl flex flex-col items-center justify-center z-10 shadow-lg" style={{ animationDelay: '4.5s' }}>
                   <iconify-icon icon="lucide:clipboard-list" className="text-[#facf39] text-xl" />
                   <span className="text-[9px] text-neutral-400 mt-1 uppercase font-bold">Отчет</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagramSection;
