import React, { useState } from "react";

function Row({ label, desc, checked, onChange }) {
  return (
    <div className="setting-row">
      <div>
        <div className="setting-label">{label}</div>
        {desc && <div className="setting-desc">{desc}</div>}
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="slider" />
      </label>
    </div>
  );
}

export default function Settings() {
  const [notify, setNotify] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [autoAssign, setAutoAssign] = useState(false);

  return (
    <section className="container-xx">
      <h2 className="hero-title" style={{ marginBottom: 12 }}>Settings</h2>
      <div className="panel">
        <Row label="Enable notifications" desc="Chat & call alerts" checked={notify} onChange={setNotify} />
        <Row label="Play sounds" desc="Incoming calls and new messages" checked={sounds} onChange={setSounds} />
        <Row label="Auto-assign lawyer" desc="Skip manual selection next time" checked={autoAssign} onChange={setAutoAssign} />
      </div>
    </section>
  );
}
