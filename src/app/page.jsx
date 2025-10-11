"use client";

import { motion } from "framer-motion";
import ChatUI from "@/components/ChatUI";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between bg-[#090607] text-white overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-10"
      >
        <Header />
        <p className="text-center text-gray-400 mt-2 text-sm italic">
          "AI wey sabi your hustle" — Bolo AI
        </p>
      </motion.div>

      {/* Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="flex-1 w-full flex justify-center items-center px-4"
      >
        <ChatUI />
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="pb-6"
      >
        <Footer />
      </motion.div>
    </main>
  );
}
