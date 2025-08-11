// src/Components/ImmediateConsult2.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- lightweight city map for nearest-match ---------- */
const CITY_COORDS = [
  { city: "Mumbai",     lat: 19.0760, lng: 72.8777 },
  { city: "Delhi",      lat: 28.6139, lng: 77.2090 },
  { city: "Bengaluru",  lat: 12.9716, lng: 77.5946 },
  { city: "Hyderabad",  lat: 17.3850, lng: 78.4867 },
  { city: "Chennai",    lat: 13.0827, lng: 80.2707 },
  { city: "Kolkata",    lat: 22.5726, lng: 88.3639 },
  { city: "Pune",       lat: 18.5204, lng: 73.8567 },
  { city: "Jaipur",     lat: 26.9124, lng: 75.7873 },
];

function nearestCity(lat, lng) {
  let best = CITY_COORDS[0], bestD = Infinity;
  for (const c of CITY_COORDS) {
    const d = (lat - c.lat) ** 2 + (lng - c.lng) ** 2;
    if (d < bestD) { bestD = d; best = c; }
  }
  return best.city;
}

/* ---------- cookie & storage helpers ---------- */
function getCookies() {
  return document.cookie
    .split(";")
    .map(x => x.trim())
    .filter(Boolean)
    .reduce((acc, cur) => {
      const i = cur.indexOf("=");
      const k = i >= 0 ? cur.slice(0, i) : cur;
      const v = i >= 0 ? decodeURIComponent(cur.slice(i + 1)) : "";
      acc[k] = v;
      return acc;
    }, {});
}

function readStoredUser() {
  // 1) localStorage (primary)
  let ls = {};
  try { ls = JSON.parse(localStorage.getItem("advai:user") || "{}"); } catch {}
  // 2) cookies as hints
  const ck = getCookies();
  const hints = {
    name: ck.name || ck.fullname || ck.user_name || "",
    age: ck.age || "",
    gender: ck.gender || "",
    phone: ck.phone || ck.mobile || "",
    location: ck.city || ck.location || "",
  };
  return { ...hints, ...ls };
}

function saveStoredUser(data) {
  const prev = readStoredUser();
  const merged = { ...prev, ...data };
  localStorage.setItem("advai:user", JSON.stringify(merged));
  // Optional helper cookies (30 days)
  const exp = new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString();
  document.cookie = `name=${encodeURIComponent(merged.name || "")}; expires=${exp}; path=/`;
  document.cookie = `phone=${encodeURIComponent(merged.phone || "")}; expires=${exp}; path=/`;
  document.cookie = `city=${encodeURIComponent(merged.location || "")}; expires=${exp}; path=/`;
  return merged;
}

/* ---------- tiny form for missing fields only ---------- */
function QuickIntakeModal({ open, onClose, initial, onDone }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    age: initial?.age || "",
    gender: initial?.gender || "",
    phone: initial?.phone || "",
    location: initial?.location || "",
  });
  const [tryingGeo, setTryingGeo] = useState(false);

  useEffect(() => {
    // Try geolocation only if location is missing
    if (!open || form.location || !("geolocation" in navigator)) return;
    setTryingGeo(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const city = nearestCity(latitude, longitude);
        setForm((f) => ({ ...f, location: city }));
        setTryingGeo(false);
      },
      () => setTryingGeo(false),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [open, form.location]);

  if (!open) return null;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      age: String(form.age || "").trim(),
      gender: form.gender.trim(),
      phone: String(form.phone || "").trim(),
      location: form.location.trim(),
    };
    if (!payload.name || !payload.phone || !payload.location) {
      alert("Please fill Name, Phone and Location.");
      return;
    }
    onDone(payload);
  };

  const show = (k) => !initial?.[k];

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0b141a] text-white border border-white/10 shadow-2xl overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-600 to-purple-800" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">Quick details</h3>
          <p className="text-sm text-white/70 mb-4">
            We’ll use these once, save to your device, and auto‑connect next time.
          </p>

          <form onSubmit={submit} className="space-y-3">
            {show("name") && (
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input
                  name="name" value={form.name} onChange={onChange}
                  className="mt-1 w-full bg-[#2a3942] rounded px-3 py-2 outline-none"
                  placeholder="Your full name"
                />
              </div>
            )}
            {show("age") && (
              <div>
                <label className="text-sm text-white/70">Age</label>
                <input
                  name="age" type="number" min="1" value={form.age} onChange={onChange}
                  className="mt-1 w-full bg-[#2a3942] rounded px-3 py-2 outline-none"
                  placeholder="e.g., 28"
                />
              </div>
            )}
            {show("gender") && (
              <div>
                <label className="text-sm text-white/70">Gender</label>
                <select
                  name="gender" value={form.gender} onChange={onChange}
                  className="mt-1 w-full bg-[#2a3942] rounded px-3 py-2 outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non‑binary</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            )}
            {show("phone") && (
              <div>
                <label className="text-sm text-white/70">Phone</label>
                <input
                  name="phone" value={form.phone} onChange={onChange}
                  className="mt-1 w-full bg-[#2a3942] rounded px-3 py-2 outline-none"
                  placeholder="10‑digit mobile"
                />
              </div>
            )}
            {show("location") && (
              <div>
                <label className="text-sm text-white/70 flex items-center gap-2">
                  Location (City) {tryingGeo && <span className="text-xs text-white/50">detecting…</span>}
                </label>
                <input
                  name="location" value={form.location} onChange={onChange}
                  className="mt-1 w-full bg-[#2a3942] rounded px-3 py-2 outline-none"
                  placeholder="Mumbai / Delhi / …" list="advai-city-datalist"
                />
                <datalist id="advai-city-datalist">
                  {CITY_COORDS.map((c) => <option key={c.city} value={c.city} />)}
                </datalist>
              </div>
            )}

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 rounded px-4 py-2 font-semibold">
              Continue
            </button>
            <button type="button" onClick={onClose} className="w-full bg-white/10 hover:bg-white/15 rounded px-4 py-2">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- main ImmediateConsult2 ---------- */
export default function ImmediateConsult2() {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [initialData, setInitialData] = useState(readStoredUser());
  const [loading, setLoading] = useState(false);

  const required = ["name", "age", "gender", "phone", "location"];
  const hasAll = required.every((k) => String(initialData?.[k] || "").trim());

  const goVideo = (city) => {
    navigate(`/video-call?match=auto&city=${encodeURIComponent(city)}&via=immediate2`);
  };

  const onClickImmediate = () => {
    if (hasAll) {
      setLoading(true);
      setTimeout(() => goVideo(initialData.location), 150);
    } else {
      setOpenForm(true);
    }
  };

  const onFormDone = (data) => {
    const merged = saveStoredUser(data);
    setInitialData(merged);
    setOpenForm(false);
    setLoading(true);
    setTimeout(() => goVideo(merged.location), 150);
  };

  return (
    <div
      id="immediate-consult-2"
      className="flex flex-col items-center justify-center text-center py-32 min-h-[60vh] -mt-10 bg-gradient-to-r from-purple-700 via-purple-900 to-black text-white"
    >
      <h2 className="text-4xl font-bold mb-6">Immediate Consult (Auto)</h2>
      <p className="text-lg max-w-2xl mb-8">
        One click to connect with the nearest available lawyer. We’ll auto‑fill from your device.
      </p>

      <button
        onClick={onClickImmediate}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        {loading ? "Connecting to a nearby lawyer…" : "🚀 Immediate Consult"}
      </button>

      <QuickIntakeModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        initial={initialData}
        onDone={onFormDone}
      />
    </div>
  );
}
