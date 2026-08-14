import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateContext } from "./components/StateContext.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";

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

// Starting shared state for NOVUS Market
const initialState = new Map([
  ["login", { email: "", password: "" }],
  ["cartItems", []],
]);

function App() {
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
