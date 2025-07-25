import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function CloudBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "#0f172a" // dark background (like night sky)
        },
        particles: {
          number: {
            value: 40
          },
          color: {
            value: "#ffffff" // white fog-like particles
          },
          opacity: {
            value: 0.15
          },
          size: {
            value: 80, // large size for cloud effect
            random: true
          },
          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            outModes: {
              default: "out"
            }
          },
          shape: {
            type: "circle"
          }
        },
        detectRetina: true
      }}
    />
  );
}

export default CloudBackground;
