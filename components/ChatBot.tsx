// components/ChatBot.tsx

import React, { useState, useEffect, useRef } from "react";

type Message = {
  role: "user" | "model";
  parts: { text: string }[];
};

const SESSION_KEY = "chat_history";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    // Scroll to bottom on new message
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        maxWidth: 400,
        margin: "0 auto",
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        background: "#fafbfc",
        fontFamily: "inherit",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12, textAlign: "center" }}>
        Связь с инженером
      </h3>
      <div
        style={{
          minHeight: 200,
          maxHeight: 320,
          overflowY: "auto",
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 6,
          padding: 8,
          marginBottom: 12,
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
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
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
        style={{
          marginTop: 10,
          background: "none",
          border: "none",
          color: "#888",
          fontSize: 13,
          cursor: "pointer",
          textDecoration: "underline",
        }}
        disabled={loading}
      >
        Очистить чат
      </button>
    </div>
  );
};

export default ChatBot;
