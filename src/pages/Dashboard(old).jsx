import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import { lawyers } from "../data/lawyers";
import FilterBar from "../Components/FilterBar";
import NavRail from "../Components/NavRail";
import {
  Star, Phone, MessageSquare, MapPin, Clock, IndianRupee, BadgeCheck
} from "lucide-react";
import "./Dashboard.css";

const Pill = ({ children }) => <span className="pill">{children}</span>;

const Rating = ({ value = 0 }) => (
  <div className="rating-row" aria-label={`Rating ${value} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} className={i < value ? "star on" : "star"} />
    ))}
    <span className="rating-number">{value}.0</span>
  </div>
);

export default function Dashboard() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState("lawyers");
  const [filtered, setFiltered] = useState(lawyers);
  const [sheet, setSheet] = useState(null);

  const handleFilter = (f) => {
    let d = [...lawyers];
    if (f.type) d = d.filter((x) => x.type === f.type);
    if (f.rating) d = d.filter((x) => x.rating === +f.rating);
    if (f.location)
      d = d.filter((x) =>
        (x.location || "").toLowerCase().includes(f.location.toLowerCase())
      );
    if (f.experience) {
      const [min, max] = f.experience.split("-").map(Number);
      d = d.filter((x) =>
        max ? x.experience >= min && x.experience <= max : x.experience >= min
      );
    }
    if (f.gender) d = d.filter((x) => x.gender === f.gender);
    if (f.price)
      d = d.sort((a, b) => (f.price === "low" ? a.price - b.price : b.price - a.price));
    setFiltered(d);
  };

  const go = (type, l) => {
    // TODO: wire into ChatWindow / PeerVideoCall routes or popups
    console.log(type, l?.name);
  };

  return (
    <div className="page-root">
      {/* soft background waves */}
      <div className="brand-haze" />
      <div className="brand-haze delay" />

      {/* Navigation rail / mobile tabs */}
      <NavRail active={active} onChange={setActive} />

      {/* Main content lane (always "shell"; CSS handles margins) */}
      <main className="shell">
        {/* hero */}
        <section className="hero container-xx">
          <h1 className="hero-title">Top lawyers near you</h1>
          <p className="hero-sub">Handpicked • Verified • Fast response</p>

          <div className="chip-row">
            <Pill>Property</Pill>
            <Pill>Criminal</Pill>
            <Pill>Family</Pill>
            <Pill>Corporate</Pill>
            <Pill>Documentation</Pill>
          </div>
        </section>

        <div className="filter-wrap container-xx">
          <FilterBar onFilterChange={handleFilter} />
        </div>

        {/* results */}
        <section className="list container-xx">
          {filtered.map((l) => (
            <motion.article
              key={l.id}
              className="card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18 }}
              onClick={() => isMobile && setSheet(l)}
            >
              <div className="card-left">
                <img src={l.image} alt={l.name} className="avatar" loading="lazy" />
              </div>

              <div className="card-mid">
                <div className="name-row">
                  <h3 className="name">{l.name}</h3>
                  <BadgeCheck size={16} className="verified" title="Verified" />
                </div>

                <div className="meta">
                  <span className="type">{l.type} Lawyer</span>
                  {l.location && (
                    <span className="loc">
                      <MapPin size={14} />
                      {l.location}
                    </span>
                  )}
                </div>

                <div className="chips">
                  <Pill>{l.experience} yrs exp</Pill>
                  {l.specialization && <Pill>{l.specialization}</Pill>}
                  {typeof l.price === "number" && (
                    <Pill>
                      <IndianRupee size={12} /> {l.price}/consult
                    </Pill>
                  )}
                </div>

                <div className="assist">
                  <Rating value={l.rating} />
                  <div className="eta">
                    <Clock size={14} /> {l.responseTime || "Replies in 5–15 min"}
                  </div>
                </div>
              </div>

              <div className="card-right">
                <button
                  className="cta ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    go("chat", l);
                  }}
                >
                  <MessageSquare size={18} />
                  <span>Chat</span>
                </button>
                <button
                  className="cta solid"
                  onClick={(e) => {
                    e.stopPropagation();
                    go("call", l);
                  }}
                >
                  <Phone size={18} />
                  <span>Call</span>
                </button>
              </div>
            </motion.article>
          ))}
        </section>
      </main>

      {/* mobile bottom sheet */}
      <AnimatePresence>
        {isMobile && sheet && (
          <motion.div
            className="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <div className="sheet-handle" />
            <div className="sheet-head">
              <img src={sheet.image} alt={sheet.name} className="sheet-avatar" />
              <div className="sheet-meta">
                <div className="sheet-name">{sheet.name}</div>
                <div className="sheet-sub">
                  {sheet.type} • {sheet.experience} yrs • {sheet.location}
                </div>
              </div>
              <button className="sheet-close" onClick={() => setSheet(null)}>
                ✕
              </button>
            </div>
            <div className="sheet-actions">
              <button className="cta ghost big" onClick={() => go("chat", sheet)}>
                <MessageSquare size={18} /> Chat now
              </button>
              <button className="cta solid big" onClick={() => go("call", sheet)}>
                <Phone size={18} /> Call now
              </button>
            </div>
            <div className="sheet-foot">Secure 1-on-1 • E2E chat • P2P calls</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
