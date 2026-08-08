import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function Cart() {
  const [cartItems, setCartItems] = useState();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>

            <p className="text-gray-600">
              Add some products to your cart to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>

                      <p className="text-blue-700 font-bold mt-2">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-medium">
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-5">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="bg-gray-200 px-4 py-2 rounded-lg">
                      -
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="bg-gray-200 px-4 py-2 rounded-lg">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="flex justify-between mb-4">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
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
  // Removes a product from the cart
  function handleRemoveItem() {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id !== novusProductID) {
        updatedCart.push(item);
      }
    }
    setCartItems(updatedCart);
  }

  // Increase the quantity of an item
  function handleIncreaseQuantity(novusProductID) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id === novusProductID) {
        const updatedItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity + 1,
        };
        updatedCart.push(updatedItem);
      } else {
        updatedCart.push(item);
      }
      setCartItems(updatedCart);
    }
  }

  // Decrease the quanity of an item
  function handleDecreaseQuantity(novusProductID) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      if (item.id === novusProductID && item.quantity > 1) {
        const updatedItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity - 1,
        };
        updatedCart.push(updatedItem);
      } else {
        updatedCart.push(item);
      }
    }
    setCartItems(updatedCart);
  }

  // calculate the total price of everything in the cart.
  function calculateTotal() {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
      const item = cartItems[index];
      const itemTotal = item.price * item.quantity;
      total = total + itemTotal;
    }
    return total;
  }
}
