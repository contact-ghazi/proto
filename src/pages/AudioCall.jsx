import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Volume2, VolumeX, PhoneOff, Grid, UserPlus } from "lucide-react";
import "./Dashboard.css";

/* ---------- helpers ---------- */
function prettyName(raw) {
  const s = String(raw ?? "").trim();
  // If empty or just small digits, treat as unknown
  if (!s || /^[0-9]{1,6}$/.test(s) || s === "unknown_contact") return "Unknown contact";
  return s
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map(w => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export default function AudioCall() {
  const nav = useNavigate();
  const [params] = useSearchParams();

  // Use prettyName so "?with=4" won't show "4"
  const rawWith = params.get("with") || "Advocate";
  const who = prettyName(rawWith);
  const initial = who.charAt(0).toUpperCase() || "A";

  const [status, setStatus] = useState("Connecting…");
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [uiVisible, setUiVisible] = useState(true);

  const localStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const analyserRef = useRef(null);
  const meterRef = useRef(null);
  const hideTimer = useRef(null);

  // enter call mode + viewport fix
  useEffect(() => {
    const setVH = () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    setVH();
    window.addEventListener("resize", setVH);
    document.documentElement.classList.add("call-mode");
    document.body.style.overflow = "hidden";

    // CSS kill-switch: nuke any ::before counters in audio call scope
    const style = document.createElement("style");
    style.innerHTML = `
      .ac-portal, .ac-portal * { list-style: none !important; counter-reset: none !important; counter-increment: none !important; }
      .ac-portal *::before, .ac-portal *::after { content: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("resize", setVH);
      document.documentElement.classList.remove("call-mode");
      document.body.style.overflow = "";
      style.remove();
    };
  }, []);

  // mock connect + timer
  useEffect(() => {
    const t = setTimeout(() => setStatus("Connected"), 600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (status !== "Connected") return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);
  const fmt = (n) => `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;

  // local mic + analyser
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (!mounted) { stream.getTracks().forEach(t=>t.stop()); return; }
        localStreamRef.current = stream;

        if (remoteAudioRef.current) {
          remoteAudioRef.current.autoplay = true;
          remoteAudioRef.current.playsInline = true;
          remoteAudioRef.current.muted = !speakerOn;
        }

        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        src.connect(analyser);
        analyserRef.current = { analyser, ctx };

        const data = new Uint8Array(analyser.frequencyBinCount);
        const bars = Array.from(meterRef.current?.querySelectorAll(".ac-bar") || []);
        let raf = 0;
        const draw = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length / 2; i++) {
            const v = (data[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / (data.length / 2));
          const lvl = Math.min(1, Math.max(0, (rms - 0.02) * 6));
          bars.forEach((b, i) => {
            const f = lvl * (0.9 + 0.2 * Math.sin((performance.now()/300) + i));
            b.style.transform = `scaleY(${Math.max(0.12, f)})`;
            b.style.opacity = String(0.5 + 0.5 * f);
          });
          raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => {
          cancelAnimationFrame(raf);
          try { ctx.close(); } catch {}
        };
      } catch (err) {
        console.error("Mic error", err);
        setStatus("Mic blocked");
      }
    })();
    return () => {
      mounted = false;
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
        localStreamRef.current = null;
      }
    };
  }, [speakerOn]);

  // idle auto-hide
  const armHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 2200);
  };
  useEffect(() => { armHide(); return () => hideTimer.current && clearTimeout(hideTimer.current); }, []);
  const revealUI = () => { setUiVisible(true); armHide(); };

  // controls
  const toggleMic = () => {
    const tracks = localStreamRef.current?.getAudioTracks?.() || [];
    const next = !micOn;
    tracks.forEach(t => (t.enabled = next));
    setMicOn(next);
    revealUI();
  };
  const toggleSpeaker = () => {
    const next = !speakerOn;
    if (remoteAudioRef.current) remoteAudioRef.current.muted = !next;
    setSpeakerOn(next);
    revealUI();
  };
  const endCall = () => { nav(-1); };

  return (
    <section
      className={`ac-portal ${uiVisible ? "show-ui" : "hide-ui"}`}
      onPointerMove={revealUI}
      onClick={revealUI}
    >
      {/* background & haze */}
      <div className="ac-bg" />
      <div className="ac-haze" aria-hidden />

      {/* topbar */}
      <header className="ac-topbar" onPointerDown={(e)=>e.stopPropagation()}>
        <button className="ac-icon ghost" aria-label="Back" onClick={() => nav(-1)}>
          <ArrowLeft size={18} />
        </button>
        <div className="ac-peer">
          <div className="ac-name">{who}</div>
          <div className="ac-sub">{status === "Connected" ? fmt(seconds) : status}</div>
        </div>
        <div className="ac-spacer" />
      </header>

      {/* stage */}
      <main className="ac-stage">
        <div className="ac-avatar-wrap">
          <div className="ac-ring" />
          <div className="ac-avatar" aria-label={who}>{initial}</div>
        </div>

        {/* meter */}
        <div ref={meterRef} className="ac-meter" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => <span className="ac-bar" key={i} />)}
        </div>

        {/* hidden remote sink */}
        <audio ref={remoteAudioRef} className="ac-remote" />
      </main>

      {/* dock */}
      <footer className="ac-dock" role="toolbar" aria-label="Call controls" onPointerDown={(e)=>e.stopPropagation()}>
        <button className={`ac-fab ${micOn ? "" : "is-off"}`} onClick={toggleMic} aria-label="Mute/unmute">
          {micOn ? <Mic /> : <MicOff />}
        </button>
        <button className={`ac-fab ${speakerOn ? "" : "is-off"}`} onClick={toggleSpeaker} aria-label="Speaker">
          {speakerOn ? <Volume2 /> : <VolumeX />}
        </button>
        <button className="ac-fab" aria-label="Keypad (placeholder)">
          <Grid />
        </button>
        <button className="ac-fab" aria-label="Add participant (placeholder)">
          <UserPlus />
        </button>
        <button className="ac-fab end" onClick={endCall} aria-label="End call">
          <PhoneOff />
        </button>
      </footer>
    </section>
  );
}
