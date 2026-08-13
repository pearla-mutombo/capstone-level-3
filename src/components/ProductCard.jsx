export default function ProductCard({ product, handleAddToCart }) {
  const { id, name, price, src, category } = product;

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <img src={src} alt={name} className="h-56 w-full object-cover" />

      <div className="p-5">
        <p className="font-mono-label mb-1 text-xs uppercase text-gray-500">
          {category}
        </p>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">{name}</h3>

        <p className="font-mono-label mb-4 text-2xl font-bold text-(--nova)">
          ${price}
        </p>

        <button
          type="button"
          onClick={handleAddButtonClick}
          className="w-full rounded-lg bg-(--nova) py-2.5 font-semibold text-white transition hover:bg-(--nova-dark)">
          Add to Cart
        </button>
      </div>
    </article>
  );

  function handleAddButtonClick() {
    handleAddToCart({
      id,
      name,
      price,
      src,
      category,
    });
  }
}
// Note: contains reusable React component and matahed filename;
// props <productCard product={product} handleAddToCart={handleAddToCart}/>
// Destructing directly in parameters function ProductCard({ product, handleAddToCart })
// even handler onClick={handleAddButtonClick}
