import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent">
      <div className="flex items-center gap-3">
        <Image
          src="/file.svg" // Using the new logo
          alt="Bolo Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="text-xl font-bold text-white">Bolo AI</h1>
      </div>
      {/* Add any other header elements from the design, like a menu icon */}
    </header>
  );
}
