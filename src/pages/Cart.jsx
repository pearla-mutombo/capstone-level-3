import Button from "../components/Button";
import { useStateContext } from "../hooks/useStateContext";

export default function Cart() {
  // Read the real shared cart, not a disconnected local copy.
  const [cartItems, setCartItems] = useStateContext("cartItems");

  return (
    <main className="min-h-screen bg-(--surface) py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-gray-600">
              Add some products to your cart to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-white p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="font-mono-label mt-2 font-bold text-(--nova)">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="font-medium text-red-600 hover:text-red-800">
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="rounded-lg bg-gray-200 px-4 py-2 hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-xl bg-white p-6 shadow-md">
              <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

              <div className="mb-4 flex justify-between">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between border-t pt-4 text-xl font-bold">
                <span>Total</span>
                <span className="font-mono-label">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <div className="mt-6">
                <Button onClick={() => alert("Checkout coming soon!")}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );

  // Removes a product from the cart.
  function handleRemoveItem(productId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id !== productId) {
        updatedCart.push(item);
      }
    }
    setCartItems(updatedCart);
  }

  // Increase the quantity of an item.
  function handleIncreaseQuantity(productId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id === productId) {
        updatedCart.push({ ...item, quantity: item.quantity + 1 });
      } else {
        updatedCart.push(item);
      }
    }
    setCartItems(updatedCart);
  }

  // Decrease the quantity of an item.
  function handleDecreaseQuantity(productId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id === productId && item.quantity > 1) {
        updatedCart.push({ ...item, quantity: item.quantity - 1 });
      } else {
        updatedCart.push(item);
      }
    }
    setCartItems(updatedCart);
  }

  // Calculate the total price of everything in the cart.
  function calculateTotal() {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      total = total + item.price * item.quantity;
    }
    return total;
  }
}
