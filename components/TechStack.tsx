
import React from 'react';

const TechStack: React.FC = () => {
  return (
    <div className="w-full border-t border-white/5 bg-[#050505] relative z-20">
      <div className="max-w-7xl mx-auto py-12 px-6">
        <p className="text-[10px] uppercase text-neutral-300 tracking-widest font-mono text-center mb-10">
          Мы работаем с оборудованием и ПО:
        </p>
        <div className="flex flex-wrap md:gap-16 text-neutral-400 grayscale hover:grayscale-0 hover:text-white transition-all duration-500 gap-10 items-center justify-center">
          <iconify-icon icon="simple-icons:siemens" width="45"></iconify-icon>
          <iconify-icon icon="simple-icons:schneiderelectric" width="45"></iconify-icon>
          <iconify-icon icon="simple-icons:abb" width="45"></iconify-icon>
          <iconify-icon icon="simple-icons:rockwellautomation" width="32"></iconify-icon>
          <iconify-icon icon="simple-icons:autodesk" width="32"></iconify-icon>
          <iconify-icon icon="simple-icons:python" width="32"></iconify-icon>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
