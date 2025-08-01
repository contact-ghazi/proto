import { Link } from "react-router-dom";

function Navbar({ transparent = false }) {
  return (
    <nav
      className={`${transparent
        ? "bg-transparent absolute top-0 left-0 w-full z-50"
        : "bg-white/30 backdrop-blur-md shadow-lg"
      } px-8 py-4 flex justify-between items-center z-50`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white">Advocate AI</h1>

      {/* Links for Desktop Only */}
      <div className="hidden md:flex gap-8 text-base font-medium items-center">
        <Link
          to="/"
          className="text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition"
        >
          About
        </Link>
        <a
          href="#immediate-consult"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("immediate-consult");
            if (section) section.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition"
        >
          Immediate Consult
        </a>
        <Link
          to="/login"
          className="text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition"
        >
          Sign In / Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
