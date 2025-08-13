// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Filter, MapPin, Star, MessageSquare, Phone, ChevronDown
} from "lucide-react";
import { lawyers } from "../data/lawyers";
import "./Dashboard.css";

export default function Dashboard() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // simple filters (mock)
  const [type, setType] = useState("All");
  const [rating, setRating] = useState("Any");
  const [loc, setLoc] = useState("Anywhere");
  const [price, setPrice] = useState("Any");
  const [exp, setExp] = useState("Any");
  const [gender, setGender] = useState("Any");

  const chips = ["Property", "Criminal", "Family", "Corporate", "Documentation"];

  const filtered = useMemo(() => {
    // hook up real filter logic if you like—keeping demo simple
    return (lawyers || []).slice(0, 20);
  }, [type, rating, loc, price, exp, gender]);

  const openCall = (id, mode = "video") => {
    nav(`/dashboard/call/active?with=${id}&type=${mode}`);
  };

  return (
    <main className="shell">
      <section className="container-xx">
        {/* HERO */}
        <div className="hero">
          <div className="hero-title">Top lawyers near you</div>
          <div className="hero-sub">Handpicked • Verified • Fast response</div>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="chips" style={{ marginBottom: 10 }}>
          {chips.map((c) => (
            <button key={c} className="chip">{c}</button>
          ))}
        </div>

        {/* FILTER BAR */}
        <div className="filter-card panel">
          <div className="filter-head">
            <Filter size={18} />
            <span>Filter Lawyers</span>
          </div>

          <div className="filter-row">
            <Select value={type} onChange={setType} label="Type" />
            <Select value={rating} onChange={setRating} label="Rating" />
            <Select value={loc} onChange={setLoc} label="Location" />
            <Select value={price} onChange={setPrice} label="Price" />
            <Select value={exp} onChange={setExp} label="Experience" />
            <Select value={gender} onChange={setGender} label="Gender" />
          </div>
        </div>

        {/* LAWYER LIST */}
        <div className="list">
          {filtered.map((l) => (
            <article className="lawyer-card" key={l.id}>
              <img
                className="lawyer-ava"
                src={l.image || "/assets/placeholder-avatar.png"}
                alt={l.name}
                onError={(e) => {
                  e.currentTarget.src = "/assets/placeholder-avatar.png";
                }}
              />

              <div className="lawyer-main">
                <div className="lawyer-name">
                  <Link to={`/lawyer/${l.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {l.name}
                  </Link>
                </div>

                <div className="lawyer-sub">
                  <span>{l.specialization || l.type || "Lawyer"}</span>
                  <span>•</span>
                  <span className="flex row" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={14} />
                    {l.location || l.city || "—"}
                  </span>
                  <span className="badge">{l.experience || l.exp || "—"} yrs exp</span>
                  <span className="badge money">₹ {l.fee || l.price || "—"}/consult</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                  {renderStars(l.rating || 4.5)}
                  <span style={{ fontSize: 13, opacity: 0.9 }}>{(l.rating || 4.5).toFixed(1)}</span>
                  <span style={{ marginInline: 8, opacity: 0.5 }}>•</span>
                  <span style={{ fontSize: 13, opacity: 0.9 }}>Replies in 5–15 min</span>
                </div>
              </div>

              <div className="lawyer-actions">
                <Link className="btn ghost" to={`/dashboard/chat?with=${l.id}`}>
                  <MessageSquare size={16} />&nbsp;Chat
                </Link>
                <button className="btn primary" onClick={() => openCall(l.id, "video")}>
                  <Phone size={16} />&nbsp;Call
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

/* ---------------- Small helpers ---------------- */

function renderStars(value) {
  // draw out of 5 with halves if you want—keeping full stars for simplicity
  const full = Math.round(Math.min(5, Math.max(0, value)));
  return (
    <span style={{ display: "inline-flex", gap: 3 }}>
      {new Array(5).fill(0).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < full ? "#facc15" : "transparent"}
          color={i < full ? "#facc15" : "rgba(255,255,255,.45)"}
        />
      ))}
    </span>
  );
}

function Select({ value, onChange, label }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      className="btn ghost"
      style={{ justifyContent: "space-between", display: "flex", alignItems: "center" }}
      onClick={() => setOpen((v) => !v)}
      title={label}
    >
      <span>{label === "Type" ? value : label}</span>
      <ChevronDown size={16} />
    </button>
  );
}
