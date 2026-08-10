import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StateContext } from "./components/StateContext.jsx";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

import Page404 from "./components/Page404";
import { RedirectGitHub404 } from "./components/RedirectGitHub404";

import { repoRoot } from "../config/repoRoot.js";

import "./App.css";

function App() {
  return (
    <StateContext>
      <BrowserRouter basename={repoRoot}>
        <RedirectGitHub404 />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </StateContext>
  );
}

export default App;
