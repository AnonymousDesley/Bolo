// src/components/ChatUI.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const features = [
  { id: "caption", title: "Caption", description: "Generates Captivating captions to promote your business on social Media" },
  { id: "advice", title: "Advice", description: "Get personalized advice on various topics, from career to personal growth" },
  { id: "ideas", title: "Ideas", description: "Brainstorm innovative ideas for your projects, content, or business ventures" },
  { id: "motivation", title: "Motivation", description: "Receive daily doses of inspiration and motivational quotes to keep you going" },
];

const history = [
  { id: 1, title: "Code tutor", description: "How to use Visual Studio", icon: "⭐" },
  { id: 2, title: "Text writer", description: "Healthy eating tips", icon: "❤️" },
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

  if (selectedFeature) {
    return (
        <div className="chat-container flex flex-col h-full max-w-2xl mx-auto bg-[#181516] rounded-2xl shadow-lg relative overflow-hidden">
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
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <button className="bg-black text-white px-4 py-2 rounded-full">Bolo AI</button>
      </header>

      {/* Welcome Message */}
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold">Hello, I'm Bolo</h1>
        <p className="text-gray-200">What can I help you with today?</p>
      </div>

      {/* Search Bar */}
        <div className="p-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input type="text" placeholder="Search..." className="bg-black text-white w-full pl-10 pr-4 py-2 rounded-full" />
            </div>
        </div>

      {/* Feature Cards */}
      <div className="p-4">
        <div className="flex overflow-x-auto space-x-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-black rounded-lg p-4 w-48 flex-shrink-0"
              onClick={() => handleFeatureSelect(feature.id)}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-white font-bold">{feature.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{feature.description}</p>
              <div className="text-right mt-4">↗</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">History</h2>
          <a href="#" className="text-gray-400">See all</a>
        </div>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="text-2xl mr-4">{item.icon}</div>
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
              <div className="ml-auto text-gray-400">{'>'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="h-1 bg-white w-1/3 mx-auto rounded-full my-4"></div>
    </div>
  );
}