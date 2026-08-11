import useRippleTWE from "../hooks/useRippleTWE";
import useRedirect from "../hooks/useRedirect";
import pic1 from "../assets/404_pic.jpg";
import Spark from "./Spark";

export default function Page404() {
  // Set up the TW Elements ripple effect.
  useRippleTWE();

  // Redirect the user to the home page.
  const handleRedirect = useRedirect("/", 25000);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] p-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* 404 Image */}
        <div className="relative">
          <img
            src={pic1}
            alt="Page not found"
            className="h-64 w-full object-cover"
          />
        </div>

        {/* 404 Message */}
        <div className="flex flex-col items-center p-8 text-center text-[var(--ink)]">
          <Spark className="mb-3 h-8 w-8 animate-pulse" />

          <h1 className="mb-3 text-7xl font-extrabold tracking-tight text-[var(--nova)]">
            404
          </h1>
          <h2 className="mb-3 text-3xl font-bold tracking-wide">
            Page Not Found
          </h2>
          <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-500">
            The requested page does not exist. You will be redirected to the
            home page automatically in 25 seconds.
          </p>

          {/* Home Button */}
          <button
            type="button"
            onClick={handleRedirect}
            className="w-full max-w-xs rounded-lg bg-[var(--nova)] px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition duration-150 ease-in-out hover:bg-[var(--nova-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--nova)]"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Navigate to Home Page
          </button>
        </div>
      </div>
    </main>
  );
}
