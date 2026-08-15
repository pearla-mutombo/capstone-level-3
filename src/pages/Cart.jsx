import Button from "../components/Button";
import { useStateContext } from "../hooks/useStateContext";

export default function Cart() {
  // Get the shared cart and its setter from StateContext.
  const [cartItems, setCartItems] = useStateContext("cartItems");

  // Make sure the cart is always an array.
  // This prevents .map() and .filter() errors.
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  // Remove one product completely from the cart.
  function handleRemoveItem(productId) {
    const updatedCart = [];

    for (let index = 0; index < safeCartItems.length; index++) {
      const item = safeCartItems[index];

      if (item.id !== productId) {
        updatedCart.push(item);
      }
    }

    setCartItems(updatedCart);
  }

  // Increase the quantity of a product.
  function handleIncreaseQuantity(productId) {
    const updatedCart = [];

    for (let index = 0; index < safeCartItems.length; index++) {
      const item = safeCartItems[index];

      if (item.id === productId) {
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1,
        };

        updatedCart.push(updatedItem);
      } else {
        updatedCart.push(item);
      }
    }

    setCartItems(updatedCart);
  }

  // Decrease the quantity of a product.
  function handleDecreaseQuantity(productId) {
    const updatedCart = [];

    for (let index = 0; index < safeCartItems.length; index++) {
      const item = safeCartItems[index];

      if (item.id === productId && item.quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
        };

        updatedCart.push(updatedItem);
      } else {
        updatedCart.push(item);
      }
    }

    setCartItems(updatedCart);
  }

  // Calculate the total price of all products.
  function calculateTotal() {
    let total = 0;

    for (let index = 0; index < safeCartItems.length; index++) {
      const item = safeCartItems[index];

      const itemTotal = Number(item.price) * item.quantity;

      total = total + itemTotal;
    }

    return total;
  }

  // Show a simple message when checkout is clicked.
  function handleCheckout() {
    alert("Checkout coming soon!");
  }

  return (
    <main
      className="min-h-screen py-12"
      style={{ backgroundColor: "var(--surface)" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Your Shopping Cart
        </h1>

        {/* Show an empty message when the cart has no products. */}
        {safeCartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>

            <p className="text-gray-600">
              Add some products to your cart to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {safeCartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl bg-white p-6 shadow-md">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    {/* Product Information */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || item.src}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />

                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {item.name}
                        </h2>

                        <p className="mt-2 font-bold text-(--nova)">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="font-medium text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-5 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="h-fit rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="mb-4 flex justify-between">
                <span>Items</span>

                <span>{safeCartItems.length}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-xl font-bold">
                <span>Total</span>

                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="mt-6">
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
