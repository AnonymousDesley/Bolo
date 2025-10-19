"use client";

import ChatUI from "@/components/ChatUI";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="main-container bg-[#181516] text-white min-h-screen">
      <Header />
      <ChatUI />
    </main>
  );
}
