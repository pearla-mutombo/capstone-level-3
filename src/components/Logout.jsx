import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../hooks/useStateContext";

export default function Logout() {
  const [, setLogin] = useStateContext("login");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the logout confirmation.
  function handleLogoutClick() {
    setIsModalOpen(true);
  }

  // Close the logout confirmation.
  function handleCancelClick() {
    setIsModalOpen(false);
  }

  // Clear the user's login information and return to Login.
  function handleLogout() {
    const loggedOutUser = {
      email: "",
      password: "",
    };

    setLogin(loggedOutUser);
    setIsModalOpen(false);

    navigate("/login");
  }

  return (
    <>
      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogoutClick}
        className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700">
        Logout
      </button>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logoutModalTitle">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2
                id="logoutModalTitle"
                className="text-2xl font-bold text-gray-900">
                Confirm Logout
              </h2>

              <button
                type="button"
                onClick={handleCancelClick}
                className="text-2xl font-semibold text-gray-500 hover:text-gray-800"
                aria-label="Close logout confirmation">
                ×
              </button>
            </div>

            {/* Modal Message */}
            <p className="mt-4 text-gray-600">
              Are you sure you want to logout of your NOVUS Market account?
            </p>

            {/* Modal Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancelClick}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
