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

  function matchesCategory(product) {
    return category === "All" || product.category === category;
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleSortChange(event) {
    setSortOption(event.target.value);
  }

  function handleAddToCart(product) {
    setCartItems(addOneToCart);

    function addOneToCart(previousItems) {
      const existing = previousItems.find(matchesId);

      if (existing) {
        return previousItems.map(incrementIfMatch);
      }

      return [...previousItems, { ...product, quantity: 1 }];

      function matchesId(item) {
        return item.id === product.id;
      }

      function incrementIfMatch(item) {
        return item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item;
      }
    }
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
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Note: I use conditional rendering to give the user feedback based on the 
// application's current state. While the API is loading, I display a Loader. If the 
// API returns an error, I display an error message. If the search and filters return 
// no products, I tell the user no products were found. Otherwise, I render the 
// products.