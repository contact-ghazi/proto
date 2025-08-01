import React from "react";
import "./GradientLogin.css";
import TransNavbar from "../Components/TransNavbar";
import ParticlesBackground from "../Components/ParticlesBackground";
import useIsMobile from "../hooks/useIsMobile";

function AnimatedGradientLogin({ children }) {
  const isMobile = useIsMobile();

  return (
    <div className="gradient-bg min-h-screen flex flex-col overflow-hidden relative">
      <ParticlesBackground /> {/* zIndex: 0 */}

      {/* ✅ Show TransNavbar only on Desktop */}
      {!isMobile && (
        <div className="absolute top-0 left-0 w-full z-20">
          <TransNavbar />
        </div>
      )}

      {/* ✅ Main Content */}
      <div className="flex flex-1 items-center justify-center relative z-10 w-full">
        {children} {/* ✅ Your Login form will be perfectly centered */}
      </div>
    </div>
  );
}

export default AnimatedGradientLogin;
