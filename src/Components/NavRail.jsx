import React, { useState } from "react";
import { Home, Users, MessageSquare, PhoneCall, FileText, Settings } from "lucide-react";
import useIsMobile from "../hooks/useIsMobile";
import "./nav-rail.css";

const items = [
  { key: "lawyers", label: "Find Lawyers", icon: Users },
  { key: "assigned", label: "Assigned", icon: Home },
  { key: "chat", label: "Messages", icon: MessageSquare },
  { key: "call", label: "Calls", icon: PhoneCall },
  { key: "docs", label: "Documents", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function NavRail({ active = "lawyers", onChange }) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <nav className="tabbar">
        {items.slice(0,5).map((it) => {
          const Icon = it.icon;
          const is = active === it.key;
          return (
            <button key={it.key} onClick={() => onChange?.(it.key)} className={`tab ${is ? "is" : ""}`} aria-label={it.label}>
              <Icon size={18} />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <aside
      className={`rail ${expanded ? "open" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="brand">
        <div className="logo">A</div>
        {expanded && <div className="brand-name">Advocate AI</div>}
      </div>
      <div className="rail-items">
        {items.map((it) => {
          const Icon = it.icon;
          const is = active === it.key;
          return (
            <button
              key={it.key}
              className={`rail-btn ${is ? "is" : ""}`}
              onClick={() => onChange?.(it.key)}
              aria-label={it.label}
            >
              <Icon size={18} />
              {expanded && <span>{it.label}</span>}
              {!expanded && <span className="tooltip">{it.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
