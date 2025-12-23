// components/ChatBot.tsx
import React, { useState, useEffect, useRef } from "react";
import { X as CloseIcon } from "lucide-react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

interface ChatBotProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SESSION_KEY = "chat_history";

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    // Scroll to bottom on new message
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", parts: [{ text: trimmed }] };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: newHistory }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages([
          ...newHistory,
          { role: "model", parts: [{ text: data.response }] },
        ]);
      } else {
        setMessages([
          ...newHistory,
          {
            role: "model",
            parts: [
              {
                text:
                  data.error ||
                  "Ошибка: не удалось получить ответ от инженера.",
              },
            ],
          },
        ]);
      }
    } catch (e) {
      setMessages([
        ...newHistory,
        {
          role: "model",
          parts: [{ text: "Ошибка соединения с сервером." }],
        },
      ]);
    }
    setLoading(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const clearChat = () => {
    setMessages([]);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 1000,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.3)",
        }}
      />

      {/* Chat window */}
      <div
        style={{
          position: "relative",
          width: 400,
          maxWidth: "90vw",
          height: 600,
          maxHeight: "90vh",
          background: "#fff",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            Связь с инженером
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#999",
            }}
          >
            <CloseIcon width="24" height="24" />
          </button>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length === 0 && (
            <div style={{ color: "#888", textAlign: "center" }}>
              Задайте вопрос инженеру…
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                margin: "8px 0",
                textAlign: msg.role === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  background: msg.role === "user" ? "#e6f7ff" : "#f5f5f5",
                  color: "#222",
                  borderRadius: 6,
                  padding: "6px 12px",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}
              >
                {msg.parts[0].text}
              </span>
            </div>
          ))}
          {loading && (
            <div style={{ color: "#888", textAlign: "left" }}>
              Инженер печатает…
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid #eee", padding: "12px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Введите сообщение…"
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 15,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                background: "#1677ff",
                color: "#fff",
                fontWeight: 500,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              }}
            >
              Отправить
            </button>
          </div>
          <button
            onClick={clearChat}
            disabled={loading}
            style={{
              background: "none",
              border: "none",
              color: "#888",
              fontSize: 13,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Очистить чат
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
