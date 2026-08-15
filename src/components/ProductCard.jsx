export default function ProductCard({ product, handleAddToCart }) {
  const { id, name, price, src, category } = product;

  function handleAddButtonClick() {
    handleAddToCart({
      id: id,
      name: name,
      price: price,
      src: src,
      category: category,
    });
  }

  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <img src={src} alt={name} className="h-56 w-full object-cover" />

      <div className="p-5">
        <p className="mb-1 text-xs uppercase text-gray-500">{category}</p>

        <h3 className="mb-2 text-xl font-semibold text-gray-900">{name}</h3>

        <p className="mb-4 text-2xl font-bold text-(--nova)">
          ${Number(price).toFixed(2)}
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
}
// Note: This reusable component displays one product.
// Props are destructured directly in the function parameters.
// The button uses an event handler to add the product to the cart.

// "ProductCard is a reusable component that receives a product and an
// add-to-cart function as props. I destructure the props directly in the
// function parameters. The component displays the product information,
// and when the user clicks Add to Cart, the handleAddButtonClick function
// sends the selected product back to the parent component through the
// handleAddToCart prop."
