import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft, Mic, MicOff, Volume2, VolumeX,
  PhoneOff, RefreshCw, Video, VideoOff, Camera, MoreVertical
} from "lucide-react";
import PeerVideoCall from "../Components/PeerVideoCall";
import "./Dashboard.css";

/**
 * ActiveCall.jsx (Video)
 * - Fullscreen video call like your AudioCall page style
 * - Idle auto-hide of chrome, transparent tap catcher (buttons don't hide UI)
 * - Local preview PiP (draggable), remote canvas full-screen
 * - Buttons: mic/cam/speaker/flip/end — all functional
 * - Remote audio element provided for speaker toggle
 * - Keeps PeerVideoCall mounted (hidden) for WebRTC plumbing
 */
export default function ActiveCall() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const who = params.get("with") || "Advocate";
  const [status, setStatus] = useState("Connecting…");
  const [seconds, setSeconds] = useState(0);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [facing, setFacing] = useState("user"); // "user" | "environment"
  const [uiVisible, setUiVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const stageRef = useRef(null);
  const pipRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteAudioRef = useRef(null); // attach your remote stream sink here if your peer layer provides it
  const createdLocalStream = useRef(null);
  const hideTimer = useRef(null);

  // Call mode + viewport unit for mobiles + block body scroll
  useEffect(() => {
    const setVH = () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    setVH();
    window.addEventListener("resize", setVH);
    document.documentElement.classList.add("call-mode");
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", setVH);
      document.documentElement.classList.remove("call-mode");
      document.body.style.overflow = "";
    };
  }, []);

  // Mock connect -> Connected + start timer (replace with your actual state)
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

  // Ensure local preview exists
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: true,
        });
        if (!mounted) { s.getTracks().forEach(t=>t.stop()); return; }
        localVideoRef.current.srcObject = s;
        createdLocalStream.current = s;
        // default speaker state
        if (remoteAudioRef.current) {
          remoteAudioRef.current.autoplay = true;
          remoteAudioRef.current.playsInline = true;
          remoteAudioRef.current.muted = !speakerOn;
        }
      } catch (e) {
        console.error("getUserMedia error:", e);
        setStatus("Camera/Mic blocked");
      }
    })();
    return () => {
      mounted = false;
      const s = createdLocalStream.current;
      if (s) { s.getTracks().forEach(t=>t.stop()); createdLocalStream.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing]);

  // Auto-hide chrome after idle
  const armHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setUiVisible(false), 2200);
  };
  useEffect(() => { armHide(); return () => hideTimer.current && clearTimeout(hideTimer.current); }, []);
  const revealUI = () => { setUiVisible(true); armHide(); };

  // Helpers
  const getLocal = () => {
    const v = localVideoRef.current;
    return v?.srcObject instanceof MediaStream ? v.srcObject : null;
  };
  const forEachTrack = (kind, fn) => {
    const s = getLocal();
    if (!s) return;
    s.getTracks().filter(t => t.kind === kind).forEach(fn);
  };

  // Controls (stop propagation to avoid tap-catcher)
  const onTap = (fn) => (e) => { e.preventDefault(); e.stopPropagation(); fn?.(); revealUI(); };

  const toggleMic = onTap(() => {
    forEachTrack("audio", t => (t.enabled = !t.enabled));
    setMicOn(v => !v);
  });

  const toggleCam = onTap(() => {
    forEachTrack("video", t => (t.enabled = !t.enabled));
    setCamOn(v => !v);
  });

  const flipCamera = onTap(async () => {
    try {
      const current = getLocal();
      const old = current?.getVideoTracks()[0];
      const nextFacing = facing === "user" ? "environment" : "user";
      const fresh = await navigator.mediaDevices.getUserMedia({ video: { facingMode: nextFacing }, audio: false });
      const newTrack = fresh.getVideoTracks()[0];
      if (current && newTrack) {
        if (old) { current.removeTrack(old); old.stop(); }
        current.addTrack(newTrack);
        localVideoRef.current.srcObject = current;
        // If you have RTCPeerConnection sender, call sender.replaceTrack(newTrack) here
      }
      fresh.getTracks().forEach(t => t.stop());
      setFacing(nextFacing);
    } catch (e) {
      console.error("flipCamera:", e);
    }
  });

  const toggleSpeaker = onTap(() => {
    const next = !speakerOn;
    if (remoteAudioRef.current) remoteAudioRef.current.muted = !next;
    setSpeakerOn(next);
  });

  const endCall = onTap(() => { nav(-1); });

  // Tap-catcher toggles UI only when tapping blank areas
  const onTapCatcher = () => setUiVisible(v => !v);

  // Draggable PiP
  useEffect(() => {
    const el = pipRef.current, stage = stageRef.current;
    if (!el || !stage) return;
    let sx=0, sy=0, ex=0, ey=0, grab=false;
    const down = (e) => { grab = true; el.setPointerCapture?.(e.pointerId); sx=e.clientX; sy=e.clientY; ex=el.offsetLeft; ey=el.offsetTop; e.stopPropagation(); };
    const move = (e) => {
      if (!grab) return;
      const dx=e.clientX-sx, dy=e.clientY-sy;
      const maxX = stage.clientWidth - el.clientWidth  - 8;
      const maxY = stage.clientHeight- el.clientHeight - 8;
      const nx = Math.max(8, Math.min(maxX, ex + dx));
      const ny = Math.max(8, Math.min(maxY, ey + dy));
      el.style.left = nx + "px"; el.style.top = ny + "px";
    };
    const up = (e) => { grab=false; el.releasePointerCapture?.(e.pointerId); };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup",   up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup",   up);
    };
  }, []);

  return (
    <section
      className={`call-portal ${uiVisible ? "show-ui" : "hide-ui"}`}
      onPointerMove={revealUI}
      onClick={revealUI}
    >
      {/* Stage */}
      <div ref={stageRef} className="call-stage-fixed">
        {/* Remote video canvas (draw from your peer layer if you render to canvas) */}
        <canvas id="remoteCanvas" className="call-canvas-fixed" />

        {/* Hidden remote audio for speaker toggle */}
        <audio ref={remoteAudioRef} className="peer-remote-audio" autoPlay playsInline />

        {/* Transparent tap layer (behind controls, above canvas) */}
        <div className="tap-catcher" onPointerDown={onTapCatcher} aria-hidden="true" />

        {/* Topbar */}
        <header className="call-topbar-fixed ui" onPointerDown={(e)=>e.stopPropagation()}>
          <button className="fab plain touch" aria-label="Back" onPointerDown={(e)=>{e.stopPropagation(); nav(-1);}}>
            <ArrowLeft size={18} />
          </button>
          <div className="call-peer-meta">
            <div className="call-name">{who}</div>
            <div className="call-sub">{status === "Connected" ? fmt(seconds) : status}</div>
          </div>
          <div className="call-spacer" />
          <button className={`fab plain touch ${micOn ? "" : "is-off"}`} onPointerDown={toggleMic} aria-label="Mute/unmute">
            {micOn ? <Mic/> : <MicOff/>}
          </button>
          <button className={`fab plain touch ${camOn ? "" : "is-off"}`} onPointerDown={toggleCam} aria-label="Camera on/off">
            {camOn ? <Video/> : <VideoOff/>}
          </button>
          <button className="fab plain touch" onPointerDown={flipCamera} aria-label="Flip camera">
            <RefreshCw/>
          </button>
          <button className={`fab plain touch ${speakerOn ? "" : "is-off"}`} onPointerDown={toggleSpeaker} aria-label="Speaker">
            {speakerOn ? <Volume2/> : <VolumeX/>}
          </button>

          <div className="more-wrap ui">
            <button className="fab plain touch" onPointerDown={(e)=>{e.stopPropagation(); setShowMenu(m=>!m);}} aria-label="More options">
              <MoreVertical />
            </button>
            {showMenu && (
              <div className="call-menu ui" onPointerDown={(e)=>e.stopPropagation()}>
                <button className="menu-btn" onPointerDown={flipCamera}><Camera size={16}/> Switch camera</button>
                <button className="menu-btn" onPointerDown={toggleSpeaker}>{speakerOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}{speakerOn ? " Speaker on" : " Speaker off"}</button>
                <button className="menu-btn" onPointerDown={()=>setShowMenu(false)}>✕ Close</button>
              </div>
            )}
          </div>
        </header>

        {/* Local PiP (draggable) */}
        <div
          ref={pipRef}
          className="call-pip ui"
          style={{ left: "auto", right: 12, top: "auto" }}
          onPointerDown={(e)=>e.stopPropagation()}
        >
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width:"100%", height:"100%", objectFit:"cover" }}
          />
        </div>

        {/* Bottom dock */}
        <footer className="call-dock-fixed ui" onPointerDown={(e)=>e.stopPropagation()}>
          <button className={`fab plain touch ${micOn ? "" : "is-off"}`} onPointerDown={toggleMic} aria-label="Mute/unmute">
            {micOn ? <Mic/> : <MicOff/>}
          </button>
          <button className={`fab plain touch ${camOn ? "" : "is-off"}`} onPointerDown={toggleCam} aria-label="Camera on/off">
            {camOn ? <Video/> : <VideoOff/>}
          </button>
          <button className="fab plain touch" onPointerDown={flipCamera} aria-label="Flip camera">
            <RefreshCw/>
          </button>
          <button className={`fab plain touch ${speakerOn ? "" : "is-off"}`} onPointerDown={toggleSpeaker} aria-label="Speaker">
            {speakerOn ? <Volume2/> : <VolumeX/>}
          </button>
          <button className="fab end touch" onPointerDown={endCall} aria-label="End call">
            <PhoneOff/>
          </button>
        </footer>

        {/* Keep peer engine mounted but invisible */}
        <div className="peer-hidden">
          <PeerVideoCall />
        </div>
      </div>
    </section>
  );
}
