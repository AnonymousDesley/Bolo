import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/background-hero.jpg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  );
}
