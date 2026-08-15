import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import { StateContextProvider } from "./components/StateContext";

import { repoRoot } from "../config/repoRoot.js";

import "./App.css";

// Starting shared state for NOVUS Market.
const initialState = new Map([
  // Login information.
  ["login", { email: "", password: "" }],

  // Shopping cart.
  // The cart starts as an empty array.
  ["cartItems", []],
]);

export default function App() {
  return (
    <StateContextProvider initialState={initialState}>
      <BrowserRouter basename={repoRoot}>
        <RedirectGitHub404 />

        <Header />

        <Routes>
          {/* Home page */}
          <Route path="/" element={<Home />} />

          {/* Products page */}
          <Route path="/products" element={<Products />} />

          {/* Shopping cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Registration page */}
          <Route path="/register" element={<Register />} />

          {/* User dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User profile */}
          <Route path="/profile" element={<Profile />} />

          {/* Administrator dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Page shown when a route does not exist */}
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </StateContextProvider>
  );
}
