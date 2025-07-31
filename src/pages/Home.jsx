import Navbar from "../Components/Navbar";
import FeaturesSection from "../Components/FeaturesSection";
import ImmediateConsult from "../Components/ImmediateConsult";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Pages/Footer";


function Home() {
  const location = useLocation();
  useEffect(() => {
  const params = new URLSearchParams(location.search);
  if (params.get("scroll") === "immediate") {
    const section = document.getElementById("immediate-consult");
    if (section) {
      section.scrollIntoView({ behavior: "auto" });
    }
  } else {
    // If no param, just ensure we start at top
    window.scrollTo(0, 0);
  }
}, [location]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Image */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img
          src="/jjj.png"
          alt="Background"
          className="w-100 h-100 object-cover opacity-30"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 ">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-lg text-white text-center max-w-xl -ml-[600px]">
            <h1 className="text-4xl font-bold mb-4">Welcome to Advocate AI</h1>
            <p className="text-lg">We connect you with instant legal help.</p>
          </div>
        </div>

               {/* Features Section (Scroll Down to See) */}
        <FeaturesSection />
      {/* Immediate Consult Section */}
        <ImmediateConsult />

        {/* ✅ Footer only on Home page */}
        <Footer />
      </div>
    </div>
  );
}


export default Home;
