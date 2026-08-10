import Hero from "../components/Hero";
import FeatureProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Benefits from "../components/Benefits";

export default function Home() {
  return (
   
      <main className="min-h-screen bg-gray-50">
        <Hero />
        <FeatureProducts />
        <Categories />
        <Benefits />
      </main>
  
  );
}
