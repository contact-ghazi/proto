import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white/30 backdrop-blur-md shadow-lg px-8 pt-2 pb-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Advocate AI</h1>
      <div className="space-x-6 text-base font-medium">
        <Link
          to="/"
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Home
        </Link>

        <span className="text-white opacity-50 cursor-not-allowed">
          About
        </span>
        <span className="text-white opacity-50 cursor-not-allowed">
          Contact
        </span>

        <Link
          to="/login"
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Sign In / Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
