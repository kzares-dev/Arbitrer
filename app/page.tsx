import Hero from "@/components/Hero"
import { BackgroundBeams } from "@/components/ui/BackgroundBeams"
import { StarsCanvas } from "@/components/canvas";

export default function Home() {
  return (
    <main className="bg-black-100 h-screen">
      <StarsCanvas />

      <Hero />
    </main>
  );
}
