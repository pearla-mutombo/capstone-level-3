import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useModalTWE from "../hooks/useModalTWE";
import { useStateContext } from "../hooks/useStateContext";

export default function Logout() {
  useModalTWE();

  const [, setLogin] = useStateContext("login");
  const navigate = useNavigate();

  const closeButtonRef = useRef(null);

  function handleLogout() {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }

    const emptyCredentials = {
      email: "",
      password: "",
    };

    if (typeof setLogin === "function") {
      setLogin(emptyCredentials);
    } else {
      console.error(
        "setLogin is not available — check useStateContext('login')",
      );
    }

    navigate("/login");
  }

  return (
    <>
      {/* Logout Button */}
      <button
        type="button"
        data-twe-modal-init
        data-twe-target="#logoutModal"
        className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700">
        Logout
      </button>

      {/* Logout Modal */}
      <div
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none">
        <div className="relative mx-auto mt-7 w-full max-w-lg opacity-0 transition-all duration-300 ease-in-out">
          <div className="relative flex w-full flex-col rounded-md border-none bg-white shadow-lg outline-none">
            {/* Modal Header */}
            <div className="flex items-center justify-between rounded-t-md border-b-2 border-gray-100 p-4">
              <h5
                id="logoutModalLabel"
                className="text-xl font-medium leading-normal text-gray-900">
                Confirm Logout
              </h5>

              {/* Close Button */}
              <button
                type="button"
                ref={closeButtonRef}
                className="border-none bg-transparent text-2xl font-semibold text-gray-500 hover:text-gray-800 focus:outline-none"
                data-twe-modal-dismiss
                aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Message */}
            <div className="relative flex-auto p-4 text-gray-700">
              Are you sure you want to logout?
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-end rounded-b-md border-t-2 border-gray-100 p-4">
              {/* Cancel Button */}
              <button
                type="button"
                className="rounded bg-gray-200 px-6 py-2.5 text-xs font-medium uppercase text-gray-700 hover:bg-gray-300"
                data-twe-modal-dismiss>
                Cancel
              </button>

              {/* Confirm Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase text-white hover:bg-red-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
