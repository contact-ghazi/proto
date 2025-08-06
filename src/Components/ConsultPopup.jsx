import React, { useState } from 'react';
import { X, User, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';
import './ConsultPopup.css';

const ConsultPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    urgency: 'medium',
    preferredDate: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultation request:', formData);
    // Here you would typically send the data to your backend
    alert('Thank you! Your consultation request has been submitted. We will contact you soon.');
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      issue: '',
      urgency: 'medium',
      preferredDate: '',
      description: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="consult-popup-overlay" onClick={onClose}>
      <div className="consult-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">
            <MessageSquare className="popup-icon" />
            Immediate Legal Consultation
          </h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-grid">
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="input-group">
                <label htmlFor="name">
                  <User size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone">
                  <Phone size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Legal Issue Details */}
            <div className="form-section">
              <h3 className="section-title">Legal Issue Details</h3>
              
              <div className="input-group">
                <label htmlFor="issue">Type of Legal Issue *</label>
                <select
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select legal issue type</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="civil">Civil Law</option>
                  <option value="family">Family Law</option>
                  <option value="corporate">Corporate Law</option>
                  <option value="property">Property Law</option>
                  <option value="employment">Employment Law</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="urgency">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                >
                  <option value="low">Low - Can wait a few days</option>
                  <option value="medium">Medium - Within a week</option>
                  <option value="high">High - Need immediate attention</option>
                  <option value="urgent">Urgent - Emergency situation</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="preferredDate">
                  <Calendar size={16} />
                  Preferred Consultation Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="input-group full-width">
            <label htmlFor="description">Brief Description of Your Case *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Please provide a brief description of your legal issue..."
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Submit Consultation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultPopup; 