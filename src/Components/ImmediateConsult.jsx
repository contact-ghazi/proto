import React, { useState } from "react";
import ConsultPopup from "./ConsultPopup"; // adjust path if needed

function ImmediateConsult() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div
      id="immediate-consult"
      className="flex flex-col items-center justify-center text-center py-32 min-h-[60vh] -mt-10 bg-gradient-to-r from-purple-700 via-purple-900 to-black text-white"
    >
      <h2 className="text-4xl font-bold mb-6">Get Immediate Legal Consultation</h2>
      <p className="text-lg max-w-2xl mb-8">
        Connect with experienced lawyers instantly through Advocate AI.
        No waiting, no delays — just quick, secure, and reliable legal advice whenever you need it.
      </p>

      <button
        onClick={openPopup}
        className="bg-purple-600 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        🚀 Immediate Consult
      </button>

      {/* ✅ Show the popup conditionally */}
      <ConsultPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
}

export default ImmediateConsult;
