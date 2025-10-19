
// src/components/ChatUI.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  { id: "caption", title: "Caption", description: "Generate captions for your posts", icon: "📝" },
  { id: "advice", title: "Advice", description: "Get advice on any topic", icon: "💡" },
  { id: "ideas", title: "Ideas", description: "Brainstorm new ideas", icon: "🚀" },
  { id: "motivation", title: "Motivation", description: "Get a dose of motivation", icon: "🔥" },
];

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

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
        body: JSON.stringify({ prompt: input, mode: selectedFeature }),
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

  const handleFeatureSelect = (featureId) => {
    setSelectedFeature(featureId);
    setMessages([
      {
        role: "assistant",
        text: `👋🏾 I be Bolo! I'm ready to help you with ${featureId}.`,
      },
    ]);
  };

  return (
    <div className="chat-container flex flex-col h-full max-w-2xl mx-auto bg-[#181516] rounded-2xl shadow-lg relative overflow-hidden">
      {!selectedFeature ? (
        <div className="flex flex-col h-full">
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold text-white">Hello, I'm Bolo</h2>
            <p className="text-gray-400">What can I help you with today?</p>
          </div>
          <div className="feature-grid p-4 flex-grow">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="feature-card"
                onClick={() => handleFeatureSelect(feature.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-title">{feature.title}</div>
                <div className="feature-description">{feature.description}</div>
              </motion.div>
            ))}
          </div>
          <div className="bottom-nav flex justify-around items-center p-4 border-t border-gray-700">
            <div>Icon1</div>
            <div>Icon2</div>
            <div>Icon3</div>
          </div>
        </div>
      ) : (
        <>
          <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`chat-bubble ${msg.role}`}
                >
                  {msg.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-[#2C2C2E] text-gray-400 rounded-xl w-fit"
              >
                Bolo dey reason your matter 🤔...
              </motion.div>
            )}
          </div>

          <div className="chat-input-container p-4">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chat-input flex-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="send-button"
              >
                {loading ? (
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                ) : (
                  <Image src="/send.svg" alt="Send" width={24} height={24} />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
