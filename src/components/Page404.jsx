import useRippleTWE from "../hooks/useRippleTWE";
import useRedirect from "../hooks/useRedirect";
import pic1 from "../assets/404_pic.jpg";
import { repoRoot } from "../../config/repoRoot.js";

export default function Page404() {
  // Set up the TW Elements ripple effect.
  useRippleTWE();

  // Redirect the user to the home page.
  const handleRedirect = useRedirect("/", 25000);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* 404 Image */}
        <div className="relative">
          <img
            src={pic1}
            alt="Page not found"
            className="w-full h-64 object-cover"
          />

          {/* Image overlay */}
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>

        {/* 404 Message */}

        <div className="p-8 text-center text-neutral-800 dark:text-white flex flex-col items-center">
          <h1 className="text-7xl font-extrabold text-red-600 mb-3 tracking-tight animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-3 tracking-wide">
            Page Not Found
          </h2>
          <p className="text-neutral-500 max-w-lg mb-8 text-base leading-relaxed dark:text-neutral-400">
            The requested page does not exist. You will be redirected to the
            home page automatically in 25 seconds.
          </p>

          {/* Home Button */}

          <button
            type="button"
            onClick={handleRedirect}
            className="w-full max-w-xs rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Navigate to Home Page
          </button>
        </div>
      </div>
    </main>
  );
}
