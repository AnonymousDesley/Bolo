// src/components/ChatUI.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const features = [
  { id: "text", title: "AI text writer" },
  { id: "image", title: "AI image generator" },
  { id: "voice", title: "AI voice generator" },
];

const history = [
  { id: 1, title: "Code tutor", description: "How to use Visual Studio", icon: "⭐" },
  { id: 2, title: "Text writer", description: "Healthy eating tips", icon: "❤️" },
];

export default function ChatUI() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  if (selectedFeature) {
    // Render the chat interface for the selected feature
    return <div>Chat for {selectedFeature}</div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#181516] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        <button className="bg-black text-white px-4 py-2 rounded-full">Try premium</button>
      </header>

      {/* Welcome Message */}
      <div className="p-4 text-center bg-gradient-to-r from-purple-500 to-pink-500">
        <h1 className="text-4xl font-bold">Create, explore, be inspired</h1>
      </div>

      {/* Feature Cards */}
      <div className="p-4">
        <div className="flex overflow-x-auto space-x-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="bg-black rounded-lg p-4 w-48 flex-shrink-0"
              onClick={() => setSelectedFeature(feature.id)}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-white font-bold">{feature.title}</h3>
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