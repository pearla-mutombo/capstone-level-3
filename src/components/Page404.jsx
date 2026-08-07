import useRippleTWE from "../hooks/useRippleTWE";
import pic1 from "../assets/404_pic.jpg";
import useRedirect from "../hooks/useRedirect";

export default function Page404() {
  useRippleTWE();

  const handleRedirect = useRedirect("/", 25000);

  return (
    <main className="flex min-h-[85vh] items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900">
      <div className="block w-full max-w-xl rounded-xl bg-white shadow-2xl border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-800 text-center overflow-hidden transition-all duration-300">
        <div
          className="relative overflow-hidden bg-cover bg-no-repeat"
          data-twe-ripple-init
          data-twe-ripple-color="light">
          <img
            className="w-full aspect-video object-cover shadow-sm transition-all duration-700 ease-in-out hover:scale-105"
            src={pic1}
            alt="404 Page not found illustration"
          />

          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>

        <div className="p-8 text-neutral-800 dark:text-white flex flex-col items-center">
          <h1 className="text-7xl font-extrabold text-danger mb-3 tracking-tight animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-3 tracking-wide text-surface dark:text-white">
            Page Not Found
          </h2>
          <p className="text-neutral-500 max-w-lg mb-8 text-base leading-relaxed dark:text-neutral-400">
            The requested path does not exist. You will be redirected back to
            the home page automatically in 25 seconds.
          </p>
          
          <button
            type="button"
            onClick={handleRedirect}
            className="inline-block w-full max-w-xs rounded-lg bg-primary px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light">
            Navigate to Home Page
          </button>
        </div>
      </div>
    </main>
  );
}
