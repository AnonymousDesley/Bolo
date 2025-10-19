"use client";

import ChatUI from "@/components/ChatUI";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="main-container text-white min-h-screen" style={{ backgroundImage: "url('/background-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <ChatUI />
    </main>
  );
}
