import { Fragment } from "react/jsx-runtime";
import Button from "./Button";

export default function ProductCard({ product, handleAddToCart }) { // used destructure props directly
  const [id, name, price, image, category] = product;
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <output>{product.map(toDetailsProd)}</output>
      <button onClick={handleAddToCart} type="button">
        Add to Cart
      </button>
    </article>
  );

  function toDetailsProd() {
    const key = id;
    const details = (
      <Fragment>
        <dt>{id}</dt>
        <dd>
          <img
            src={image}
            alt={name}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <p className="text-sm text-gray-50 mb-1">{category}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {name}
            </h3>
            <p className="text-2xl font-bold text-blue-700 mb-4">
              {" "}
              ${price}
            </p>
          </div>
        </dd>
      </Fragment>
    );
    return details;
  }
}
