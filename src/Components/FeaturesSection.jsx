import React from "react";

const features = [
  {
    title: "Instant Legal Help",
    description: "Connect with AI-powered legal assistance in seconds.",
    icon: "⚡",
  },
  {
    title: "Expert Lawyers",
    description: "Access a network of experienced legal professionals.",
    icon: "👨‍⚖️",
  },
  {
    title: "Secure & Confidential",
    description: "Your data and legal conversations remain private.",
    icon: "🔒",
  },
];

function FeaturesSection() {
  return (
    <div className="relative py-32 mt-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-purple-800"></div>

      {/* Fade Overlay for Smooth Merge */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-purple-800"></div>

      {/* Container */}
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Our Key Features
        </h2>

        {/* Cards Row */}
        <div className="flex justify-center gap-10 flex-wrap">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="text-gray-300 text-sm mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
