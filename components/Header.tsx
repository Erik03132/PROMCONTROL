
import React from 'react';

interface HeaderProps {
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onContactClick }) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 animate-fade-up">
      <nav className="flex bg-[#0a0a0a]/80 w-full h-12 max-w-5xl border-white/5 border rounded-full pr-2 pl-6 shadow-2xl backdrop-blur-md items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-[28px] h-[28px] rounded-md bg-gradient-to-br from-[#fbb040] to-[#f9ed32]">
            <iconify-icon icon="lucide:cpu" style={{ color: 'black', fontSize: '18px' }}></iconify-icon>
          </div>
          <span className="text-sm font-semibold tracking-tight text-white uppercase">
            PROM CONTROL
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-300">
          <a href="#services" className="hover:text-white transition-colors duration-200">Услуги</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">F.A.Q</a>
          <a href="#contact" className="hover:text-white transition-colors duration-200">Контакты</a>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onContactClick();
            }}
            className="group flex items-center gap-2 hover:bg-[#ffe066] transition-all overflow-hidden bg-[#facf39] border-[#facf39] border rounded-full pt-1.5 pr-4 pb-1.5 pl-4 relative shadow-[0_0_15px_-5px_rgba(250,207,57,0.4)] cursor-pointer"
          >
            <span className="text-xs font-bold text-black tracking-tight">
              Связаться с инженером
            </span>
            <iconify-icon icon="solar:arrow-right-linear" style={{ color: 'black' }} width="12"></iconify-icon>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
