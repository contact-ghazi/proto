// src/Components/FilterMenu.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Filter, ChevronDown, X } from "lucide-react";

const OPTIONS = {
  type: ["Property", "Criminal", "Family", "Corporate", "Documentation"],
  rating: ["4.5", "4.0", "3.5"],
  price: ["₹ 1000", "₹ 2000", "₹ 3000"],
  exp: ["0–3 yrs", "4–7 yrs", "8–12 yrs", "12+ yrs"],
  gender: ["Male", "Female", "Other"],
};

export default function FilterMenu({ onChange, initial = {} }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState({
    type: initial.type ?? "",
    rating: initial.rating ?? "",
    location: initial.location ?? "",
    price: initial.price ?? "",
    exp: initial.exp ?? "",
    gender: initial.gender ?? "",
  });

  const anchorRef = useRef(null);
  const [pos, setPos] = useState({ left: 0, top: 0, width: 360, mobile: false });

  // Recompute placement
  const computePos = () => {
    const mobile = window.innerWidth < 720;
    if (mobile) {
      setPos((p) => ({ ...p, mobile: true }));
      return;
    }
    const r = anchorRef.current?.getBoundingClientRect();
    if (!r) return;
    const maxW = Math.min(520, window.innerWidth - 32);
    const left = Math.max(16, Math.min(r.left, window.innerWidth - maxW - 16));
    setPos({ left, top: r.bottom + 8, width: maxW, mobile: false });
  };

  useLayoutEffect(() => { computePos(); }, []);
  useEffect(() => {
    if (!open) return;
    const onResize = () => computePos();
    const onScroll = () => computePos();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    // lock page scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const apply = () => { onChange?.(sel); setOpen(false); };
  const reset = () => {
    const next = { type: "", rating: "", location: "", price: "", exp: "", gender: "" };
    setSel(next);
    onChange?.(next);
    setOpen(false);
  };

  // ---------- styles ----------
  const btn = {
    display: "inline-flex", alignItems: "center", gap: 8,
    height: 40, padding: "0 14px", borderRadius: 12, cursor: "pointer",
    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)",
    color: "#f4f3ff", fontWeight: 700, letterSpacing: ".2px", userSelect: "none"
  };

  const POP_Z = 4000;
  const popBase = {
    zIndex: POP_Z,
    background: "#11131a",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: 16,
    boxShadow: "0 18px 48px rgba(0,0,0,.45)",
    padding: 12,
    color: "#eef0ff",
  };
  // desktop: anchored dropdown (unchanged)
  const popDesktop = {
    position: "fixed", left: pos.left, top: pos.top, width: pos.width
  };
  // mobile: **center screen** (both axes), scrollable content
  const popCenter = {
    position: "fixed",
    left: "50%", top: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(560px, calc(100vw - 24px))",
    maxHeight: "min(720px, calc(100svh - 48px))", // safe breathing room
    overflow: "auto",
    borderRadius: 18,
  };
  const backdrop = {
    position: "fixed", inset: 0, background: "rgba(8,8,12,.45)",
    backdropFilter: "blur(2px)", zIndex: POP_Z - 1
  };
  const label = { fontSize: 12, color: "#cfcfe2", marginBottom: 6 };
  const input = {
    height: 40, padding: "0 10px", borderRadius: 10, outline: "none",
    background: "#1b1f27", color: "#eef0ff", border: "1px solid rgba(255,255,255,.10)",
    width: "100%"
  };
  const row = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const row1 = { display: "grid", gridTemplateColumns: "1fr", gap: 12 };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div ref={anchorRef}>
        <button
          type="button"
          style={btn}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <Filter size={16} />
          <span>Filter</span>
          <ChevronDown size={16} style={{ opacity: 0.9 }} />
        </button>
      </div>

      {open && (
        <>
          <div style={backdrop} onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-label="Filter Lawyers"
            style={{ ...popBase, ...(pos.mobile ? popCenter : popDesktop) }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "2px 2px 10px", borderBottom: "1px solid rgba(255,255,255,.06)",
                position: "sticky", top: 0, background: "#11131a", zIndex: 2
              }}
            >
              <strong>Filter Lawyers</strong>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  display: "grid", placeItems: "center",
                  width: 32, height: 32, borderRadius: 8,
                  background: "transparent", color: "#e8e8f3",
                  border: "1px solid rgba(255,255,255,.10)", cursor: "pointer",
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Grid */}
            <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
              <div style={row}>
                <div>
                  <div style={label}>Type</div>
                  <select
                    value={sel.type}
                    onChange={(e) => setSel((s) => ({ ...s, type: e.target.value }))}
                    style={input}
                  >
                    <option value="">Any</option>
                    {OPTIONS.type.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={label}>Rating</div>
                  <select
                    value={sel.rating}
                    onChange={(e) => setSel((s) => ({ ...s, rating: e.target.value }))}
                    style={input}
                  >
                    <option value="">Any</option>
                    {OPTIONS.rating.map((o) => (
                      <option key={o} value={o}>{o}+</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={row1}>
                <div>
                  <div style={label}>Location</div>
                  <input
                    value={sel.location}
                    onChange={(e) => setSel((s) => ({ ...s, location: e.target.value }))}
                    placeholder="City or pincode"
                    style={input}
                  />
                </div>
              </div>

              <div style={row}>
                <div>
                  <div style={label}>Price</div>
                  <select
                    value={sel.price}
                    onChange={(e) => setSel((s) => ({ ...s, price: e.target.value }))}
                    style={input}
                  >
                    <option value="">Any</option>
                    {OPTIONS.price.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={label}>Experience</div>
                  <select
                    value={sel.exp}
                    onChange={(e) => setSel((s) => ({ ...s, exp: e.target.value }))}
                    style={input}
                  >
                    <option value="">Any</option>
                    {OPTIONS.exp.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={row1}>
                <div>
                  <div style={label}>Gender</div>
                  <select
                    value={sel.gender}
                    onChange={(e) => setSel((s) => ({ ...s, gender: e.target.value }))}
                    style={input}
                  >
                    <option value="">Any</option>
                    {OPTIONS.gender.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12,
                position: "sticky", bottom: 0, background: "#11131a", paddingTop: 8
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  height: 40, padding: "0 14px", borderRadius: 12, cursor: "pointer",
                  background: "rgba(255,255,255,.06)", color: "#fff",
                  border: "1px solid rgba(255,255,255,.12)", fontWeight: 700,
                }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={apply}
                style={{
                  height: 40, padding: "0 14px", borderRadius: 12, cursor: "pointer",
                  background: "linear-gradient(45deg,#7c3aed,#a855f7)", color: "#fff",
                  border: "1px solid rgba(168,85,247,.55)", fontWeight: 700,
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
