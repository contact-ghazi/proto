import TransNavbar from "../Components/TransNavbar";
import FeaturesSection from "../Components/FeaturesSection";
import ImmediateConsult from "../Components/ImmediateConsult";
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "../Pages/Footer";
import { Home as HomeIcon, Info, MessageSquare, LogIn } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";
import AboutCompany from "../Components/AboutCompany";

function Home() {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
  if (location.pathname === "/") {
    const params = new URLSearchParams(location.search);
    if (params.get("scroll") === "immediate") {
      const section = document.getElementById("immediate-consult");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" }); // ✅ SMOOTH SCROLL
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}, [location]);


  return (
    <div className="relative min-h-screen bg-black">
      {/* ✅ Background Image */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img
          src="/jjj.png"
          alt="Background"
          className="w-100 h-100 object-cover opacity-30"
        />
      </div>

      <div className="relative z-10">
        {/* ✅ Desktop Navbar */}
        {!isMobile && <TransNavbar />}


        {/* ✅ Mobile Top Bar */}
        {isMobile && (
          <div className="fixed top-0 left-0 w-full bg-transparent text-white text-left px-6 py-3 font-bold text-lg z-50">
            Advocate AI
          </div>
        )}



        {/* ✅ Welcome Section */}
        <div
          className={`flex flex-col ${isMobile
              ? "items-center justify-start pt-32 w-11/12 mx-auto"
              : "items-center justify-center min-h-[80vh]"
            } p-6`}
        >
          <div
            className={`bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg text-white text-center max-w-xl ${isMobile ? "" : "lg:text-left lg:-ml-[600px]"
              }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Advocate AI
            </h1>
            <p className="text-base md:text-lg">
              We connect you with instant legal help.
            </p>
          </div>
        </div>

        {/* ✅ Features & Immediate Consult */}
        <FeaturesSection />
        <AboutCompany />
        <ImmediateConsult />

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Bottom Navbar only for Mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-2 shadow-lg z-50">
            <Link to="/" className="flex flex-col items-center">
              <HomeIcon size={20} />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/about" className="flex flex-col items-center">
              <Info size={20} />
              <span className="text-xs">About</span>
            </Link>
            <a
              href="#immediate-consult"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("immediate-consult");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex flex-col items-center"
            >
              <MessageSquare size={20} />
              <span className="text-xs">Consult</span>
            </a>
            <Link to="/login" className="flex flex-col items-center">
              <LogIn size={20} />
              <span className="text-xs">Sign In</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
