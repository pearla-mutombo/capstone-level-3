import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setRegisterError("");
    setRegisterMessage("");
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setRegisterError("");
    setRegisterMessage("");
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
    setRegisterError("");
    setRegisterMessage("");
  }

  async function handleRegister(event) {
    event.preventDefault();

    setRegisterError("");
    setRegisterMessage("");

    if (email === "" || password === "" || confirmPassword === "") {
      setRegisterError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setRegisterError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.error || "Unable to create your account.");
        return;
      }

      setRegisterMessage(
        "Your account was created successfully. Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Register request error:", error);
      setRegisterError("Unable to connect to the server. Please try again.");
    }
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--surface)" }}>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-gray-600">Join NOVUS Market today.</p>
        </div>

        {registerError && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 text-red-700">
            {registerError}
          </div>
        )}

        {registerMessage && (
          <div className="mb-6 rounded-lg border border-green-300 bg-green-100 p-4 text-green-700">
            {registerMessage}
          </div>
        )}

        <form onSubmit={handleRegister}>
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
              placeholder="you@novusmarket.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-5">
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
              placeholder="Create a password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block font-medium text-gray-700">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <Button type="submit">Create Account</Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--nova)" }}>
            Login
          </NavLink>
        </p>
      </div>
    </main>
  );
}
