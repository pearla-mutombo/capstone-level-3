import { useEffect, useState } from "react";

// This hook gets products from our Express server.
// The server communicates with Prisma and the PostgreSQL database.
export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Run this function when the component first loads.
  useEffect(componentDidMount, []);

  return [
    products,
    isLoading,
    errorMessage,
    createProduct,
    updateProduct,
    deleteProduct,
  ];

  // Loads the products when the page first opens.
  function componentDidMount() {
    loadProducts();
  }

  // READ: Get all products from our API.
  async function loadProducts() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error("The server returned an error.");
      }

      const allProducts = await response.json();

      setProducts(allProducts);
    } catch (error) {
      console.error("Load products error:", error);
      setErrorMessage("There was a problem loading the products.");
    } finally {
      setIsLoading(false);
    }
  }

  // CREATE: Add a new product to the database.
  async function createProduct(newProduct) {
    try {
      setErrorMessage("");

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("The product could not be created.");
      }

      const createdProduct = await response.json();

      setProducts(addProduct);

      function addProduct(previousProducts) {
        return [...previousProducts, createdProduct];
      }
    } catch (error) {
      console.error("Create product error:", error);
      setErrorMessage("There was a problem creating the product.");
    }
  }

  // UPDATE: Change an existing product in the database.
  async function updateProduct(id, updates) {
    try {
      setErrorMessage("");

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error("The product could not be updated.");
      }

      const updatedProduct = await response.json();

      setProducts(replaceProduct);

      function replaceProduct(previousProducts) {
        return previousProducts.map(isUpdatedProduct);
      }

      function isUpdatedProduct(product) {
        return String(product.id) === String(id) ? updatedProduct : product;
      }
    } catch (error) {
      console.error("Update product error:", error);
      setErrorMessage("There was a problem updating the product.");
    }
  }

  // DELETE: Remove a product from the database.
  async function deleteProduct(id) {
    try {
      setErrorMessage("");

      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("The product could not be deleted.");
      }

      setProducts(removeProduct);

      function removeProduct(previousProducts) {
        return previousProducts.filter(isNotDeleted);
      }

      function isNotDeleted(product) {
        return String(product.id) !== String(id);
      }
    } catch (error) {
      console.error("Delete product error:", error);
      setErrorMessage("There was a problem deleting the product.");
    }
  }
}

// Note:
// GET → Read "useProducts gets all the products from my Express REST API when the page loads."

// POST → Create "createProduct sends a POST request to my server and adds the newly created product to the React state."

// PUT → Update "updateProduct sends a PUT request with the product ID and the updated information."

// DELETE → Delete "deleteProduct sends a DELETE request with the product ID and removes that product from the displayed list."
