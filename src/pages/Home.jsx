// import Header from "../components/Header";
import Hero from "../components/Hero";
import FeatureProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Benefits from "../components/Benefits";
// import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <main className="bg-gray-50">
        <Hero />
        <FeatureProducts />
        <Categories />
        <Benefits />
      </main>
      {/* <Footer /> */}
    </>
  );
}
