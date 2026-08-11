import { Fragment } from "react/jsx-runtime";
import usePrisma from "../hooks/usePrisma";
import { useStateContext } from "../hooks/useStateContext";
import Spark from "./Spark";

export default function FeaturedProducts() {
  const dbPassword = import.meta.env.VITE_DB_PASSWORD;
  const [, allProducts, isLoading, errorMessage] = usePrisma(dbPassword);
  const [, setCartItems] = useStateContext("cartItems");

  // Feature the first four products from the real database.
  const featured = allProducts.slice(0, 4);

  if (errorMessage) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="font-medium text-red-600">{errorMessage}</p>
      </section>
    );
  }

  if (isLoading || featured.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <p className="font-mono-label flex items-center justify-center gap-2 text-center text-sm uppercase text-[var(--nova)]">
        <Spark className="h-3 w-3" /> Featured
      </p>
      <h2 className="mb-10 mt-2 text-center text-4xl font-bold">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map(toDetails)}
      </div>
    </section>
  );

  function handleAddToCart(product) {
    setCartItems(function addOne(previousItems) {
      const existing = previousItems.find(matchesId);
      if (existing) {
        return previousItems.map(incrementIfMatch);
      }
      return [...previousItems, { ...product, quantity: 1 }];

      function matchesId(item) {
        return item.id === product.id;
      }
      function incrementIfMatch(item) {
        return item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }
    });
  }

  function toDetails(product) {
    const key = product.id;
    const details = (
      <Fragment key={key}>
        <article className="overflow-hidden rounded-xl bg-white p-4 shadow-lg transition-shadow hover:shadow-xl">
          <img
            className="mb-4 h-40 w-full rounded-lg object-cover"
            src={product.src}
            alt={product.name}
          />
          <h3 className="mb-2 text-xl font-semibold">{product.name}</h3>
          <p className="font-mono-label mb-4 text-lg font-bold text-[var(--nova)]">
            ${product.price}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full rounded-lg bg-[var(--nova)] py-2 text-white transition hover:bg-[var(--nova-dark)]">
            Add to Cart
          </button>
        </article>
      </Fragment>
    );
    return details;
  }
}
