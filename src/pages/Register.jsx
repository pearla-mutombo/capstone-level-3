import { NavLink } from "react-router-dom";

// A simple placeholder page. Login.jsx links here, so this needs to
// exist as a real route - build out an actual signup form later if
// account creation becomes a requirement.
export default function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-(--surface) px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Registration Coming Soon
        </h1>
        <p className="mb-6 text-gray-600">
          Account creation isn't available yet. In the meantime, use the demo
          login to explore NOVUS Market.
        </p>
        <NavLink
          to="/login"
          className="inline-block rounded-lg bg-(--nova) px-6 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
          Go to Login
        </NavLink>
      </div>
    </main>
  );
}
