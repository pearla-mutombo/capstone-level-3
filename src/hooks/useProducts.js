import { useState, useEffect } from "react";

// This hook talks to our own server (server.js) instead of connecting to
// the database directly. The browser never needs a database password —
// it just asks the server for data over a normal fetch request.
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(componentDidMount, []);

  return [
    products,
    isLoading,
    errorMessage,
    createProduct,
    updateProduct,
    deleteProduct,
  ];

  function componentDidMount() {
    loadProducts();
  }

  async function loadProducts() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Server responded with an error.");
      }
      const allProducts = await response.json();
      setProducts(allProducts);
    } catch (error) {
      setErrorMessage("There was a problem connecting to the database.");
    } finally {
      setIsLoading(false);
    }
  }

  async function createProduct(newProduct) {
    try {
      setErrorMessage("");
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to create product.");
      const created = await response.json();
      setProducts(function addProduct(previousData) {
        return [...previousData, created];
      });
    } catch (error) {
      setErrorMessage("There was a problem creating the product.");
    }
  }

  async function updateProduct(id, updates) {
    try {
      setErrorMessage("");
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update product.");
      const updated = await response.json();
      setProducts(function replaceProduct(previousData) {
        return previousData.map(function toUpdated(item) {
          return item.id === id ? updated : item;
        });
      });
    } catch (error) {
      setErrorMessage("There was a problem updating the product.");
    }
  }

  async function deleteProduct(id) {
    try {
      setErrorMessage("");
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product.");
      setProducts(function removeProduct(previousData) {
        return previousData.filter(function isNotDeleted(item) {
          return item.id !== id;
        });
      });
    } catch (error) {
      setErrorMessage("There was a problem deleting the product.");
    }
  }
}