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
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`
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

      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: reply },
      ]);
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
        className={`fixed z-50 bottom-7 right-7 bg-[#784937] hover:bg-[#433c37] text-[#eee5dd] p-3 rounded-full shadow-2xl transition-all duration-300 origin-bottom-right border-2 border-[#eee5dd] ${open ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open Chatbot"
      >
        <MessageCircle size={28} />
      </button>

      <div
        className={`fixed bottom-7 right-7 z-50 w-[350px] max-w-[90vw] h-[480px] bg-[#eee5dd] shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 ease-in-out flex flex-col origin-bottom-right border-2 border-[#784937] ${open ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
        style={{ backdropFilter: "blur(10px) saturate(120%)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 bg-[#784937] text-[#eee5dd] font-bold border-b border-[#433c37]">
          <span>Ask me</span>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <div
          className="flex-1 p-3 overflow-y-auto space-y-2 bg-[#eee5dd]"
          style={{ overscrollBehavior: "contain" }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-2 rounded-xl text-sm max-w-[80%] ${msg.sender === "user"
                    ? "bg-[#784937] text-[#eee5dd] border border-[#433c37]"
                    : "bg-white text-[#433c37] border border-[#433c37]"
                  }`}
                style={{
                  boxShadow: "0 1.5px 8px 0 #433c3708"
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-xl text-sm max-w-[80%] bg-white text-[#433c37] border border-[#433c37] animate-pulse">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex p-2 border-t border-[#784937] bg-[#eee5dd]"
        >
          <input
            className="flex-1 bg-white outline-none px-2 rounded-lg border border-[#433c37] text-[#433c37] font-medium placeholder-[#784937a0]"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus={open}
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-1 bg-[#784937] text-[#eee5dd] rounded-xl ml-2 font-medium transition hover:bg-[#433c37] hover:text-[#eee5dd] border border-[#784937] disabled:opacity-60"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}