import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useStateContext } from "../hooks/useStateContext";
import Logout from "./Logout";
import Spark from "./Spark";

export default function Navbar() {
  // Get the login information from our shared state.
  const [login] = useStateContext("login");

  // Get the shopping cart from our shared state.
  const [cartItems] = useStateContext("cartItems");

  // Whether the mobile menu is currently open.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if a user is currently logged in.
  const isLoggedIn = login.email !== "";

  // Count how many different products are in the cart.
  const cartCount = cartItems.length;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[var(--ink)]/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between">
          {/* NOVUS Market Logo */}
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white transition hover:text-[var(--spark)]">
            <Spark className="h-5 w-5" />
            NOVUS Market
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-7">
              {/* Home */}
              <NavLink to="/" className={getLinkClass}>
                Home
              </NavLink>

              {/* Products */}
              <NavLink to="/products" className={getLinkClass}>
                Products
              </NavLink>

              {/* Cart */}
              <NavLink to="/cart" className={getCartLinkClass}>
                Cart
                {cartCount > 0 && (
                  <span className="font-mono-label absolute -right-4 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--spark)] px-1 text-xs font-bold text-[var(--ink)]">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {/* Show different options based on login status */}
              {isLoggedIn ? (
                <>
                  <NavLink to="/dashboard" className={getLinkClass}>
                    Dashboard
                  </NavLink>

                  <NavLink to="/profile" className={getLinkClass}>
                    Profile
                  </NavLink>

                  {/* Logout component */}
                  <Logout />
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="rounded-lg bg-[var(--spark)] px-5 py-2.5 font-semibold text-[var(--ink)] transition hover:brightness-95">
                  Login
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
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
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              Products
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              className={getMobileLinkClass}>
              Cart{cartCount > 0 ? ` (${cartCount})` : ""}
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass}>
                  Dashboard
                </NavLink>

                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={getMobileLinkClass}>
                  Profile
                </NavLink>

                <div className="px-3 pt-2">
                  <Logout />
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="mx-3 mt-2 rounded-lg bg-[var(--spark)] px-5 py-2.5 text-center font-semibold text-[var(--ink)] transition hover:brightness-95">
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  // Close the mobile menu whenever a link is tapped.
  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  // This function gives our desktop links the correct style.
  function getLinkClass({ isActive }) {
    if (isActive) {
      return "flex items-center gap-1 font-semibold text-[var(--spark)]";
    }

    return "font-medium text-gray-300 transition hover:text-white";
  }

  // Same as getLinkClass, but positioned relative so the cart badge can sit on top of it.
  function getCartLinkClass({ isActive }) {
    return `relative ${getLinkClass({ isActive })}`;
  }

  // This function gives our mobile links the correct style.
  function getMobileLinkClass({ isActive }) {
    if (isActive) {
      return "rounded-lg bg-white/10 px-3 py-2.5 font-semibold text-[var(--spark)]";
    }

    return "rounded-lg px-3 py-2.5 font-medium text-gray-300 transition hover:bg-white/5 hover:text-white";
  }
}
