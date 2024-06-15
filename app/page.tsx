import Hero from "@/components/Hero"
import { BackgroundBeams } from "@/components/ui/BackgroundBeams"

export default function Home() {
  return (
    <main className="bg-black-100 h-screen">
      <BackgroundBeams />

      <Hero />
    </main>
  );
}
