import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useStateContext } from "../hooks/useStateContext";
import Logout from "./Logout";
import Spark from "./Spark";

import { repoRoot } from "../../config/repoRoot";

export default function Navbar() {
  // Get the login information from shared state.
  const [login] = useStateContext("login");

  // Get the shopping cart from shared state.
  const [cartItems] = useStateContext("cartItems");

  // Keep track of whether the mobile menu is open.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // A user is logged in when an email exists.
  const isLoggedIn = Boolean(login?.email);

  // Count the products in the cart.
  const cartCount = cartItems?.length || 0;

  return (
    <nav basename={repoRoot} className="sticky top-0 z-50 border-b border-white/10 bg-(--ink)/95 shadow-lg backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between">
          {/* NOVUS Market Logo */}
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition hover:text-(--spark)">
            <Spark className="h-5 w-5" />
            <span>NOVUS Market</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-7">
              {/* Home */}
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={getLinkClass}>
                Home
              </NavLink>
              |{/* Products */}
              <NavLink
                to="/products"
                onClick={closeMobileMenu}
                className={getLinkClass}>
                Products
              </NavLink>
              |{/* Cart */}
              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className={getCartLinkClass}>
                Cart
                {cartCount > 0 && (
                  <span className="absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--spark) px-1 text-xs font-bold text-(--ink)">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              |{/* Dashboard and Profile only appear when logged in */}
              {isLoggedIn && (
                <>
                  {/* Dashboard */}
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className={getLinkClass}>
                    Dashboard
                  </NavLink>
                  |{/* Profile */}
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={getLinkClass}>
                    Profile
                  </NavLink>
                </>
              )}
              {/* Register only appears when logged out */}
              {!isLoggedIn && (
                <NavLink
                  to="/register"
                  onClick={closeMobileMenu}
                  className={getLinkClass}>
                  Register
                </NavLink>
              )}
              |{/* Login / Logout */}
              {isLoggedIn ? (
                <Logout />
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="rounded-lg bg-(--spark) px-5 py-2.5 font-semibold text-(--ink) shadow-md transition hover:brightness-95">
                  Login
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="rounded-lg px-3 py-2 text-2xl text-white transition hover:bg-white/10 lg:hidden"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu">
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="flex flex-col gap-1 border-t border-white/10 py-4 lg:hidden">
            {/* Home */}
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              Home
            </NavLink>

            {/* Products */}
            <NavLink
              to="/products"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              Products
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              <div className="flex items-center justify-between">
                <span>Cart</span>

                {cartCount > 0 && (
                  <span className="rounded-full bg-(--spark) px-2 py-1 text-xs font-bold text-(--ink)">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>

            {/* Logged-in links */}
            {isLoggedIn ? (
              <>
                {/* Dashboard */}
                <NavLink
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass}>
                  Dashboard
                </NavLink>

                {/* Profile */}
                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass}>
                  Profile
                </NavLink>

                {/* Logout */}
                <div className="px-3 pt-2">
                  <Logout />
                </div>
              </>
            ) : (
              <>
                {/* Register */}
                <NavLink
                  to="/register"
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass}>
                  Register
                </NavLink>

                {/* Login */}
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className="mx-3 mt-2 rounded-lg bg-(--spark) px-5 py-2.5 text-center font-semibold text-(--ink) shadow-md transition hover:brightness-95">
                  Login
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Close the mobile menu.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  // Open or close the mobile menu.
  function toggleMobileMenu() {
    setIsMobileMenuOpen((open) => !open);
  }

  // Desktop link styling.
  function getLinkClass({ isActive }) {
    if (isActive) {
      return "font-semibold text-[var(--spark)]";
    }

    return "font-medium text-gray-300 transition hover:text-white";
  }

  // Cart link styling.
  function getCartLinkClass({ isActive }) {
    return `relative ${getLinkClass({ isActive })}`;
  }

  // Mobile link styling.
  function getMobileLinkClass({ isActive }) {
    if (isActive) {
      return "rounded-lg bg-white/10 px-3 py-2.5 font-semibold text-[var(--spark)]";
    }

    return "rounded-lg px-3 py-2.5 font-medium text-gray-300 transition hover:bg-white/5 hover:text-white";
  }
}
