import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import CategorySection from "../components/CategorySection";
import Benefits from "../components/Benefits";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <Benefits />
    </main>
  );
}
