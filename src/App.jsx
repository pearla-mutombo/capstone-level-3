import { useEffect } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import Page404 from "./components/Page404";
import { RedirectGitHub404 } from "./components/RedirectGitHub404";

import { repoRoot } from "../config/repoRoot.js";

import "./App.css";

// Starting cart for NOVUS Market.
// If a guest already has a saved cart,
// load it from the browser.
function getSavedCart() {
  try {
    const savedCart = localStorage.getItem("novus_cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Unable to load saved cart:", error);
  }

  return [];
}

// Starting shared state for NOVUS Market.
const initialState = new Map([
  ["login", { email: "", password: "" }],
  ["cartItems", getSavedCart()],
]);

function App() {
  // Get the current cart from the shared StateContext.
  const [cartItems] = useStateContext("cartItems");

  // Save the cart whenever the cart changes.
  useEffect(() => {
    try {
      localStorage.setItem("novus_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [cartItems]);

  return (
    <StateContext initialState={initialState}>
      <BrowserRouter basename={repoRoot}>
        <RedirectGitHub404 />

        <Header />

        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/cart" element={<Cart />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />

          {/* Administrator page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Custom 404 page */}
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </StateContext>
  );
}

export default App;
