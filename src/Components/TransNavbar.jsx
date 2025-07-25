import { useNavigate } from "react-router-dom";

function TransNavbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // 🔥 Tell Login page to stop Vanta effect
    window.dispatchEvent(new Event("stopVanta"));
    navigate(path);
  };

  return (
    <nav className="bg-transparent px-8 pt-4 pb-4 flex justify-between items-center absolute top-0 w-full z-20">
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
        <span className="text-white opacity-50 cursor-not-allowed">
          About
        </span>

        {/* Immediate Consult */}
        <button
          onClick={() => handleNavigation("/?scroll=immediate")}
          className="text-white transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Immediate Consult
        </button>

      </div>
    </nav>
  );
}

export default TransNavbar;
