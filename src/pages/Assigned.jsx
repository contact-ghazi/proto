import React from "react";
import { useNavigate } from "react-router-dom";
import { lawyers } from "../data/lawyers";
import { Phone, MessageSquare, BadgeCheck, MapPin, IndianRupee } from "lucide-react";

export default function Assigned() {
  const navigate = useNavigate();
  // demo: pretend first lawyer is assigned
  const l = lawyers[0];

  const go = (type) => {
    if (type === "chat") navigate(`/dashboard/chat?with=${l.id}`);
    if (type === "call") navigate(`/dashboard/call?with=${l.id}`);
  };

  return (
    <section className="container-xx">
      <h2 className="hero-title" style={{ marginTop: 4, marginBottom: 12 }}>Your assigned lawyer</h2>
      <article className="card" style={{ marginTop: 12 }}>
        <div className="card-left"><img src={l.image} alt={l.name} className="avatar" /></div>
        <div className="card-mid">
          <div className="name-row">
            <h3 className="name">{l.name}</h3>
            <BadgeCheck size={16} className="verified" />
          </div>
          <div className="meta">
            <span className="type">{l.type} Lawyer</span>
            {l.location && <span className="loc"><MapPin size={14} />{l.location}</span>}
          </div>
          <div className="chips">
            <span className="pill">{l.experience} yrs exp</span>
            <span className="pill"><IndianRupee size={12} /> {l.price}/consult</span>
          </div>
        </div>
        <div className="card-right">
          <button className="cta ghost" onClick={() => go("chat")}><MessageSquare size={18} /><span>Chat</span></button>
          <button className="cta solid" onClick={() => go("call")}><Phone size={18} /><span>Call</span></button>
        </div>
      </article>
    </section>
  );
}
