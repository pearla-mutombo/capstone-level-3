import { NavLink } from "react-router-dom";
import Spark from "./Spark";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-(--ink) py-28 text-center text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 opacity-20">
        <Spark className="h-96 w-96 animate-pulse" />
      </div>

      <p className="font-mono-label relative mb-4 flex items-center justify-center gap-2 text-sm uppercase text-(--spark)">
        <Spark className="h-3 w-3" /> New arrivals weekly
      </p>

      <h2 className="relative mx-auto max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
        Welcome to <span className="text-(--spark)">NOVUS</span> Market
      </h2>

      <p className="relative mx-auto mt-6 max-w-xl text-lg text-gray-300">
        Shop smarter with quality products at unbeatable prices.
      </p>

      <div className="relative mt-10 space-x-4">
        <NavLink
          to="/products"
          className="inline-block rounded-lg bg-(--spark) px-7 py-3.5 font-semibold text-(--ink) transition hover:brightness-95">
          Shop Now
        </NavLink>

        <a
          href="#categories"
          className="inline-block rounded-lg border border-white/30 px-7 py-3.5 text-white transition hover:bg-white/10">
          Learn More
        </a>
      </div>
    </section>
  );
}
