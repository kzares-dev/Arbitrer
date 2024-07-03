import Hero from "@/components/Hero"
import NewHero from "@/components/newHero"

export default function Home() {
  return (
    <main className="bg-white-100 h-screen">
      <Hero />
      <NewHero />
    </main>
  );
}
