export default function ProductCard({ product, handleAddToCart }) {
  // Destructure the prop directly.
  const { id, name, price, image, category } = product;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <img src={image} alt={name} className="h-56 w-full object-cover" />

      <div className="p-5">
        <p className="font-mono-label mb-1 text-xs uppercase text-gray-500">
          {category}
        </p>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{name}</h3>
        <p className="font-mono-label mb-4 text-2xl font-bold text-[var(--nova)]">
          ${price}
        </p>

        <button
          onClick={() => handleAddToCart({ id, name, price, image, category })}
          type="button"
          className="w-full rounded-lg bg-[var(--nova)] py-2.5 font-semibold text-white transition hover:bg-[var(--nova-dark)]">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
