import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { useStateContext } from "../hooks/useStateContext";
import { NavLink } from "react-router-dom";

export default function AdminDashboard() {
  const [login] = useStateContext("login");

  const isLoggedIn = login.email !== "";

  return (
    <main className="min-h-screen bg-(--surface) py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoggedIn ? (
          <AdminProductManagement email={login.email} />
        ) : (
          <AdminLoginMessage />
        )}
      </div>
    </main>
  );
}

/* ========================================
   ADMIN PRODUCT MANAGEMENT
======================================== */

function AdminProductManagement({ email }) {
  const [
    products,
    isLoading,
    errorMessage,
    createProduct,
    updateProduct,
    deleteProduct,
  ] = useProducts();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [name, setName] = useState("");
  const [src, setSrc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleImageChange(event) {
    setSrc(event.target.value);
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  function handleAddProductClick() {
    setIsAddingProduct(true);
    setEditingProductId(null);
    clearForm();
  }

  function handleCancelClick() {
    setIsAddingProduct(false);
    setEditingProductId(null);
    clearForm();
  }

  function handleEditClick(product) {
    setEditingProductId(product.id);
    setIsAddingProduct(false);

    setName(product.name);
    setSrc(product.src);
    setPrice(product.price ?? "");
    setCategory(product.category);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const productInformation = {
      name: name.trim(),
      src: src.trim(),
      price,
      category,
    };

    if (!productInformation.name || !productInformation.src) {
      return;
    }

    if (editingProductId !== null) {
      await updateProduct(editingProductId, productInformation);
    } else {
      await createProduct(productInformation);
    }

    clearForm();
    setIsAddingProduct(false);
    setEditingProductId(null);
  }

  async function handleDeleteClick(product) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );

    if (!shouldDelete) {
      return;
    }

    await deleteProduct(product.id);
  }

  function clearForm() {
    setName("");
    setSrc("");
    setPrice("");
    setCategory("Electronics");
  }

  const isEditing = editingProductId !== null;
  const isFormVisible = isAddingProduct || isEditing;

  return (
    <div>
      {/* Header */}
      <section className="mb-10 rounded-2xl bg-white p-8 shadow-md sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-(--nova)">
          NOVUS Market Administration
        </p>

        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Product Management
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome, <span className="font-semibold text-gray-900">{email}</span>.
          Manage the NOVUS Market product catalog below.
        </p>
      </section>

      {/* Error Message */}
      {errorMessage && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          role="alert">
          {errorMessage}
        </div>
      )}

      {/* Add Product Button */}
      {!isFormVisible && (
        <div className="mb-8">
          <button
            type="button"
            onClick={handleAddProductClick}
            className="rounded-lg bg-(--nova) px-6 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
            + Add New Product
          </button>
        </div>
      )}

      {/* Product Form */}
      {isFormVisible && (
        <ProductForm
          isEditing={isEditing}
          name={name}
          src={src}
          price={price}
          category={category}
          onNameChange={handleNameChange}
          onImageChange={handleImageChange}
          onPriceChange={handlePriceChange}
          onCategoryChange={handleCategoryChange}
          onSubmit={handleSubmit}
          onCancel={handleCancelClick}
        />
      )}

      {/* Product List */}
      <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Product Catalog
            </h2>

            <p className="mt-1 text-gray-600">
              Manage products stored in the NOVUS Market database.
            </p>
          </div>

          <span className="font-semibold text-(--nova)">
            {products.length} Products
          </span>
        </div>

        {isLoading ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg bg-gray-50 py-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              No products found
            </h3>

            <p className="mt-2 text-gray-600">
              Add your first product to the catalog.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <AdminProductRow
                key={product.id}
                product={product}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ========================================
   PRODUCT FORM
======================================== */

function ProductForm({
  isEditing,
  name,
  src,
  price,
  category,
  onNameChange,
  onImageChange,
  onPriceChange,
  onCategoryChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="mb-8 rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>

        <p className="mt-1 text-gray-600">
          {isEditing
            ? "Update the product information below."
            : "Add a new product to the NOVUS Market catalog."}
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Product Name */}
          <div>
            <label
              htmlFor="product-name"
              className="mb-2 block font-medium text-gray-900">
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Enter product name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--nova) focus:outline-none focus:ring-2 focus:ring-(--nova)"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="product-price"
              className="mb-2 block font-medium text-gray-900">
              Price
            </label>

            <input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={onPriceChange}
              placeholder="0.00"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--nova) focus:outline-none focus:ring-2 focus:ring-(--nova)"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label
              htmlFor="product-image"
              className="mb-2 block font-medium text-gray-900">
              Image URL
            </label>

            <input
              id="product-image"
              type="url"
              value={src}
              onChange={onImageChange}
              placeholder="https://example.com/product-image.jpg"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--nova) focus:outline-none focus:ring-2 focus:ring-(--nova)"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block font-medium text-gray-900">
              Category
            </label>

            <select
              id="product-category"
              value={category}
              onChange={onCategoryChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--nova) focus:outline-none focus:ring-2 focus:ring-(--nova)">
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Gaming">Gaming</option>
              <option value="Books">Books</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Yoga">Yoga</option>
            </select>
          </div>
        </div>

        {/* Form Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="rounded-lg bg-(--nova) px-6 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
            {isEditing ? "Update Product" : "Create Product"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

/* ========================================
   ADMIN PRODUCT ROW
======================================== */

function AdminProductRow({ product, onEdit, onDelete }) {
  const { id, name, src, price, category } = product;

  return (
    <article className="flex flex-col gap-5 rounded-xl border border-gray-200 p-4 transition hover:shadow-md sm:flex-row sm:items-center">
      {/* Product Image */}
      <img
        src={src}
        alt={name}
        className="h-24 w-full rounded-lg object-cover sm:h-24 sm:w-24"
      />

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {category}
        </p>

        <h3 className="truncate text-lg font-bold text-gray-900">{name}</h3>

        <p className="mt-1 font-semibold text-(--nova)">
          ${Number(price).toFixed(2)}
        </p>
      </div>

      {/* Admin Actions */}
      <div className="flex gap-3 sm:flex-col lg:flex-row">
        <button
          type="button"
          onClick={handleEdit}
          className="rounded-lg border border-(--nova) px-4 py-2 font-semibold text-(--nova) transition hover:bg-(--nova) hover:text-white">
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
          Delete
        </button>
      </div>
    </article>
  );

  function handleEdit() {
    onEdit(product);
  }

  function handleDelete() {
    onDelete(product);
  }
}

/* ========================================
   LOGGED-OUT MESSAGE
======================================== */

function AdminLoginMessage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-md">
      <div className="mb-5 text-5xl" aria-hidden="true">
        🔐
      </div>

      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        NOVUS Market Administration
      </h1>

      <p className="mb-7 text-gray-600">
        Please log in before accessing the product management dashboard.
      </p>

      <NavLink
        to="/login"
        className="inline-block rounded-lg bg-(--nova) px-6 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
        Go to Login
      </NavLink>
    </section>
  );
}

//Note: After the API verifies the user's login, I save the user in shared state. I
// then create a boolean called isAdmin to determine whether the logged-in
// account is the administrator. An if statement sends administrators to the
// product management dashboard and regular customers to their customer
// dashboard.

// Note: "For my NOVUS Market project, I implemented full CRUD functionality for
//  my product catalog. Create sends a POST request to my Express API and
// Prisma creates the product in PostgreSQL. Read uses a GET request to
// retrieve the products and display them in React. Update sends a PUT
// request with the product ID and updated information. Delete sends a
// DELETE request with the product ID and removes it from the database. My
// Admin Dashboard provides the interface for administrators to perform all
// four operations."
