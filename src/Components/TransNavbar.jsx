import { useNavigate, useLocation } from "react-router-dom";

function TransNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    window.dispatchEvent(new Event("stopVanta"));
    navigate(path);
  };

  // ✅ Apply background based on route
  const isAboutPage = location.pathname === "/about";
  const navClasses = isAboutPage
    ? "bg-black/30 backdrop-blur-md shadow-lg" // Blur on About page
    : "bg-transparent"; // Transparent on Home & Login

  return (
    <nav className={`${navClasses} px-8 pt-4 pb-4 flex justify-between items-center absolute top-0 w-full z-20`}>
      <h1 className="text-2xl font-bold text-white">Advocate AI</h1>
      <div className="flex space-x-8 text-base font-medium items-center">
        
        {/* Home */}
        <button
          onClick={() => handleNavigation("/")}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Home
        </button>

        {/* About */}
        <button
          onClick={() => handleNavigation("/about")}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          About
        </button>

        {/* Immediate Consult */}
        <button
          onClick={() => handleNavigation("/?scroll=immediate")}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Immediate Consult
        </button>

        {/* Sign In / Sign Up */}
        <button
          onClick={() => handleNavigation("/login")}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Sign In / Sign Up
        </button>

      </div>
    </nav>
  );
}

export default TransNavbar;
