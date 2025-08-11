// src/Components/AgoraVideoCall.jsx
import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// play track only when container is actually sized (mobile needs this)
function playWhenReady(track, el) {
  if (!track || !el) return;
  const ready = el.offsetWidth > 0 && el.offsetHeight > 0;
  if (ready) {
    try { track.play(el); } catch {}
  } else {
    requestAnimationFrame(() => {
      const ok = el.offsetWidth > 0 && el.offsetHeight > 0;
      try { (ok ? track.play(el) : null); } catch {}
      if (!ok) setTimeout(() => { try { track.play(el); } catch {} }, 150);
    });
  }
}

export default function AgoraVideoCall({
  appId,
  channel = "advocate-room",
  token = null,
  onEnd,
}) {
  const localRef = useRef(null);
  const tracksRef = useRef({ cam: null, mic: null });

  const [inCall, setInCall] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [remoteUsers, setRemoteUsers] = useState([]); // [{ uid, ref }]
  const remoteMapRef = useRef(new Map()); // uid -> { ref, videoTrack?, audioTrack? }

  // Join/Leave
  useEffect(() => {
    if (!inCall) return;

    let mounted = true;

    (async () => {
      await client.join(appId, channel, token || null, null);

      const mic = await AgoraRTC.createMicrophoneAudioTrack();
      const cam = await AgoraRTC.createCameraVideoTrack();
      tracksRef.current = { mic, cam };

      // Local preview + publish
      playWhenReady(cam, localRef.current);
      await client.publish([mic, cam]);

      // Remote events
      const onPublished = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        attachRemote(user);
      };
      const onUnpublished = (user) => {
        const entry = remoteMapRef.current.get(user.uid);
        entry?.videoTrack?.stop();
        if (entry) entry.videoTrack = null; // keep tile
      };
      const onLeft = (user) => detachRemote(user.uid);
      const onInfo = (uid) => {
        const u = client.remoteUsers.find((x) => x.uid === uid);
        if (!u) return;
        if (u.videoTrack) {
          const entry = remoteMapRef.current.get(uid) || { ref: React.createRef() };
          entry.videoTrack = u.videoTrack;
          remoteMapRef.current.set(uid, entry);
          setRemoteUsers([...remoteMapRef.current.entries()].map(([id, v]) => ({ uid: id, ref: v.ref })));
          setTimeout(() => playWhenReady(entry.videoTrack, entry.ref.current), 0);
        }
      };

      client.on("user-published", onPublished);
      client.on("user-unpublished", onUnpublished);
      client.on("user-left", onLeft);
      client.on("user-info-updated", onInfo);

      // Re-play on orientation/resize (mobile rotates)
      const onResize = () => {
        const { cam } = tracksRef.current;
        cam && playWhenReady(cam, localRef.current);
        remoteMapRef.current.forEach(({ videoTrack, ref }) => {
          if (videoTrack && ref?.current) playWhenReady(videoTrack, ref.current);
        });
      };
      window.addEventListener("orientationchange", onResize);
      window.addEventListener("resize", onResize);

      // cleanup listeners on unmount
      return () => {
        if (!mounted) return;
        window.removeEventListener("orientationchange", onResize);
        window.removeEventListener("resize", onResize);
        client.off("user-published", onPublished);
        client.off("user-unpublished", onUnpublished);
        client.off("user-left", onLeft);
        client.off("user-info-updated", onInfo);
      };
    })();

    return () => { mounted = false; cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCall, appId, channel, token]);

  const cleanup = async () => {
    try {
      const { cam, mic } = tracksRef.current;
      cam?.stop(); cam?.close();
      mic?.stop(); mic?.close();
      await client.leave();
      remoteMapRef.current.forEach(({ videoTrack }) => videoTrack?.stop());
      remoteMapRef.current.clear();
      setRemoteUsers([]);
    } catch {}
  };

  // Remote helpers
  const attachRemote = (user) => {
    const entry = remoteMapRef.current.get(user.uid) || { ref: React.createRef() };
    if (user.videoTrack) entry.videoTrack = user.videoTrack;
    if (user.audioTrack) { entry.audioTrack = user.audioTrack; entry.audioTrack.play(); }
    remoteMapRef.current.set(user.uid, entry);
    setRemoteUsers([...remoteMapRef.current.entries()].map(([uid, v]) => ({ uid, ref: v.ref })));
    setTimeout(() => playWhenReady(entry.videoTrack, entry.ref.current), 0);
  };

  const detachRemote = (uid) => {
    const entry = remoteMapRef.current.get(uid);
    entry?.videoTrack?.stop();
    entry?.audioTrack?.stop();
    remoteMapRef.current.delete(uid);
    setRemoteUsers([...remoteMapRef.current.entries()].map(([id, v]) => ({ uid: id, ref: v.ref })));
  };

  // Controls
  const toggleCam = async () => {
    const { cam } = tracksRef.current;
    if (!cam) return;
    if (camOn) {
      await cam.setEnabled(false);
    } else {
      await cam.setEnabled(true);
      playWhenReady(cam, localRef.current); // ensure it re-renders
    }
    setCamOn((v) => !v);
  };

  const toggleMic = async () => {
    const { mic } = tracksRef.current;
    if (!mic) return;
    await mic.setEnabled(!micOn);
    setMicOn((v) => !v);
  };

  const endCall = async () => {
    await cleanup();
    setInCall(false);
    onEnd?.();
  };

  // Columns: 1 on mobile to avoid face cuts, up to 2 on larger screens
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  const cols = isMobile ? 1 : Math.min(remoteUsers.length + 1, 2);

  return (
    <div className="w-full h-[65vh] min-h-[360px] flex flex-col">
      {/* Video area */}
      <div
        className="flex-1 grid agora-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gap: isMobile ? 8 : 12,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Local */}
        <div ref={localRef} className="agora-tile rounded-xl bg-black overflow-hidden" />

        {/* Remotes */}
        {remoteUsers.map(({ uid, ref }) => (
          <div key={uid} ref={ref} className="agora-tile rounded-xl bg-black overflow-hidden" />
        ))}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          onClick={toggleCam}
          className={`px-4 py-2 rounded-full shadow ${camOn ? "bg-purple-600" : "bg-gray-700"}`}
          title={camOn ? "Turn camera off" : "Turn camera on"}
        >
          {camOn ? <Video size={18} /> : <VideoOff size={18} />}
        </button>

        <button
          onClick={toggleMic}
          className={`px-4 py-2 rounded-full shadow ${micOn ? "bg-purple-600" : "bg-gray-700"}`}
          title={micOn ? "Mute mic" : "Unmute mic"}
        >
          {micOn ? <Mic size={18} /> : <MicOff size={18} />}
        </button>

        <button
          onClick={endCall}
          className="px-4 py-2 rounded-full shadow bg-red-600 hover:bg-red-700"
          title="End call"
        >
          <PhoneOff size={18} />
        </button>
      </div>
    </div>
  );
}
