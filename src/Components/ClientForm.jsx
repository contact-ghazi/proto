import React, { useState } from "react";

function ClientForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client Details:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Client Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block text-gray-700 mb-1">Contact Number</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your contact number"
            required
          />
        </div>

        {/* Case Category */}
        <div>
          <label className="block text-gray-700 mb-1">Case Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Civil">Civil</option>
            <option value="Criminal">Criminal</option>
            <option value="Corporate">Corporate</option>
            <option value="Family">Family</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ClientForm;
