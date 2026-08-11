import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateContext } from "./components/StateContext.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Page404 from "./components/Page404";
import { RedirectGitHub404 } from "./components/RedirectGitHub404";

import { repoRoot } from "../config/repoRoot.js";

import "./App.css";

// This is the starting shared state for NOVUS Market. StateContext
// requires this to be passed in as Map, with one entry per shared
// state key.
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
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={Dashboard} />
          <Route path="/profile" element={Profile} />
          <Route path="/register" element={Register} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </StateContext>
  );
}

export default App;
