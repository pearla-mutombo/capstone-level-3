import { NavLink } from "react-router-dom";
import { useStateContext } from "../hooks/useStateContext";

export default function Dashboard() {
  const [login] = useStateContext("login");
  const isLoggedIn = login.email !== "";

  return (
    <main className="min-h-screen bg-[var(--surface)] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {isLoggedIn ? (
          <div className="rounded-xl bg-white p-10 shadow-md">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              Welcome back!
            </h1>
            <p className="text-gray-600">
              You're logged in as{" "}
              <span className="font-semibold">{login.email}</span>.
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <h1 className="mb-4 text-2xl font-semibold">
              You need to log in to see your dashboard
            </h1>
            <NavLink
              to="/login"
              className="inline-block rounded-lg bg-[var(--nova)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--nova-dark)]">
              Go to Login
            </NavLink>
          </div>
        )}
      </div>
    </main>
  );
}
