// components/ChatBot.tsx
import React, { useState, useEffect, useRef } from 'react';

interface ChatBotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

const SESSION_KEY = 'chat_history';

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', parts: [{ text: trimmed }] };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newHistory }),
      });

      52
        .json();
      if (data.text) {      setMessages([...newHistory, { role: 'model', parts: [{ text: data.text }] }]);
              } else {
        setMessages([
          const data = await res...newHistory,
          {
            role: 'model',
            parts: [{ text: data.error || 'Ошибка: не удалось получить ответ от инженера.' }],
          },
        ]);
      }
    } catch (e) {
      setMessages([
        ...newHistory,
        {
          role: 'model',
          parts: [{ text: 'Ошибка соединения с сервером.' }],
        },
      ]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem(SESSION_KEY);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - darker for better contrast */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999,
          backdropFilter: 'blur(6px)',
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Modal - Dark theme with gold accents */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          maxWidth: 420,
          width: 'calc(100% - 40px)',
        }}
      >
        <div
          style={{
            maxWidth: 420,
            margin: '0 auto',
            border: '2px solid #D4AF37',
            borderRadius: 12,
            padding: 20,
            background: '#0a0a0a',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            boxShadow: '0 8px 32px rgba(212, 175, 55, 0.2), 0 0 20px rgba(0, 0, 0, 0.8)',
            color: '#e0e0e0',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: '1px solid #D4AF37',
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: 0,
                textAlign: 'center',
                flex: 1,
                color: '#D4AF37',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}
            >
              ИНЖЕНЕР НА СВЯЗИ
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 28,
                cursor: 'pointer',
                padding: '0 4px 2px 4px',
                lineHeight: 1,
                color: '#D4AF37',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ×
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              minHeight: 220,
              maxHeight: 360,
              overflowY: 'auto',
              background: 'rgba(212, 175, 55, 0.05)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              scrollBehavior: 'smooth',
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: '#888', textAlign: 'center', fontSize: 14, paddingTop: 60 }}>
                Задайте вопрос инженеру…
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  margin: '10px 0',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background:
                      msg.role === 'user'
                        ? 'rgba(212, 175, 55, 0.25)'
                        : 'rgba(212, 175, 55, 0.1)',
                    color: msg.role === 'user' ? '#FFE680' : '#c0c0c0',
                    borderRadius: 8,
                    padding: '8px 14px',
                    maxWidth: '85%',
                    wordBreak: 'break-word',
                    fontSize: 14,
                    border:
                      msg.role === 'user'
                        ? '1px solid rgba(212, 175, 55, 0.4)'
                        : '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  {msg.parts[0].text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ color: '#888', textAlign: 'left', fontSize: 13, fontStyle: 'italic' }}>
                Инженер печатает…
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 12,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Напишите вопрос…"
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px 12px',
                borderRadius: 6,
                border: '1px solid #D4AF37',
                fontSize: 14,
                background: '#1a1a1a',
                color: '#e0e0e0',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#FFD700';
                e.currentTarget.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: '10px 18px',
                borderRadius: 6,
                border: 'none',
                background: input.trim() && !loading ? '#D4AF37' : '#444',
                color: input.trim() && !loading ? '#000' : '#888',
                fontWeight: 600,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                fontSize: 14,
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.background = '#FFE680';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && input.trim()) {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'ОТПРАВКА…' : 'ОТПРАВИТЬ'}
            </button>
          </div>

          {/* Clear Chat Button */}
          <button
            onClick={clearChat}
            style={{
              marginTop: 8,
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: 12,
              cursor: 'pointer',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
            disabled={loading}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
          >
            Очистить чат
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
