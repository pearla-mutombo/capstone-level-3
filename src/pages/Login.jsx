import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useStateContext } from "../hooks/useStateContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Get the setter for our shared login state.
  const [, setLogin] = useStateContext("login");

  const navigate = useNavigate();

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--surface)" }}>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>

          <p className="mt-2 text-gray-600">
            Login to your NOVUS Market account.
          </p>
        </div>

        {/* Display an error when the login is unsuccessful. */}
        {loginError && (
          <div
            className="mb-6 rounded-lg border border-red-300 bg-red-100 p-4 text-red-700"
            role="alert">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Email */}
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
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
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
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Login Button */}
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-semibold hover:underline"
            style={{ color: "var(--nova)" }}>
            Register
          </NavLink>
        </p>
      </div>
    </main>
  );

  // Update the email state when the user types.
  function handleEmailChange(event) {
    setEmail(event.target.value);
    setLoginError("");
  }

  // Update the password state when the user types.
  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setLoginError("");
  }

  // Handle the login form.
  async function handleLogin(event) {
    event.preventDefault();

    // Check that the user entered both fields.
    if (email.trim() === "" || password === "") {
      setLoginError("Please enter your email and password.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN DATA FROM SERVER:", data);

      if (!response.ok) {
        setLoginError(data.error || "Invalid email or password.");
        return;
      }

      // Get the user's information from the server.
      const loggedInEmail = data.email || "";
      const loggedInId = data.id || "";

      // Save the logged-in user in shared state.
      setLogin({
        id: loggedInId,
        email: loggedInEmail,
        isAdmin: data.isAdmin,
      });

      // Check whether the server identified this user as an administrator.
      const isAdmin = data.isAdmin;

      // Send administrators to the product management dashboard.
      if (isAdmin) {
        navigate("/admin-dashboard");
        return;
      }

      // Send regular customers to their customer dashboard.
      navigate("/dashboard");
    } catch (error) {
      console.error("Login request error:", error);
      setLoginError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }
}
