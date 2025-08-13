import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { lawyers } from "../data/lawyers";
import FilterMenu from "../Components/FilterMenu";
import { Star, Phone, MessageSquare, MapPin, Clock, IndianRupee, BadgeCheck } from "lucide-react";

const Pill = ({ children }) => <span className="pill">{children}</span>;

const Rating = ({ value = 0 }) => (
  <div className="rating-row" aria-label={`Rating ${value} of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={16} className={i < value ? "star on" : "star"} />
    ))}
    <span className="rating-number">{value.toFixed ? value.toFixed(1) : value}</span>
  </div>
);

export default function Lawyers() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [sheet, setSheet] = useState(null);
  const [filters, setFilters] = useState({ type:"", rating:"", location:"", price:"", exp:"", gender:"" });

  const filtered = useMemo(() => {
    let d = [...(lawyers || [])];
    if (q) {
      const t = q.toLowerCase();
      d = d.filter(x =>
        x.name.toLowerCase().includes(t) ||
        (x.type||"").toLowerCase().includes(t) ||
        (x.location||"").toLowerCase().includes(t)
      );
    }
    if (filters.type)     d = d.filter(x => x.type === filters.type);
    if (filters.rating)   d = d.filter(x => (x.rating || 0) >= parseFloat(filters.rating));
    if (filters.location) d = d.filter(x => (x.location||"").toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.price)    d = d.filter(x => typeof x.fee === "number" && x.fee <= parseInt(filters.price.replace(/\D/g,"")||"0",10));
    if (filters.exp) {
      const pick = filters.exp;
      d = d.filter(x => {
        const y = parseInt(String(x.experience || "0").replace(/\D/g,"")||"0",10);
        if (pick === "0–3 yrs")  return y <= 3;
        if (pick === "4–7 yrs")  return y >= 4 && y <= 7;
        if (pick === "8–12 yrs") return y >= 8 && y <= 12;
        if (pick === "12+ yrs")  return y >= 12;
        return true;
      });
    }
    if (filters.gender)   d = d.filter(x => (x.gender||"").toLowerCase() === filters.gender.toLowerCase());
    return d;
  }, [q, filters]);

  const go = (where, l) => {
    const id = l?.id ?? "advocate";
    if (where === "chat")  navigate(`/dashboard/chat?with=${id}`);
    if (where === "call")  navigate(`/audio-call?with=${id}`);
    if (where === "video") navigate(`/dashboard/call/active?with=${id}&type=video`);
  };

  return (
    <>
      {/* Page Hero */}
      <section className="hero">
        <h1 className="hero-title">Find your advocate</h1>
        <p className="hero-sub">Royal-purple theme • Smooth interactions • WhatsApp-like calling</p>
        <div className="chip-row">
          <Pill>Verified <BadgeCheck size={14} /></Pill>
          <Pill>Instant connect</Pill>
          <Pill>Secure payments</Pill>
        </div>
      </section>

      {/* Compact bar: Filter + Search (will never span full viewport) */}
      <div style={{ display:"flex", gap:12, alignItems:"center", margin:"10px 0 6px" }}>
        <FilterMenu onChange={setFilters} initial={filters} />
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search by name, type, or city"
          aria-label="Search lawyers"
          style={{
            height: 40, padding: "0 12px", borderRadius: 12,
            border: "1px solid rgba(255,255,255,.10)", background: "#1b1f27",
            color: "#eef0ff", width: "min(420px, 100%)"
          }}
        />
      </div>

      {/* List */}
      <div className="list">
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
                <span className="loc"><MapPin size={14} /> {l.location}</span>
                {l.eta && <span className="eta"><Clock size={14} /> {l.eta}</span>}
                {typeof l.fee === "number" && (
                  <span className="eta"><IndianRupee size={14} /> {l.fee}</span>
                )}
              </div>

              <div className="chips">
                {l.tags?.slice(0, 3).map((t, i) => <Pill key={i}>{t}</Pill>)}
              </div>

              <div className="assist">
                <Rating value={l.rating || 4.6} />
              </div>
            </div>

            <div className="card-right">
              <button className="cta ghost" onClick={(e) => { e.stopPropagation(); go("chat", l); }}>
                <MessageSquare size={16} /> <span>Chat</span>
              </button>
              <button className="cta" onClick={(e) => { e.stopPropagation(); go("call", l); }}>
                <Phone size={16} /> <span>Call</span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Mobile action sheet */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            className="sheet"
            initial={{ y: 340, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 340, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div className="sheet-handle" />
            <div className="sheet-head">
              <img className="sheet-avatar" src={sheet.image} alt={sheet.name} />
              <div className="sheet-meta">
                <div className="sheet-name">{sheet.name}</div>
                <div className="sheet-sub">{sheet.type} • {sheet.location}</div>
              </div>
              <button className="sheet-close" onClick={() => setSheet(null)}>✕</button>
            </div>

            <div className="sheet-actions">
              <button className="cta ghost big" onClick={() => go("chat", sheet)}>
                <MessageSquare size={18} /> Chat now
              </button>
              <button className="cta solid big" onClick={() => go("call", sheet)}>
                <Phone size={18} /> Call now
              </button>
            </div>

            <div className="sheet-foot">Secure 1-on-1 • E2E chat • Low-latency voice</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
