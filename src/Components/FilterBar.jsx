import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import "./FilterBar.css";
import Select from 'react-select';

export default function FilterBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    type: "",
    rating: "",
    location: "",
    price: "",
    experience: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <FaFilter className="filter-icon" />
        <h3>Filter Lawyers</h3>
      </div>

      <div className="filter-controls">
        {/* Lawyer Type */}
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Type</option>
          <option value="Criminal">Criminal Lawyer</option>
          <option value="Civil">Civil Lawyer</option>
          <option value="Corporate">Corporate Lawyer</option>
          <option value="Family">Family Lawyer</option>
          <option value="Property">Property Lawyer</option>
          <option value="Labour">Labour & Employment Lawyer</option>
          <option value="Cyber">Cybercrime Lawyer</option>
          <option value="Constitutional">Constitutional Lawyer</option>
          <option value="Intellectual Property">IPR (Intellectual Property) Lawyer</option>
          <option value="Consumer">Consumer Lawyer</option>
          <option value="Banking">Banking & Finance Lawyer</option>
          <option value="Taxation">Taxation Lawyer</option>
          <option value="Environmental">Environmental Lawyer</option>
          <option value="Immigration">Immigration Lawyer</option>
          <option value="NRI">NRI Legal Services</option>
        </select>



        {/* Rating */}
        <select name="rating" value={filters.rating} onChange={handleChange}>
          <option value="">Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>

        {/* Location */}
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
        />

        {/* Price */}
        <select name="price" value={filters.price} onChange={handleChange}>
          <option value="">Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        {/* Experience */}
        <select name="experience" value={filters.experience} onChange={handleChange}>
          <option value="">Experience</option>
          <option value="1-5">1-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="10+">10+ years</option>
        </select>

        {/* Gender */}
        <select name="gender" value={filters.gender} onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  );
}
