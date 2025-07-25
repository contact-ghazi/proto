import { Link } from "react-router-dom";

function Navbar({ transparent = false }) {
  return (
    <nav
      className={`${
        transparent
          ? "bg-transparent absolute top-0 left-0 w-full z-50"
          : "bg-white/30 backdrop-blur-md shadow-lg"
      } px-8 pt-2 pb-4 flex justify-between items-center`}
    >
      <h1 className="text-2xl font-bold text-white">Advocate AI</h1>
      <div className="flex space-x-8 text-base font-medium items-center">
        {/* Home */}
        <Link
          to="/"
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Home
        </Link>

        {/* About */}
        <span className="text-white opacity-50 cursor-not-allowed">About</span>

        {/* Immediate Consult */}
        <Link
          to="#immediate-consult"
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("immediate-consult");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-center leading-tight"
          style={{ display: "inline-block" }}
        >
          Immediate <br /> Consult
        </Link>

        {/* Sign In / Sign Up */}
        <a
  href="/login"
  className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
>
  Sign In / Sign Up
</a>

      </div>
    </nav>
  );
}

export default Navbar;
