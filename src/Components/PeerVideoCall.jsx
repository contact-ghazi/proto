import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const PeerVideoCall = () => {
  const [peerId, setPeerId] = useState("");
  const [connectedPeerId, setConnectedPeerId] = useState("");
  const [peer, setPeer] = useState(null);
  const [callStarted, setCallStarted] = useState(false);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("My Peer ID:", id);
    });

    newPeer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localVideoRef.current.srcObject = stream;
          call.answer(stream);
          setCallStarted(true);

          call.on("stream", (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
          });
        });
    });

    return () => {
      newPeer.destroy();
    };
  }, []);

  useEffect(() => {
    const urlId = new URLSearchParams(window.location.search).get("with");
    if (urlId) {
      setConnectedPeerId(urlId);
      console.log("Auto-filled peer ID from URL:", urlId);
    }
  }, []);

  const startCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        const call = peer.call(connectedPeerId, stream);
        setCallStarted(true);

        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
  };

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

          <button
            onClick={startCall}
            className={`w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition ${
              !connectedPeerId && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!connectedPeerId}
          >
            🎥 Start Call
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
              className="w-full rounded bg-black aspect-video"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <h4 className="text-sm font-medium mb-1">👥 Connected User</h4>
            <video
              ref={remoteVideoRef}
              autoPlay
              className="w-full rounded bg-black aspect-video sm:h-auto h-[280px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerVideoCall;
