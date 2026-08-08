import { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router";
import useCollapseTWE from "../hooks/useCollapseTWE";


export default function Navbar({ isLoggedIn, handleLogout, cartCount}) {
  const [didMount, setDidMount] = useState(false);

  useCollapseTWE();

  useEffect(componentDidMount, []);
  return (
    // <!-- Main navigation container -->
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink className="text-2xl font-bold text-blue-700" to="/">
            NOVUS Market
          </NavLink>
        </div>
        {/* <!-- Hamburger button for mobile view --> */}
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation">
          {/* <!-- Hamburger icon --> */}
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* <!-- Collapsible navbar container --> */}
        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent3"
          data-twe-collapse-item>
          {/* <!-- Left links --> */}
          <div
            className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
            data-twe-navbar-nav-ref>
            {/* <!-- Home link --> */}
            <div
              className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
              data-twe-nav-item-ref>
              <NavLink
                to="/"
                className="text-gray-700 hover:text-blue-700 font-medium">
                Home
              </NavLink>
            </div>
            {/* <!-- Features link --> */}
            <div
              className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
              data-twe-nav-item-ref>
              <NavLink
                to="/products"
                className="text-gray-700 hover:text-blue-700 font-medium">
                Products
              </NavLink>
            </div>
            <div
              className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
              data-twe-nav-item-ref>
              <NavLink
                to="/cart"
                className="relative text-gray-700 hover:text-blue-700 font-medium">
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-3 -right-4 bg-blue-700 text-white text-xs rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>
            {/* Conditional Rendering  - logged-in nav and login button so the navbar changes depending on whether the user is logged in.*/}
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-700 font-medium">
                  Dashboard
                </NavLink>

                <NavLink
                  to="/profile"
                  className="text-gray-700 hover:text-blue-700 font-medium">
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  Logout
                </button>
              </>
            ) : (
              <div
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref>
                <NavLink
                  to="/login"
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                  Login
                </NavLink>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 text-2xl"
              aria-label="Open navigation menu">
              ☰
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
  function componentDidMount() {
    setDidMount(true);
  }
}
