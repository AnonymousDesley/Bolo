// src/components/ChatUI.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modes = [
  { id: "caption", label: "📝 Caption" },
  { id: "advice", label: "💡 Advice" },
  { id: "ideas", label: "🚀 Ideas" },
  { id: "motivation", label: "🔥 Motivation" },
];

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "👋🏾 I be Bolo! Choose mode and tell me your hustle 🔥",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("caption");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/bolo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input, mode }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply || "😅 Bolo confuse small — try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "🚨 Network wahala — try again later!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

        return (

          <div className="flex flex-col h-full max-w-2xl mx-auto p-4 bg-[#0c0c0c] rounded-2xl shadow-lg border border-purple-800 relative overflow-hidden chat-ui">

            {/* Floating Mode Buttons */}

            <div className="absolute top-3 left-0 right-0 flex justify-center gap-3 z-20 mode-buttons">

              <AnimatePresence>

                {modes.map((m, i) => (

                  <motion.button

                    key={m.id}

                    initial={{

                      opacity: 0,

                      x: i % 2 === 0 ? -50 : 50,

                      y: -20,

                    }}

                    animate={{

                      opacity: 1,

                      x: 0,

                      y: 0,

                      transition: { delay: i * 0.1, type: "spring", stiffness: 200 },

                    }}

                    exit={{

                      opacity: 0,

                      x: i % 2 === 0 ? 50 : -50,

                      transition: { duration: 0.2 },

                    }}

                    onClick={() => setMode(m.id)}

                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 mode-button ${

                      mode === m.id

                        ? "bg-purple-600 text-white"

                        : "bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white"

                    }`}>

                    {m.label}

                  </motion.button>

                ))}

              </AnimatePresence>

            </div>

      

            {/* Chat Messages */}

            <div className="flex-1 overflow-y-auto mt-16 space-y-3 p-2 scrollbar-hide flex-grow">

              {messages.map((msg, i) => (

                <motion.div

                  key={i}

                  initial={{ opacity: 0, y: 20, scale: 0.95 }}

                  animate={{ opacity: 1, y: 0, scale: 1 }}

                  transition={{ duration: 0.3 }}

                  className={`p-3 rounded-xl max-w-[80%] ${

                    msg.role === "user"

                      ? "bg-purple-600 text-white self-end ml-auto"

                      : "bg-[#111] text-gray-100 self-start"

                  }`}>

                  {msg.text}

                </motion.div>

              ))}

      

              {loading && (

                <motion.div

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                  className="p-3 bg-[#111] text-gray-400 rounded-xl w-fit animate-pulse">

                  Bolo dey reason your matter 🤔...

                </motion.div>

              )}

            </div>

      

            {/* Input Area */}

            <form onSubmit={handleSend} className="flex items-center gap-2 mt-4">

              <input

                type="text"

                placeholder={`Type your message for ${mode} mode...`}

                value={input}

                onChange={(e) => setInput(e.target.value)}

                className="flex-1 bg-[#1a1a1a] text-white px-4 py-3 rounded-xl outline-none border border-purple-700"

              />

              <button

                type="submit"

                disabled={loading}

                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition send-button">

                {loading ? "..." : "Send"}

              </button>

            </form>

          </div>

        );
}
