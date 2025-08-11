import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";

const PeerVideoCall = () => {
  const navigate = useNavigate(); // ✅ for redirect to home

  const [peerId, setPeerId] = useState("");
  const [connectedPeerId, setConnectedPeerId] = useState("");
  const [peer, setPeer] = useState(null);
  const [callStarted, setCallStarted] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Keep handles to active call & local stream so we can control/mute
  const callRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("My Peer ID:", id);
    });

    // Answer incoming calls
    newPeer.on("call", async (incoming) => {
      try {
        const stream = await ensureLocalStream();
        incoming.answer(stream);
        wireCall(incoming);
      } catch (e) {
        console.error("Failed to answer:", e);
      }
    });

    newPeer.on("error", (err) => console.error("Peer error:", err));

    return () => {
      // 🔒 Cleanup on unmount WITHOUT redirect
      endCall({ destroyPeer: true, redirect: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autofill ?with=<peerId>
  useEffect(() => {
    const urlId = new URLSearchParams(window.location.search).get("with");
    if (urlId) {
      setConnectedPeerId(urlId);
      console.log("Auto-filled peer ID from URL:", urlId);
    }
  }, []);

  // --- Helpers ---
  const ensureLocalStream = async () => {
    if (localStreamRef.current) return localStreamRef.current;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;

    // Apply current toggle state to fresh tracks
    stream.getVideoTracks().forEach((t) => (t.enabled = camOn));
    stream.getAudioTracks().forEach((t) => (t.enabled = micOn));

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
      await localVideoRef.current.play().catch(() => {});
    }
    return stream;
  };

  const wireCall = (call) => {
    // Close any existing call
    if (callRef.current && callRef.current !== call) {
      try { callRef.current.close(); } catch {}
    }
    callRef.current = call;

    call.on("stream", async (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
        await remoteVideoRef.current.play().catch(() => {});
      }
      setCallStarted(true);
    });

    call.on("close", () => {
      setCallStarted(false);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    });

    call.on("error", (e) => console.error("Call error:", e));
  };

  // --- Actions ---
  const startCall = async () => {
    if (!peer) return;
    if (!connectedPeerId) return alert("Enter the other user's Peer ID");

    try {
      const stream = await ensureLocalStream();
      const call = peer.call(connectedPeerId, stream);
      if (!call) throw new Error("Unable to initiate call.");
      wireCall(call);
    } catch (e) {
      console.error(e);
      alert("Could not start the call. Check camera/mic permissions and the ID.");
    }
  };

  const endCall = ({ destroyPeer = false, redirect = false } = {}) => {
    try { callRef.current?.close(); } catch {}
    callRef.current = null;

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setCallStarted(false);

    if (destroyPeer && peer) {
      try { peer.destroy(); } catch {}
      setPeer(null);
      setPeerId("");
    }

    // ✅ Redirect only when explicitly requested (button press)
    if (redirect) {
      navigate("/");
    }
  };

  const toggleCam = async () => {
    // Ensure we have a stream if user toggles before starting call
    if (!localStreamRef.current) await ensureLocalStream();
    const tracks = localStreamRef.current?.getVideoTracks?.() || [];
    const next = !camOn;
    tracks.forEach((t) => (t.enabled = next));
    setCamOn(next);
  };

  const toggleMic = async () => {
    if (!localStreamRef.current) await ensureLocalStream();
    const tracks = localStreamRef.current?.getAudioTracks?.() || [];
    const next = !micOn;
    tracks.forEach((t) => (t.enabled = next));
    setMicOn(next);
  };

  // --- UI ---
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-purple-900 to-black flex items-center justify-center px-4 py-10">
      <div className="p-6 bg-white/70 backdrop-blur-md border border-purple-300 rounded-2xl shadow-2xl max-w-4xl w-full text-black">
        {/* Accent bar */}
        <div className="h-2 rounded-t-xl bg-gradient-to-r from-purple-500 via-fuchsia-600 to-purple-800 mb-4"></div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-center">📞 Secure Video Call</h2>

        {/* Peer ID + Connect */}
        <div className="mb-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-gray-800">
              📡 <strong>Your Peer ID:</strong>
              <code className="bg-white text-purple-900 px-2 py-1 rounded border ml-2 inline-block break-all">
                {peerId || "Loading..."}
              </code>
            </span>
            {peerId && (
              <button
                onClick={() => navigator.clipboard.writeText(peerId)}
                className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-800"
              >
                Copy
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter the other user's Peer ID"
            className="bg-gray-100 text-black px-4 py-2 rounded w-full border border-gray-300 focus:outline-purple-600 mb-3"
            value={connectedPeerId}
            onChange={(e) => setConnectedPeerId(e.target.value)}
          />

          {/* Start / End */}
          {!callStarted ? (
            <button
              onClick={startCall}
              className={`w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
                !connectedPeerId && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!connectedPeerId}
            >
              🎥 Start Call
            </button>
          ) : (
            <button
              onClick={() => endCall({ redirect: true })} // ✅ redirect to home
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🔚 End Call
            </button>
          )}
        </div>

        {/* Controls: Mic / Cam */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={toggleMic}
            className={`px-4 py-2 rounded ${micOn ? "bg-gray-900 text-white" : "bg-gray-300 text-gray-900"}`}
            title={micOn ? "Mute microphone" : "Unmute microphone"}
          >
            {micOn ? "🎙️ Mic On" : "🔇 Mic Off"}
          </button>

          <button
            onClick={toggleCam}
            className={`px-4 py-2 rounded ${camOn ? "bg-gray-900 text-white" : "bg-gray-300 text-gray-900"}`}
            title={camOn ? "Turn camera off" : "Turn camera on"}
          >
            {camOn ? "📹 Video On" : "⏸️ Video Off"}
          </button>
        </div>

        {/* Video Streams */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2">
            <h4 className="text-sm font-medium mb-1">👤 You</h4>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded bg-black aspect-video"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <h4 className="text-sm font-medium mb-1">👥 Connected User</h4>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full rounded bg-black aspect-video sm:h-auto h-[280px]"
            />
          </div>
        </div>

        <div className="text-xs text-gray-700 mt-4">
          Tip: You can toggle mic/video anytime—even before starting—to pre‑configure your privacy.
        </div>
      </div>
    </div>
  );
};

export default PeerVideoCall;
