import Image from "next/image";

export default function Header() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="text-center flex flex-col items-center bg-black/40 p-4 rounded-3xl border border-purple-600/30 backdrop-blur-md">
        <Image
          src="/logo.png"
          alt="Bolo Logo"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-white responsive-h1">
          {" "}
          Bolo AI
        </h1>
        <p className="text-gray-300 mt-1">"- AI wey sabi your hustle-"</p>
      </header>
    </div>
  );
}
