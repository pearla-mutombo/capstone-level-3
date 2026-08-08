import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/Button";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    return(
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to your NOVUS Market account.
          </p>

        </div>

        {loginError && (
          <div className="bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 mb-6">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 mb-2"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 mb-2"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit">
            Login
          </Button>

        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
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
            setLoginError("Please enter your email and password of your choice.");
            return;
        }

        if (email == "customer@novusmarket.com" &&
            password === "novus123"
        ) {
            navigate("/dashboard");
            
        } else {
            setLoginError("Invalid email or password.");
        }
    }
}