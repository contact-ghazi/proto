import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

function ParticleBackProfile() {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles-profile"
      init={particlesInit}
      options={{
        background: {
          color: "#0f0f0f", // Dark background to match your theme
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Smooth hover effect
            },
            onClick: {
              enable: true,
              mode: "push", // Adds particles on click
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              links: {
                opacity: 0.6,
              },
            },
          },
        },
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: ["#9333ea", "#a855f7", "#c084fc"], // Neon purple shades
          },
          links: {
            enable: true,
            color: "#a855f7",
            distance: 150,
            opacity: 0.3,
            width: 1.2,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            outModes: {
              default: "bounce",
            },
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 2, max: 4 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Behind everything
      }}
    />
  );
}

export default ParticleBackProfile;
