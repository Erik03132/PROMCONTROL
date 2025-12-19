
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
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsLoading(true);

    const botResponse = await getGeminiResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-manrope">
      {/* Chat Window */}
      <div className="w-[350px] sm:w-[400px] h-[500px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
        {/* Header */}
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#facf39] flex items-center justify-center">
              <iconify-icon icon="lucide:cpu" className="text-black text-lg"></iconify-icon>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ИИ-Консультант</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-neutral-400">В сети</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white transition-colors">
            <iconify-icon icon="lucide:x" width="20"></iconify-icon>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'bg-[#facf39] text-black rounded-tr-none' 
                  : 'bg-white/5 text-neutral-200 border border-white/10 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 text-neutral-200 border border-white/10 p-3 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce delay-200"></span>
                </span>
                Инженер печатает...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Задайте вопрос..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#facf39]/50 transition-colors"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#facf39] text-black flex items-center justify-center hover:bg-[#e0b932] transition-colors disabled:opacity-50"
            >
              <iconify-icon icon="solar:send-bold" width="18"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
