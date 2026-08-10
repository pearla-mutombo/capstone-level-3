import useNovusModalTWE from "../hooks/useModalTWE";
import { useRef } from "react";

export default function Logout({ setLogin }) {
  useNovusModalTWE();

  const closeButtonRef = useRef(null);

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        data-twe-modal-init
        data-twe-target="#logoutModal"
        className="bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700">
        Logout
      </button>

      {/* Modal Window */}
      <div
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true">
        <div className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
            {" "}
            {/* Modal Header */}{" "}
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
              {" "}
              <h5
                className="text-xl font-medium leading-normal text-surface dark:text-white"
                id="logoutModalLabel">
                {" "}
                Confirm Logout{" "}
              </h5>{" "}
              {/* Close Button */}{" "}
              <button
                type="button"
                ref={closeButtonRef}
                className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 focus:outline-none dark:text-neutral-400"
                data-twe-modal-dismiss
                aria-label="Close">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6">
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
            {/* Modal Message */}{" "}
            <div className="relative flex-auto p-4">
              {" "}
              Are you sure you want to logout?{" "}
            </div>{" "}
            {/* Modal Buttons */}{" "}
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
              {" "}
              {/* Cancel */}{" "}
              <button
                type="button"
                className="inline-block rounded bg-gray-200 px-6 py-2.5 text-xs font-medium uppercase text-gray-700 hover:bg-gray-300"
                data-twe-modal-dismiss>
                {" "}
                Cancel{" "}
              </button>{" "}
              {/* Confirm */}{" "}
              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 inline-block rounded bg-red-600 px-6 py-2.5 text-xs font-medium uppercase text-white hover:bg-red-700">
                {" "}
                Confirm{" "}
              </button>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );

  // This function logs the user out
  function handleLogout() {
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }

    // Create empty login information
    const emptyCredentials = { email: "", password: "" };
    // Clear th login state
    setLogin(emptyCredentials);
  }
}
