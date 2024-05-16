import Hero from "@/components/homePage/Hero";
import HowItWork from "@/components/homePage/HowItWork";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col mt-32">
      <Hero />
      <HowItWork />
    </main>
  );
}
