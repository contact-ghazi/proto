// src/Pages/Home.jsx
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import TransNavbar from "../Components/TransNavbar";
import FeaturesSection from "../Components/FeaturesSection";
import ImmediateConsult2 from "../Components/ImmediateConsult2";
import Footer from "../Pages/Footer";
import AboutCompany from "../Components/AboutCompany";
import useIsMobile from "../hooks/useIsMobile";
import TypeWriter from "../Components/TypeWriter";

import { Home as HomeIcon, Info, MessageSquare, LogIn } from "lucide-react";
import "./home.css"; // ensures .type-glow keyframes are loaded

function Home() {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (location.pathname === "/") {
      const params = new URLSearchParams(location.search);
      if (params.get("scroll") === "immediate") {
        document.getElementById("immediate-consult")?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Right-side background image */}
      <div className="absolute right-0 top-0 h-full w-1/2">
        <img src="/jjj.png" alt="Background" className="w-100 h-100 object-cover opacity-30" />
      </div>

      <div className="relative z-10">
        {!isMobile && <TransNavbar />}

        {isMobile && (
          <div className="fixed top-0 left-0 w-full bg-transparent text-white text-left px-6 py-3 font-bold text-lg z-50">
            Advocate AI
          </div>
        )}

{/* ✅ Welcome Section */}
<div
  className={`flex flex-col items-center justify-start w-11/12 mx-auto p-6
    ${isMobile ? "pt-48" : "pt-56"}`} // 🔹 More top padding on both mobile & desktop
>
  <div
    className={`flex flex-col text-white max-w-xl w-full ${
      isMobile ? "items-center" : "lg:text-left lg:-ml-[600px]"
    }`}
  >
    {/* Welcome Card */}
    <div
      className="bg-white/10 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg text-center w-full"
      style={{ minHeight: 150 }}
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Welcome to Advocate AI
      </h1>
      <p className="text-base md:text-lg">
        We connect you with instant legal help.
      </p>
    </div>

    {/* Typewriter Lines with extra reserved height */}
    <div
      className="mt-16 w-full"
      style={{ minHeight: 150 ,marginBottom: "40px" }} // 🔹 Reserve enough height for all lines
    >
      <TypeWriter
  mode="stacked"
  lines={[
    "Resolve disputes with confidence.",
    "Draft contracts fast.",
    "Chat with a verified lawyer.",
    "24/7 instant consult.",
  ]}
  typingSpeed={45}
  startDelay={300}
  betweenDelay={250}
  loop={true}        // ensure looping
  loopDelay={400}   // pause before restarting
  glowActive
  className="text-xl md:text-2xl font-semibold"
  lineGapClass="mt-2"
/>

    </div>
  </div>
</div>



        {/* ✅ Features & Immediate Consult */}
        <FeaturesSection />
        <AboutCompany />
        <ImmediateConsult2 />

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
