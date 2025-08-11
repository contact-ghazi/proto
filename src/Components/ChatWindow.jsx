import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { Phone, Video, MoreVertical, Paperclip, Smile, Send, ChevronDown } from "lucide-react";

const fakeLawyer = {
  id: "lawyer1",
  name: "Adv. Priya Sharma",
  type: "temporary",
  specialization: "Property & Civil",
  casesWon: 214,
  experienceYears: 8,
  rating: 4.8,
  lastSeen: "today at 2:17 PM",
  avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=7c3aed&color=fff&bold=true"
};

const initialMessages = [
  { sender: "lawyer", text: "Hello, how can I assist you today?", time: Date.now() - 1000 * 60 * 4 },
  { sender: "client", text: "I need help with a property dispute.", time: Date.now() - 1000 * 60 * 3 },
];

// WhatsApp-like subtle pattern (SVG data URI)
const CHAT_BG =
  "url('data:image/svg+xml;utf8,\
  <svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22>\
  <rect width=%2240%22 height=%2240%22 fill=%22%23000000%22 opacity=%220%22/>\
  <circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23ffffff10%22/>\
  <circle cx=%2222%22 cy=%2218%22 r=%221%22 fill=%22%23ffffff10%22/>\
  <circle cx=%2212%22 cy=%2230%22 r=%221%22 fill=%22%23ffffff10%22/>\
  </svg>')";

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatWindow() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [peerId, setPeerId] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [typing, setTyping] = useState(false);

  const listRef = useRef(null);

  // PeerJS setup
  useEffect(() => {
    const newPeer = new Peer();
    newPeer.on("open", (id) => {
      setPeerId(id);
      console.log("Generated Peer ID:", id);
    });
    return () => newPeer.destroy();
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "client", text, time: Date.now() }]);
    setInput("");

    // Simulate lawyer typing then reply
    setTyping(true);
    const replyTimeout = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "lawyer",
          text: "Thanks for sharing. I’ll guide you step by step.",
          time: Date.now(),
        },
      ]);
    }, 900);

    return () => clearTimeout(replyTimeout);
  };

  return (
    <div className="w-full bg-[#0b141a] text-white rounded-xl shadow-md overflow-hidden flex flex-col min-h-[560px] sm:min-h-[640px]">
      {/* Header (WhatsApp style) */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#202c33]">
        <div className="flex items-center gap-3">
          <img
            src={fakeLawyer.avatar}
            alt={fakeLawyer.name}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="leading-tight">
            <div className="font-semibold text-sm sm:text-base">{fakeLawyer.name}</div>
            <div className="text-[11px] sm:text-xs text-white/70">last seen {fakeLawyer.lastSeen}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button title="Voice call" className="p-2 rounded-full hover:bg-white/10">
            <Phone size={18} />
          </button>
          <button title="Video call" className="p-2 rounded-full hover:bg-white/10">
            <Video size={18} />
          </button>
          <button
            title="More"
            onClick={() => setShowInfo((v) => !v)}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Lawyer quick info (collapsible) */}
      {showInfo && (
        <div className="bg-[#111b21] px-4 py-3 text-sm border-b border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoItem label="Specialization" value={fakeLawyer.specialization} />
            <InfoItem label="Cases Won" value={fakeLawyer.casesWon} />
            <InfoItem label="Experience" value={`${fakeLawyer.experienceYears} yrs`} />
            <InfoItem label="Rating" value={`${fakeLawyer.rating}★`} />
          </div>

          {/* PeerJS share block */}
          {peerId && (
            <div className="mt-3 p-3 bg-[#0b141a] border border-white/10 rounded-lg">
              <div className="text-xs text-white/70 mb-1">Your Video Call ID</div>
              <div className="flex flex-wrap gap-2 items-center">
                <code className="bg-[#111b21] px-2 py-1 rounded font-mono">
                  {peerId}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(peerId)}
                  className="px-2 py-1 rounded bg-purple-600 hover:bg-purple-700 text-xs"
                >
                  Copy
                </button>
                <a
                  href={`http://localhost:5173/video-call?with=${peerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline text-xs"
                >
                  Open call link
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 overflow-y-auto px-2 sm:px-4 py-3"
        style={{
          backgroundImage: CHAT_BG,
          backgroundColor: "#0b141a",
        }}
      >
        {messages.map((msg, i) => {
          const isClient = msg.sender === "client";
          return (
            <div
              key={i}
              className={`mb-2 flex ${isClient ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[78%] sm:max-w-[70%] px-3 py-2 rounded-lg text-[13px] sm:text-[15px] leading-snug
                  ${isClient ? "bg-[#005c4b] text-white" : "bg-[#202c33] text-white/90"}`}
              >
                {msg.text}
                <span className="block text-[10px] text-white/60 mt-1 text-right">
                  {formatTime(msg.time)}
                </span>

                {/* Bubble tail */}
                <span
                  className={`absolute bottom-0 ${
                    isClient ? "right-[-3px] border-l-[#005c4b]" : "left-[-3px] border-r-[#202c33]"
                  } border-[6px] border-transparent translate-y-1`}
                />
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typing && (
          <div className="mb-2 flex justify-start">
            <div className="px-3 py-2 rounded-lg bg-[#202c33] text-white/80 text-[13px] sm:text-[15px]">
              {fakeLawyer.name.split(" ")[0]} is typing<span className="animate-pulse">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input area (WhatsApp style) */}
      <div className="bg-[#202c33] px-2 sm:px-3 py-2 flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-white/10" title="Attachment">
          <Paperclip size={18} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10" title="Emoji">
          <Smile size={18} />
        </button>

        <input
          type="text"
          className="flex-grow bg-[#2a3942] text-white placeholder-white/60 px-3 py-2 rounded-lg outline-none text-[13px] sm:text-[15px]"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-[#00a884] hover:bg-[#019371] transition text-white"
          title="Send"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Collapse chevron hint on small screens */}
      
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-lg bg-[#0b141a] border border-white/10 p-3">
      <div className="text-[11px] uppercase tracking-wide text-white/50">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}
