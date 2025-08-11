import React, { useEffect, useState } from "react";
import "./LawyerPopupForm.css"; // ⬅ import CSS

export default function LawyerPopupForm({ isOpen, onClose, onDone }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    practiceArea: "",
    experience: "",
    languages: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const change = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.city || !form.practiceArea || !form.experience) {
      alert("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      localStorage.setItem("advai:lawyerProfile", JSON.stringify(form));
      onDone?.(form);
      alert("Thank you for registering, Counsel! 🙏");
      onClose?.();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="popup-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div className="popup-backdrop" />
      <div className="popup-gradient" />

      <div className="popup-card-container">
        <div className="neon-border" aria-hidden />
        <div className="popup-card">
          <div className="popup-header">
            <h2>👩‍⚖️ Quick Lawyer Registration</h2>
            <p>Help us match you to the right clients—takes under a minute.</p>
          </div>

          <form onSubmit={submit} className="popup-form">
            <Field
              label="Full Name *"
              name="fullName"
              value={form.fullName}
              onChange={change}
              placeholder="e.g., Adv. Ananya Sharma"
              autoComplete="name"
              required
            />

            <div className="popup-grid">
              <Field
                label="Phone Number *"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="+91 9XXXXXXXXX"
                autoComplete="tel"
                required
              />
              <Field
                label="Email (optional)"
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                placeholder="name@chambers.in"
                autoComplete="email"
              />
            </div>

            <div className="popup-grid">
              <Field
                label="City *"
                name="city"
                value={form.city}
                onChange={change}
                placeholder="e.g., Delhi"
                autoComplete="address-level2"
                required
              />

              <SelectField
                label="Practice Area *"
                name="practiceArea"
                value={form.practiceArea}
                onChange={change}
                required
                options={[
                  "Civil","Criminal","Family","Property","Corporate","Tax",
                  "IPR","Consumer","Labour","Cyber"
                ]}
              />
            </div>

            <div className="popup-grid">
              <Field
                label="Experience (years) *"
                type="number"
                name="experience"
                value={form.experience}
                onChange={change}
                placeholder="e.g., 5"
                min="0"
                required
              />
              <Field
                label="Languages"
                name="languages"
                value={form.languages}
                onChange={change}
                placeholder="English, Hindi"
              />
            </div>

            <div className="popup-actions">
              <button type="button" onClick={onClose} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-submit">
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small presentational helpers ---------- */

function Field({ label, name, value, onChange, type = "text", placeholder, required, autoComplete, min }) {
  return (
    <label className="field-label-block">
      <span className="field-label">{label}</span>
      <input
        className="field-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        min={min}
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange, required, options }) {
  return (
    <label className="field-label-block">
      <span className="field-label">{label}</span>
      <div className="relative">
        <select
          className="field-input select-input"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" disabled>Choose one…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="select-arrow">▾</span>
      </div>
    </label>
  );
}
