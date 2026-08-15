import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import useProducts from "../hooks/useProducts";
import useSearch from "../hooks/useSearch";
import useSort from "../hooks/useSort";

import { useStateContext } from "../hooks/useStateContext";

export default function Products() {
  const [products, isLoading, errorMessage] = useProducts();

  // Get the cart setter from shared StateContext.
  const [, setCartItems] = useStateContext("cartItems");

  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromUrl);
  const [sortOption, setSortOption] = useState("name");

  // Search products.
  const searchResults = useSearch(products, search);

  // Filter products by category.
  const categoryResults = searchResults.filter(matchesCategory);

  // Sort products.
  const sortedProducts = useSort(categoryResults, sortOption);

  // Check whether a product belongs to the selected category.
  function matchesCategory(product) {
    return category === "All" || product.category === category;
  }

  // Update the search box.
  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  // Update the category.
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  // Update the sort option.
  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  // Add a product to the shopping cart.
  function handleAddToCart(product) {
    setCartItems(function (previousItems) {
      // Make sure the previous cart is an array.
      let cart = [];

      if (Array.isArray(previousItems)) {
        cart = previousItems;
      }

      // Look for this product in the cart.
      const existingProduct = cart.find(function (item) {
        return item.id === product.id;
      });

      let updatedCart;

      // If the product is already in the cart,
      // increase its quantity.
      if (existingProduct) {
        updatedCart = cart.map(function (item) {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      } else {
        // If the product is not in the cart,
        // add it with a quantity of 1.
        const newCartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          src: product.src,
          category: product.category,
          quantity: 1,
        };

        updatedCart = [...cart, newCartItem];
      }

      // Save the cart directly in the browser.
      // This allows guests to keep their cart.
      try {
        localStorage.setItem("novus_cart", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Unable to save cart:", error);
      }

      console.log("NOVUS CART:", updatedCart);

      return updatedCart;
    });
  }

  return (
    <main className="min-h-screen bg-(--surface) py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">NOVUS Products</h1>

          <p className="mt-3 text-gray-600">Find products you'll love.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-md">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <label htmlFor="search" className="mb-2 block font-medium">
                Search Products
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by product name..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-(--nova)"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="mb-2 block font-medium">
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-(--nova)">
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Gaming">Gaming</option>
                <option value="Books">Books</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="mb-2 block font-medium">
                Sort Products
              </label>

              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-(--nova)">
                <option value="name">Name A-Z</option>
                <option value="priceLow">Price Low to High</option>
                <option value="priceHigh">Price High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products */}
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-semibold text-red-600">
              {errorMessage}
            </h2>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-2xl font-semibold">No products found</h2>

            <p className="mt-2 text-gray-600">
              Try changing your search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map(function (product) {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
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
