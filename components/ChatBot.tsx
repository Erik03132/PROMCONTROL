
import React, { useState, useRef, useEffect } from 'react';

интерфейс Сообщение {
  роль: 'пользователь' | 'бот';
  текст: строка;
}

interface ChatBotProps {
  isOpen: логическое значение;
  setIsOpen: (open: boolean) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([
    { роль: 'бот', текст: 'Здравствуйте! Я инженерный ассистент ПРОМ КОНТРОЛЬ. Чем я могу вам помочь? }
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
    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: trimmedInput }]);
    setInputValue('');
    setIsLoading(true);

    пытаться {
      const botResponse = await getGeminiResponse(trimmedInput);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Техническая ошибка. Пожалуйста, посмотрите позже." }]);
      const apiResponse = await fetch('/api/chat', {
        метод: 'POST',
        заголовки: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });
      const data = await apiResponse.json();
      const botResponse = data.response || 'Произошла ошибка при получении ответа.';
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  возвращаться (
    <div className="fixed bottom-6 right-6 z-[100] font-manrope">
      <div className="w-[350px] sm:w-[420px] h-[600px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-fade-up">
        {/* Заголовок */}
        <div className="p-7 bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#facf39] flex items-center justify-center shadow-[0_0_30px_-5px_rgba(250,207,57,0.5)]">
              <iconify-icon icon="lucide:cpu" className="text-black text-2xl"></iconify-icon>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white tracking-tight uppercase">AI Assistant</h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase">Онлайн</span>
              </div>
            </div>
          </div>
          <кнопка
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-neutral-500 hover:text-white transition-all"
          >
            <iconify-icon icon="lucide:x" width="24"></iconify-icon>
          </button>
        </div>

        {/* Сообщения */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#facf39] text-black font-bold rounded-tr-none shadow-xl'
                  : 'bg-neutral-900 text-neutral-200 border border-white/5 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-900 text-neutral-400 border border-white/5 p-4 rounded-3xl rounded-tl-none text-[12px] flex items-center gap-3">
                <iconify-icon icon="line-md:loading-twotone-loop" width="18"></iconify-icon>
                Инженер... думает
              </div>
            </div>
          )}
        </div>

        {/* Вход */}
        <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="relative group">
            <ввод
              type="text"
              значение={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              Placeholder="Введите ваше сообщение..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] py-4 pl-6 pr-14 text-[13px] text-white focus:outline-none focus:border-[#facf39]/50 transition-all placeholder:text-neutral-600"
            />
            <кнопка
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#facf39] text-black flex items-center justify-center hover:bg-[#ffe066] transition-all disabled:opacity-20 shadow-lg active:scale-95"
            >
              <iconify-icon icon="solar:send-bold" width="22"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

экспортировать чат-бот по умолчанию;
