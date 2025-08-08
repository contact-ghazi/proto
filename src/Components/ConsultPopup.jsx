// ✅ Final FIXED ConsultPopup.jsx using .consult-popup CSS only on mobile scroll

import React, { useState } from 'react';
import { X, User, Phone, Mail, MessageSquare, Calendar } from 'lucide-react';
import ChatWindow from './ChatWindow';
import useIsMobile from '../hooks/useIsMobile';
import './ConsultPopup.css';

const ConsultPopup = ({ isOpen, onClose }) => {
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    urgency: 'medium',
    preferredDate: '',
    description: ''
  });

  const [showChat, setShowChat] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultation request:', formData);
    alert('Thank you! Your consultation request has been submitted.');
    setShowChat(true);
  };

  if (!isOpen) return null;

  return (
    <div className="consult-popup-overlay">
      <div
        className={`consult-popup ${isMobile ? 'mobile-scroll' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">
            <MessageSquare size={20} /> Immediate Legal Consultation
          </h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="popup-content">
          {showChat ? (
            <ChatWindow />
          ) : (
            <form onSubmit={handleSubmit} className="popup-form">
              <div className="form-grid">
                {/* Personal Info */}
                <div className="form-section">
                  <h3 className="section-title">Personal Information</h3>

                  <div className="input-group">
                    <label><User size={16} /> Full Name *</label>
                    <input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your full name" />
                  </div>

                  <div className="input-group">
                    <label><Mail size={16} /> Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Enter your email" />
                  </div>

                  <div className="input-group">
                    <label><Phone size={16} /> Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
                  </div>
                </div>

                {/* Legal Info */}
                <div className="form-section">
                  <h3 className="section-title">Legal Issue Details</h3>

                  <div className="input-group">
                    <label>Type of Legal Issue *</label>
                    <select name="issue" value={formData.issue} onChange={handleInputChange} required>
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
                    <label>Urgency Level</label>
                    <select name="urgency" value={formData.urgency} onChange={handleInputChange}>
                      <option value="low">Low - Can wait</option>
                      <option value="medium">Medium - Within a week</option>
                      <option value="high">High - ASAP</option>
                      <option value="urgent">Urgent - Emergency</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label><Calendar size={16} /> Preferred Date</label>
                    <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>

              <div className="input-group full-width">
                <label>Brief Description *</label>
                <textarea name="description" rows="4" value={formData.description} onChange={handleInputChange} required placeholder="Describe your case briefly..." />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
                <button type="submit" className="submit-button">Submit Consultation Request</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultPopup;