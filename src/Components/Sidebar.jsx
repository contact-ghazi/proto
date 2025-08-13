import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Search, MessageSquare, Phone, FileText, Settings, Home,
  ChevronLeft, ChevronRight
} from "lucide-react";
import "./Sidebar.css";

const NAV = [
  { to: "/dashboard/lawyers", label: "Find Lawyers", icon: <Search size={18} /> },
  { to: "/dashboard/assigned", label: "Assigned",     icon: <Home size={18} /> },
  { to: "/dashboard/chat",     label: "Messages",     icon: <MessageSquare size={18} /> },
  { to: "/dashboard/call",     label: "Calls",        icon: <Phone size={18} /> },
  { to: "/dashboard/docs",     label: "Documents",    icon: <FileText size={18} /> },
  { to: "/dashboard/settings", label: "Settings",     icon: <Settings size={18} /> },
];

const DESK_OPEN = 220;  // full rail width (constant)
const DESK_COLL = 72;   // visible when collapsed

export default function Sidebar() {
  const { pathname } = useLocation();

  const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;
  const [desktop, setDesktop] = useState(isDesktop());
  const [open, setOpen] = useState(isDesktop()); // desktop starts open, mobile closed
  const hoverT = useRef(null);

  // Apply visible width to CSS vars so .shell padding matches
  const applyVisible = (visible) => {
    document.documentElement.style.setProperty("--rail-w", `${visible}px`);
  };

  // Visible width depends on device & state
  const visibleWidth = desktop ? (open ? DESK_OPEN : DESK_COLL) : (open ? DESK_OPEN : 0);

  useEffect(() => {
    applyVisible(visibleWidth);
  }, [visibleWidth]);

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      const d = isDesktop();
      setDesktop(d);
      // desktop defaults open; mobile defaults closed
      setOpen(d ? true : false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Hover expand/collapse (desktop only) — tiny delay prevents jitter
  const onEnter = () => {
    if (!desktop || open) return;
    clearTimeout(hoverT.current);
    hoverT.current = setTimeout(() => setOpen(true), 80);
  };
  const onLeave = () => {
    if (!desktop || !open) return;
    clearTimeout(hoverT.current);
    hoverT.current = setTimeout(() => setOpen(false), 80);
  };

  // Mobile backdrop
  const closeMobile = () => { if (!desktop) setOpen(false); };

  return (
    <>
      {/* Compact hamburger (optional, show only on mobile) */}
      <button
        className="rail-burger"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <span />
      </button>

      {/* Backdrop for mobile sheet */}
      {!desktop && open && <div className="rail-backdrop" onClick={closeMobile} />}

      <aside
        className={`nav-rail ${open ? "is-open" : "is-collapsed"} ${desktop ? "mode-desktop" : "mode-mobile"}`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        // GPU transform based reveal: rail is always 220px wide;
        // we slide either 0, -148px, or -220px offscreen.
        style={{ ["--rail-visible"]: `${visibleWidth}px` }}
      >
        <div className="rail-haze" aria-hidden />

        <div className="rail-head">
          <div className="rail-avatar">A</div>
          <div className="rail-brand">Advocate AI</div>
          <button
            className="rail-toggle"
            aria-label={open ? "Collapse" : "Expand"}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <nav className="rail-nav">
          {NAV.map(it => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                "rail-item" + ((isActive || pathname.startsWith(it.to)) ? " active" : "")
              }
            >
              <span className="ico">{it.icon}</span>
              <span className="txt">{it.label}</span>
              <span className="tip">{it.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="rail-foot">
          <a className="rail-mini" href="mailto:support@example.com">Support</a>
          <span className="rail-mini sep">•</span>
          <span className="rail-mini">v1.0</span>
        </div>
      </aside>
    </>
  );
}
