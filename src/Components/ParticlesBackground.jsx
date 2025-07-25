import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticlesBackground() {
  const particlesInit = async (engine) => {
    await loadSlim(engine); // load slim engine
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent", // No background, so your gradient or glass shows
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Hover effect
            },
            resize: true,
          },
        },
        particles: {
          number: {
            value: 120, // More particles for a dense look
            density: { enable: true, area: 800 },
          },
          color: { value: "#ffffff" },
          shape: {
            type: "polygon", // Polygons!
            polygon: {
              sides: 6, // Hexagon effect
            },
          },
          opacity: { value: 0.4 },
          size: { value: { min: 2, max: 5 } },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            outModes: { default: "bounce" },
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
          },
        },
        detectRetina: true,
      }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  );
}

export default ParticlesBackground;
