
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface ChatBotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Здравствуйте! Я — инженер-консультант ПРОМ КОНТРОЛЬ. Чем я могу помочь вам в автоматизации вашего производства сегодня?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await getGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Произошла непредвиденная ошибка. Попробуйте обновить страницу." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-manrope">
      <div className="w-[350px] sm:w-[400px] h-[550px] bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#facf39] flex items-center justify-center shadow-[0_0_20px_-5px_rgba(250,207,57,0.5)]">
              <iconify-icon icon="lucide:cpu" className="text-black text-xl"></iconify-icon>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Инженерный ассистент</h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-neutral-400 font-medium">Система онлайн</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-all"
          >
            <iconify-icon icon="lucide:x" width="20"></iconify-icon>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-fixed">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                m.role === 'user' 
                  ? 'bg-[#facf39] text-black font-semibold rounded-tr-none' 
                  : 'bg-neutral-900 text-neutral-200 border border-white/5 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-neutral-900 text-neutral-400 border border-white/5 p-3.5 rounded-2xl rounded-tl-none text-[12px] flex items-center gap-2">
                <iconify-icon icon="line-md:loading-twotone-loop" width="16"></iconify-icon>
                Инженер анализирует данные...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 border-t border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Опишите задачу или вопрос..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-5 pr-14 text-[13px] text-white focus:outline-none focus:border-[#facf39]/50 focus:ring-1 focus:ring-[#facf39]/20 transition-all placeholder:text-neutral-600"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#facf39] text-black flex items-center justify-center hover:bg-[#ffe066] transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-[#facf39]/10"
            >
              <iconify-icon icon="solar:send-bold" width="20"></iconify-icon>
            </button>
          </div>
          <p className="text-[9px] text-neutral-500 text-center mt-3 uppercase tracking-widest font-medium opacity-50">
            Powered by Gemini 3 Flash
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
