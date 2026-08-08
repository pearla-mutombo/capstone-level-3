import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOption, setSortOption] = useState("name");
  const [isLoading] = useState(false);

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
    console.log("Product added to cart:", product.name);
  }

  let filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (sortOption === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortOption === "priceLow") {
    filteredProducts.sort((a, b) =>
      a.price - b.price
    );
  }

  if (sortOption === "priceHigh") {
    filteredProducts.sort((a, b) =>
      b.price - a.price
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            NOVUS Products
          </h1>

          <p className="text-gray-600 mt-3">
            Find products you'll love.
          </p>

        </div>

        {/* Search and Filters */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label
                htmlFor="search"
                className="block font-medium mb-2"
              >
                Search Products
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by product name..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block font-medium mb-2"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="sort"
                className="block font-medium mb-2"
              >
                Sort Products
              </label>

              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              >
                <option value="name">
                  Name A-Z
                </option>

                <option value="priceLow">
                  Price Low to High
                </option>

                <option value="priceHigh">
                  Price High to Low
                </option>
              </select>
            </div>

          </div>

        </div>

        {/* Products */}

        {isLoading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">
              No products found
            </h2>

            <p className="text-gray-600 mt-2">
              Try changing your search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (
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

export default Products;