import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import content from "../../data/chatbot.js";
import OPENROUTER_API_KEY from "../../data/key.js";

export default function VD4UChatbot() {
  // const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey there!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;
    setInput("");
    setMessages((msgs) => [...msgs, { sender: "user", text: userInput }]);
    setLoading(true);

    try {
      const chatHistory = [
        {
          role: "system",
          content: content,
        },
        ...messages.map((m) =>
          m.sender === "user"
            ? { role: "user", content: m.text }
            : { role: "assistant", content: m.text }
        ),
        { role: "user", content: userInput },
      ];
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: chatHistory,
          temperature: 0.7,
          max_tokens: 120,
        }),
      });

      if (!res.ok) throw new Error("Network error");
      const data = await res.json();

      const reply =
        data.choices?.[0]?.message?.content?.trim() ||
        "Sorry, I couldn't get a response.";

      setMessages((msgs) => [...msgs, { sender: "bot", text: reply }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "⚠️ Something went wrong. Try again in a bit." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed z-50 bottom-7 right-7 bg-[var(--primary)] hover:bg-[var(--primary-hover)]
      text-[var(--text-light)] p-3 rounded-full shadow-2xl transition-all duration-300
      origin-bottom-right border-1 border-[var(--text-light)]
      ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open Chatbot"
      >
        <MessageCircle size={28} />
      </button>

      <div
        className={`fixed bottom-7 right-7 z-50 w-[350px] max-w-[90vw] h-[480px]
      bg-[var(--bg)] shadow-2xl rounded-2xl overflow-hidden transition-all
      duration-300 ease-in-out flex flex-col origin-bottom-right
      border-2 border-[var(--primary)]
      ${
        open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
      }`}
        style={{ backdropFilter: "blur(10px) saturate(120%)" }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 bg-[var(--primary)]
      text-[var(--text-light)] border-b border-[var(--primary-hover)]"
        >
          <span>Ask me</span>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div
          className="flex-1 p-3 overflow-y-auto overscroll-contain space-y-2 bg-[var(--bg)]"
          onWheel={(e) => e.stopPropagation()}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm max-w-[80%] border shadow-sm
              ${
                msg.sender === "user"
                  ? "bg-[var(--primary)] text-[var(--text-light)] border-[var(--primary-hover)]"
                  : "bg-[var(--surface)] text-[var(--text-dark)] border-[var(--border)]"
              }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="px-3 py-2 rounded-xl text-sm max-w-[80%]
              bg-[var(--surface)] text-[var(--text-dark)]
              border border-[var(--border)] animate-pulse"
              >
                Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form
          className="flex p-2 border-t border-[var(--primary)] bg-[var(--bg)]"
          onSubmit={handleSend}
        >
          <input
            className="flex-1 bg-[var(--surface)] outline-none px-2 rounded-lg
          border border-[var(--border)] text-[var(--text-dark)]
          placeholder:text-[var(--primary-hover)] font-medium"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus={open}
            disabled={loading}
          />

          <button
            type="submit"
            className="px-4 py-1 bg-[var(--primary)] text-[var(--text-light)]
          rounded-xl ml-2 font-medium transition
          hover:bg-[var(--primary-hover)]
          border border-[var(--primary)]
          disabled:opacity-60"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
