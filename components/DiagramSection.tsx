
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

          <div className="order-1 lg:order-2 relative group">
            <div className="overflow-hidden aspect-square md:aspect-[4/3] bg-[#0a0a0a] border-white/10 border rounded-3xl relative shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#facf39 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
              <div className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#facf39]/20 bg-[#facf39]/10 backdrop-blur-md shadow-lg shadow-[#facf39]/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#facf39] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#facf39]"></span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide text-[#facf39] uppercase font-mono">SCADA: ACTIVE</span>
              </div>

              <div className="flex z-10 p-4 absolute inset-0 items-center justify-center">
                <div className="sm:scale-[0.75] md:scale-[0.9] lg:scale-100 transition-transform origin-center select-none w-[530px] h-[400px] max-w-full relative scale-[0.6]">
                  <svg className="absolute inset-0 w-full h-full z-0 overflow-visible pointer-events-none">
                    <g stroke="#facf39" strokeWidth="1.5" strokeOpacity="0.2" fill="none">
                      <path d="M 100 200 L 120 200" />
                      <path d="M 200 200 L 220 200" />
                      <path d="M 300 200 L 315 200 L 315 100 L 330 100" />
                      <path d="M 300 200 L 315 200 L 315 300 L 330 300" />
                      <path d="M 410 300 L 430 300" />
                    </g>
                  </svg>
                  
                  {/* Nodes implementation would follow the visual style */}
                  <div className="absolute left-[20px] top-[160px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md flex flex-col items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                     <iconify-icon icon="lucide:activity" className="text-[#facf39] text-2xl" />
                  </div>
                  <div className="absolute left-[120px] top-[160px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md flex flex-col items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                     <iconify-icon icon="lucide:cpu" className="text-[#facf39] text-2xl" />
                     <span className="text-[10px] text-neutral-300">ПЛК</span>
                  </div>
                  <div className="absolute left-[220px] top-[160px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md rotate-45 flex items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                    <div className="-rotate-45 flex flex-col items-center">
                      <iconify-icon icon="lucide:git-branch" className="text-[#facf39] text-xl" />
                    </div>
                  </div>
                  <div className="absolute left-[330px] top-[60px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md flex flex-col items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                     <iconify-icon icon="lucide:monitor-dot" className="text-[#facf39] text-xl" />
                     <span className="text-[10px] text-neutral-300">SCADA</span>
                  </div>
                  <div className="absolute left-[330px] top-[260px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md flex flex-col items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                     <iconify-icon icon="lucide:settings" className="text-[#facf39] text-2xl animate-spin" style={{ animationDuration: '8s' }} />
                     <span className="text-[10px] text-neutral-300">Приводы</span>
                  </div>
                   <div className="absolute left-[430px] top-[260px] w-20 h-20 bg-[#161616] border border-[#facf39]/30 rounded-md flex flex-col items-center justify-center z-10 shadow-lg group hover:border-[#facf39] transition-all">
                     <iconify-icon icon="lucide:clipboard-list" className="text-[#facf39] text-xl" />
                     <span className="text-[10px] text-neutral-300">Отчеты</span>
                  </div>
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
