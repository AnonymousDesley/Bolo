"use client";

import ChatUI from "@/components/ChatUI";
import BackgroundImage from "@/components/BackgroundImage";

export default function Home() {
  return (
    <main className="main-container text-white min-h-screen relative">
      <BackgroundImage />
      <ChatUI />
    </main>
  );
}