import { useLocation, useNavigate } from "react-router-dom";

function LawyerProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const lawyer = location.state;

  if (!lawyer) {
    return <p>No lawyer selected.</p>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">← Back</button>
      <img src={lawyer.image} alt={lawyer.name} className="w-48 h-48 rounded-full mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-center mb-4">{lawyer.name}</h1>
      <p className="text-center text-gray-600">{lawyer.type} Lawyer</p>
      <p className="text-center text-gray-500 mb-6">Experience: {lawyer.experience}</p>
      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg block mx-auto hover:bg-purple-700 transition">
        Start Consultation
      </button>
    </div>
  );
}

export default LawyerProfile;
