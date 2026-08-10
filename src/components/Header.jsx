import Navbar from "./Navbar.jsx";
import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <Navbar />
      <h1 className="text-3xl font-extrabold text-center p-4 mt-6">
        NOVUS Market ⭐
      </h1>
    </header>
  );
}
