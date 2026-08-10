import { useState } from "react";

export default function () {
  const [cartItems, setCartItems] = useState([]);

  return [
    cartItems,
    handleAddToCart,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    calculateTotal,
  ];

  // Add a product to the cart.
  function handleAddToCart(novusProduct) {
    const updatedCart = [];
    let productAlreadyInCart = false;
    for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        if (item.id === novusProduct.id) {
            const updatedItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity + 1
            };
            updatedCart.push(updatedItem);
            productAlreadyInCart = true;
        } else {
            updatedCart.push(item);
        }  
    }
    if (!productAlreadyInCart) {
        const newItem = {
            id: product.id,
            name: product.title || product.name,
            price: product.price,
            quantity: 1
        };
        updatedCart.push(newItem);
    }
    setCartItems(updatedCart);
  }

  // Removes a product from the cart.
  function handleRemoveItem(novusProductId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        if (item.id !== productId) {
            updatedCart.push(item);
        }  
    }
    setCartItems(updatedCart);
  }

  // Increases the quantity of a product.
  function handleIncreaseQuantity(productId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        if (item.id === productId) {
            const updatedItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity + 1
            };
            updatedCart.push(updatedItem);
        }
    }
    setCartItems(updatedCart);
  }

  // Decrease the quantity of a product
  function handleDecreaseQuantity(novusProductId) {
    const updatedCart = [];
    for (let index = 0; index < cartItems.length; index++) {
        const item = cartItems[index];
        if (item.id === novusProduct.id && item.quantity > 1) {
            const updatedItem = {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity - 1
            };
            updatedCart.push(updatedItem);
        } else {
            updatedCart.push(item);
        } 
    }
    setCartItems(updatedCart);
  }

  // Calculate the total price.
  function calculateTotal() {
    let total = 0;
    for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];
        const itemTotal = item.price * item.quantity;
        total = total + itemTotal;
    }
    return total;
  }
}
