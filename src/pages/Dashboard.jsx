import Sidebar from "../Components/Sidebar";
import { motion } from "framer-motion";
import { lawyers } from "../data/lawyers";
import { FaStar } from "react-icons/fa";
import ParticleBackProfile from "../Components/Particlebackprofile";
import "./Dashboard.css";
import FilterBar from "../Components/FilterBar";
import { useState } from "react";

function Dashboard() {
  const [filteredLawyers, setFilteredLawyers] = useState(lawyers);

const handleFilterChange = (filters) => {
  let updated = [...lawyers];

  if (filters.type) {
    updated = updated.filter((l) => l.type === filters.type);
  }

  if (filters.rating) {
    updated = updated.filter((l) => l.rating >= parseInt(filters.rating));
  }

  if (filters.location) {
    updated = updated.filter((l) =>
      l.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.experience) {
    const [min, max] = filters.experience.split("-").map(Number);
    updated = updated.filter((l) => {
      if (max) return l.experience >= min && l.experience <= max;
      return l.experience >= min;
    });
  }

  if (filters.gender) {
    updated = updated.filter((l) => l.gender === filters.gender);
  }

  if (filters.price) {
    updated = updated.sort((a, b) =>
      filters.price === "low" ? a.price - b.price : b.price - a.price
    );
  }

  setFilteredLawyers(updated);
};


  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleBackProfile />

      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 relative z-10">
        <h1 className="text-3xl font-bold mb-10 text-center">Select Your Lawyer</h1>

        <div className="dashboard-content">
          <FilterBar onFilterChange={handleFilterChange} />

          <div className="lawyer-list">
            {filteredLawyers.map((lawyer) => (
              <motion.div
                key={lawyer.id}
                className="lawyer-card"
                whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.7)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Left Image */}
                <div className="lawyer-img">
                  <img src={lawyer.image} alt={lawyer.name} />
                </div>

                {/* Right Info */}
                <div className="lawyer-info">
                  <h2>{lawyer.name}</h2>
                  <p className="lawyer-type">{lawyer.type} Lawyer</p>
                  <p className="experience">{lawyer.experience} Years Experience</p>
                  <p className="specialization">
                    Specialization: {lawyer.specialization || "Corporate Law"}
                  </p>
                  <p className="email">
                    Email: {lawyer.email || "john.smith@lawfirm.com"}
                  </p>
                  <p className="bio">
                    {lawyer.bio ||
                      "Expert in handling complex cases. Passionate about client success and delivering results."}
                  </p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < lawyer.rating ? "star active" : "star"}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="select-btn"
                  >
                    Select
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
