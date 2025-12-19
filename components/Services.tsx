
import React from 'react';

const servicesData = [
  { id: '01', icon: 'lucide:file-code', title: 'Разработка ТЗ на АСУ ТП', desc: 'Комплексная разработка технических заданий для автоматизированных систем управления, обеспечивающая точность реализации.', img: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80' },
  { id: '02', icon: 'lucide:clipboard-check', title: 'Технический аудит оборудования', desc: 'Глубокий анализ состояния оборудования и систем управления. Выявление узких мест и рисков простоя.', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80' },
  { id: '03', icon: 'lucide:cpu', title: 'Системы управления САУ', desc: 'Проектирование и внедрение надежных систем автоматического управления для повышения производительности.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { id: '04', icon: 'lucide:building-2', title: 'Автоматизация BMS', desc: 'Интеграция систем жизнеобеспечения зданий для контроля климата, освещения и энергопотребления.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: '05', icon: 'lucide:monitor-check', title: 'Проектирование диспетчеризации', desc: 'Создание централизованных пунктов управления и SCADA-систем для оперативного мониторинга.', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { id: '06', icon: 'lucide:book-open', title: 'Технические регламенты', desc: 'Услуги написания регламентов, эксплуатационных инструкций и паспортов в соответствии с ГОСТ.', img: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=800&q=80' },
];

const Services: React.FC = () => {
  return (
    <section className="bg-[#080808] border-white/5 border-t pt-24 px-6 pb-24 relative" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#facf39]"></span>
            <span className="text-xs font-medium text-neutral-300 tracking-wide uppercase">Наши Компетенции</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight">Инжиниринговые услуги</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((svc) => (
            <div key={svc.id} className="card-shine group relative flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-[#facf39]/30 hover:shadow-[0_0_50px_-12px_rgba(250,207,57,0.15)] transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-[#facf39]/5 mix-blend-overlay z-10"></div>
                <img src={svc.img} alt={svc.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent z-10"></div>
                <div className="absolute top-4 right-4 text-5xl font-bold text-white/[0.05] group-hover:text-[#facf39]/10 transition-colors z-20">{svc.id}</div>
              </div>
              <div className="p-8 pt-4 flex flex-col flex-grow relative z-20">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#facf39] mb-4 group-hover:scale-110 group-hover:border-[#facf39]/40 group-hover:bg-[#facf39]/10 transition-all duration-300 -mt-10 shadow-xl backdrop-blur-sm">
                  <iconify-icon icon={svc.icon} width="20"></iconify-icon>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 tracking-tight group-hover:text-[#facf39] transition-colors">{svc.title}</h3>
                <p className="text-sm text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
