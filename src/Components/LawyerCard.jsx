import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function LawyerCard({ lawyer }) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 flex gap-6 items-center border border-purple-500/30 relative overflow-hidden hover:shadow-lg hover:shadow-purple-500/30 transition-all">
      
      {/* Left: Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          className="w-28 h-28 rounded-lg object-cover border-4 border-purple-500/50"
        />
      </div>

      {/* Right: Lawyer Info */}
      <div className="flex flex-col flex-1">
        <h3 className="text-2xl font-semibold mb-1">{lawyer.name}</h3>
        <p className="text-purple-400 text-sm mb-1">{lawyer.type} Lawyer</p>
        <p className="text-gray-400 text-sm mb-1">{lawyer.experience} Years Experience</p>
        
        {/* Extra Details */}
        <p className="text-gray-300 text-sm mb-1">Location: {lawyer.location || "Not specified"}</p>
        <p className="text-gray-300 text-sm mb-1">Gender: {lawyer.gender || "N/A"}</p>
        <p className="text-gray-300 text-sm mb-2">Price: ₹{lawyer.price || "Negotiable"}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-lg ${i < lawyer.rating ? "text-yellow-400" : "text-gray-500"}`}
            />
          ))}
        </div>

        {/* Select Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-5 py-2 bg-purple-600 rounded-full text-white text-sm hover:bg-purple-700 transition"
        >
          Select
        </motion.button>
      </div>
    </div>
  );
}
