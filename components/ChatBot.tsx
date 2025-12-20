import React, { useState, useRef, useEffect } from 'react';

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
    { role: 'bot', text: 'Здравствуйте! Я инженерный ассистент ПРОМ КОНТРОЛЬ. Чем я могу вам помочь?' }
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

    try {
      const apiResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({history: [...messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',          parts: [{ text: msg.text }]
        })), { role: 'user', parts: [{ text: trimmedInput }] }]
      });
      const data = await apiResponse.json();
      const botResponse = data.response || 'Произошла ошибка при получении ответа.';
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Техническая ошибка. Пожалуйста, посмотрите позже.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-manrope">
      <div className="w-[350px] sm:w-[420px] h-[600px] bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(250,207,57,0.2)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-7 bg-gradient-to-b from-white/[0.05] to-transparent border-b border-white/10 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#facf39] flex items-center justify-center shadow-[0_0_30px_-5px_rgba(250,207,57,0.7)]">
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
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-neutral-500 hover:text-white transition-all duration-200"
          >
            <iconify-icon icon="lucide:x" width="24"></iconify-icon>
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-7 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'bot' && (
                <div className="w-9 h-9 rounded-xl bg-[#facf39] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <iconify-icon icon="lucide:cpu" className="text-black text-base"></iconify-icon>
                </div>
              )}
              <div
                className={`max-w-[70%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#facf39] text-black font-semibold rounded-br-none shadow-[0_10px_25px_-10px_rgba(250,207,57,0.4)]'
                    : 'bg-white/5 text-white backdrop-blur-sm rounded-bl-none border border-white/10'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3.5 justify-start">
              <div className="w-9 h-9 rounded-xl bg-[#facf39] flex items-center justify-center flex-shrink-0 shadow-lg">
                <iconify-icon icon="lucide:cpu" className="text-black text-base"></iconify-icon>
              </div>
              <div className="px-5 py-3.5 rounded-2xl rounded-bl-none bg-white/5 backdrop-blur-sm border border-white/10 flex gap-1">
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-5 border-t border-white/10 bg-gradient-to-t from-white/[0.02] to-transparent backdrop-blur-sm">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Введите ваше сообщение..."
              className="flex-1 bg-white/5 text-white placeholder:text-neutral-500 px-5 py-3.5 rounded-2xl border border-white/10 focus:border-[#facf39]/50 focus:outline-none focus:ring-2 focus:ring-[#facf39]/20 transition-all font-normal text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="w-12 h-12 rounded-2xl bg-[#facf39] hover:bg-[#e8bf35] disabled:bg-neutral-700 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg hover:shadow-[0_10px_25px_-10px_rgba(250,207,57,0.6)] disabled:shadow-none"
            >
              <iconify-icon icon="lucide:send" className="text-black text-lg"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
