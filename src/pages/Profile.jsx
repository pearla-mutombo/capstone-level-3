import { NavLink } from "react-router-dom";
import { useStateContext } from "../hooks/useStateContext";

export default function Profile() {
  const [login] = useStateContext("login");
  const isLoggedIn = login.email !== "";

  return (
    <main className="min-h-screen bg-(--surface) py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {isLoggedIn ? (
          <div className="rounded-xl bg-white p-10 shadow-md">
            <h1 className="mb-6 text-4xl font-bold text-gray-900">
              Your Profile
            </h1>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg text-gray-900">{login.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-10 text-center shadow-md">
            <h1 className="mb-4 text-2xl font-semibold">
              You need to log in to see your profile
            </h1>
            <NavLink
              to="/login"
              className="inline-block rounded-lg bg-(--nova) px-6 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
              Go to Login
            </NavLink>
          </div>
        )}
      </div>
    </main>
  );
}
