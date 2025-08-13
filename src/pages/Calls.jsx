import React, { useEffect, useMemo, useState } from "react";
import {
  Phone, Video, PhoneIncoming, PhoneOutgoing, XCircle,
  Clock, Search as SearchIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import History from "../utils/historyStore";
import "./Dashboard.css";

function fmtDur(sec) {
  if (!sec || sec <= 0) return "0m 0s";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function prettyName(peerId) {
  const raw =
    peerId ??
    "" // fallbacks can be layered here if you store other fields later
  ;
  const s = String(raw).trim();
  // If somehow we received pure digits or very short string, treat as unknown
  if (!s || s === "unknown_contact" || /^[0-9]{1,3}$/.test(s)) return "Unknown contact";
  return s
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(w => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export default function Calls() {
  const nav = useNavigate();
  const [calls, setCalls] = useState(History.getCalls());
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all"); // all | audio | video | missed

  useEffect(() => {
    const unsub = History.subscribe(() => setCalls(History.getCalls()));
    return unsub;
  }, []);

  const filtered = useMemo(() => {
    let res = calls;
    if (tab === "audio") res = res.filter(c => c.type === "audio");
    if (tab === "video") res = res.filter(c => c.type === "video");
    if (tab === "missed") res = res.filter(c => c.status === "missed");
    if (q) {
      const t = q.toLowerCase();
      res = res.filter(c => (c.peerId || "").toLowerCase().includes(t));
    }
    return res;
  }, [calls, q, tab]);

  const redial = (c) => {
    if (c.type === "audio") nav(`/audio-call?with=${encodeURIComponent(c.peerId)}`);
    else nav(`/dashboard/call/active?with=${encodeURIComponent(c.peerId)}&type=video`);
  };

  return (
    <main className="shell">
      <section className="container-xx calls-page">
        <div className="panel calls-toolbar">
          <div className="calls-search">
            <SearchIcon size={16} />
            <input
              placeholder="Search calls"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />
          </div>
          <div className="calls-tabs">
            <button className={`tab-pill ${tab==="all"?"on":""}`} onClick={()=>setTab("all")}>All</button>
            <button className={`tab-pill ${tab==="audio"?"on":""}`} onClick={()=>setTab("audio")}>Audio</button>
            <button className={`tab-pill ${tab==="video"?"on":""}`} onClick={()=>setTab("video")}>Video</button>
            <button className={`tab-pill ${tab==="missed"?"on":""}`} onClick={()=>setTab("missed")}>Missed</button>
          </div>
        </div>

        <div className="calls-list">
          {filtered.length === 0 && (
            <div className="panel subtle" style={{ textAlign:"center", padding:"28px 12px" }}>
              No calls yet.
            </div>
          )}

          {filtered.map((c) => {
            const IconType = c.type === "video" ? Video : Phone;
            const DirIco =
              c.status === "missed"
                ? XCircle
                : c.direction === "in"
                ? PhoneIncoming
                : PhoneOutgoing;

            const started = new Date(c.startedAt);
            const duration = c.endedAt ? fmtDur(c.durationSec) : "ongoing";
            const name = prettyName(c.peerId);

            return (
              <div key={c.id} className={`call-item ${c.status === "missed" ? "missed" : ""}`}>
                <div className="call-left">
                  <div className="ava-wrap">
                    <img
                      className="call-ava"
                      src="/assets/placeholder-avatar.png"
                      alt={name}
                      onError={(e)=>{ e.currentTarget.style.background="#222"; e.currentTarget.removeAttribute("src"); }}
                    />
                    <span className={`dir-dot ${c.status === "missed" ? "miss" : c.direction === "in" ? "in" : "out"}`}>
                      <DirIco size={12} />
                    </span>
                  </div>
                </div>

                <div className="call-mid">
                  <div className="call-name-row">
                    <div className="call-name">{name}</div>
                    <span className={`badge ${c.type === "video" ? "video" : "voice"}`}>
                      <IconType size={14} /> {c.type}
                    </span>
                  </div>
                  <div className="call-meta">
                    <span>{started.toLocaleString()}</span>
                    <span className="sep">•</span>
                    <span style={{ textTransform:"capitalize" }}>{c.status}</span>
                    <span className="sep">•</span>
                    <span><Clock size={14} style={{ verticalAlign:"-2px" }} /> {duration}</span>
                  </div>
                </div>

                <div className="call-actions">
                  <button className="cta ghost" onClick={()=>redial(c)}>
                    {c.type === "video" ? "Video" : "Audio"} Call
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
