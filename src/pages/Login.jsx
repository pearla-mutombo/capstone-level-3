import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useStateContext } from "../hooks/useStateContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Get the setter for our shared login state.
  const [, setLogin] = useStateContext("login");

  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4 py-12">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Login to your NOVUS Market account.
          </p>
        </div>

        {loginError && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 text-red-700">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--nova)]"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--nova)]"
            />
          </div>

          <Button type="submit">Login</Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-semibold text-[var(--nova)] hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </main>
  );

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setLoginError("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setLoginError("");
  }

  function handleLogin(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      setLoginError("Please enter your email and password.");
      return;
    }

    if (email === "customer@novusmarket.com" && password === "novus123") {
      setLogin({ email, password });
      navigate("/dashboard");
    } else {
      setLoginError("Invalid email or password.");
    }
  }
}
