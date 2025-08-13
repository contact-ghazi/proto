import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, Phone, Video, MoreVertical, Search as SearchIcon,
  Paperclip, Send, ShieldCheck, Pin, CheckCheck
} from "lucide-react";
import History from "../utils/historyStore";
import "./Dashboard.css";

/* ------- mobile breakpoint hook ------- */
function useIsMobile(query = "(max-width: 820px)") {
  const [m, setM] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = (e) => setM(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [query]);
  return m;
}

/* ------- demo roster (IDs must match your /lawyer/:id etc.) ------- */
const SEED = [
  {
    id: "adv_priya",
    name: "Adv. Priya Sharma",
    subtitle: "online • replies fast",
    avatar: "/assets/placeholder-avatar.png",
    pinned: true,
    last: "Please share the agreement PDF.",
    unread: 0,
    seedMessages: [
      { id: 1, from: "them", text: "Hello! How can I help today?", at: "10:05" },
      { id: 2, from: "me", text: "Need advice on a property dispute.", at: "10:06" },
    ],
  },
  {
    id: "adv_rohan",
    name: "Adv. Rohan Mehta",
    subtitle: "last seen 2m ago",
    avatar: "/assets/placeholder-avatar.png",
    last: "Got it, thanks!",
    unread: 0,
    seedMessages: [{ id: 1, from: "them", text: "Sending draft shortly.", at: "09:11" }],
  },
  {
    id: "adv_kavya",
    name: "Adv. Kavya Iyer",
    subtitle: "online",
    avatar: "/assets/placeholder-avatar.png",
    last: "We can do a call at 6?",
    unread: 0,
    seedMessages: [],
  },
];

export default function Messages() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("with") || "";

  // react to history changes globally
  const [, force] = useState(0);
  useEffect(() => History.subscribe(() => force(x => x + 1)), []);

  const [q, setQ] = useState("");

  // derive chat roster w/ previews from history
  const conversations = useMemo(() => {
    return SEED.map((c) => {
      const hist = History.getMessages(c.id);
      const last = hist.length ? hist[hist.length - 1].text : c.last;
      return { ...c, last };
    }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [q, force]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    if (!q) return conversations;
    const t = q.toLowerCase();
    return conversations.filter(c => c.name.toLowerCase().includes(t) || c.last?.toLowerCase().includes(t));
  }, [q, conversations]);

  const selectedSeed = useMemo(() => SEED.find(c => c.id === (selectedId || (isMobile ? "" : SEED[0].id))), [selectedId]);
  const selected = selectedSeed;
  const showListOnlyMobile = isMobile && !selectedId;
  const showThreadOnlyMobile = isMobile && !!selectedId;

  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    });
  }, [selected?.id, force]); // scroll to last on history change

  const openChat = (id) => {
    if (isMobile) navigate(`/dashboard/chat?with=${encodeURIComponent(id)}`);
    else navigate(`/dashboard/chat?with=${encodeURIComponent(id)}`, { replace: true });
  };
  const goBackToList = () => navigate("/dashboard/chat", { replace: true });

  // merged visible messages: seed + persisted
  const visibleMessages = useMemo(() => {
    if (!selected) return [];
    const hist = History.getMessages(selected.id).map(m => {
      // render time as small hh:mm for persisted msgs
      try {
        const d = new Date(m.at);
        return { ...m, at: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      } catch { return m; }
    });
    return [...(selected.seedMessages || []), ...hist];
  }, [selected?.id, force]); // eslint-disable-line react-hooks/exhaustive-deps

  // send text
  const send = () => {
    if (!selected) return;
    const t = draft.trim();
    if (!t) return;
    // persist first (UI will update via subscription)
    History.addMessage(selected.id, { from: "me", text: t, kind: "text" });
    setDraft("");
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  // attach files
  const onAttach = (files) => {
    if (!selected || !files?.length) return;
    Array.from(files).forEach((f) => {
      History.addMessage(selected.id, { from: "me", text: `📎 ${f.name}`, kind: "file" });
    });
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const callAudio = () => selected && navigate(`/audio-call?with=${encodeURIComponent(selected.id)}`);
  const callVideo = () => selected && navigate(`/dashboard/call/active?with=${encodeURIComponent(selected.id)}&type=video`);

  return (
    <main className="shell">
      <section className="container-xx">
        <div className="chats-wrap">
          {/* LEFT: chat list */}
          {(showListOnlyMobile || !isMobile) && (
            <aside className="chats-sidebar">
              <div className="chats-header">
                <div className="chats-title">Chats</div>
                <div className="chats-actions" />
              </div>

              <div className="chats-search">
                <SearchIcon size={16} />
                <input
                  placeholder="Search chats"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              <div className="chats-list">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    className={`chat-item ${selected?.id === c.id ? "on" : ""}`}
                    onClick={() => openChat(c.id)}
                  >
                    <img className="chat-ava" src={c.avatar} alt={c.name} />
                    <div className="chat-mid">
                      <div className="chat-row1">
                        <span className="chat-name">{c.name}</span>
                        <span className="chat-time">{c.pinned ? <Pin size={14} /> : " "}</span>
                      </div>
                      <div className="chat-row2">
                        <span className="chat-last">{c.last}</span>
                        {!!c.unread && <span className="chat-unread">{c.unread}</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </aside>
          )}

          {/* RIGHT: thread */}
          {(showThreadOnlyMobile || !isMobile) && (
            <section className="chats-thread chat-page">
              <div className="chat-topbar">
                {isMobile && selected && (
                  <button className="icon-btn ghost" aria-label="Back" onClick={goBackToList}>
                    <ArrowLeft size={18} />
                  </button>
                )}

                {selected ? (
                  <>
                    <div className="chat-peer">
                      <div className="chat-avatar">L</div>
                      <div className="chat-peer-meta">
                        <div className="chat-peer-name">
                          <span className="name-clip" title={selected.name}>{selected.name}</span>
                          <span className="vbadge badge-compact" title="Verified">
                            <ShieldCheck size={12} />
                            <span className="vb-text">verified</span>
                          </span>
                        </div>
                        <div className="chat-peer-sub">{selected.subtitle}</div>
                      </div>
                    </div>

                    <div className="chat-actions">
                      <button className="icon-btn ghost" onClick={callAudio} title="Voice call"><Phone size={18} /></button>
                      <button className="icon-btn ghost" onClick={callVideo} title="Video call"><Video size={18} /></button>
                      <button className="icon-btn ghost" title="More"><MoreVertical size={18} /></button>
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: 13, opacity: .8 }}>Select a chat</div>
                )}
              </div>

              {selected ? (
                <div className="chat-frame panel">
                  <div className="chat-body" ref={scrollRef}>
                    {visibleMessages.length === 0 && (
                      <div style={{ textAlign: "center", opacity: .8, padding: "32px 0" }}>
                        Say hello to <strong>{selected.name}</strong> 👋
                      </div>
                    )}
                    {visibleMessages.map((m) => (
                      <div key={m.id} className={`bubble ${m.from === "me" ? "me" : "them"}`}>
                        <div className="bubble-text">{m.text}</div>
                        <div className="bubble-meta">
                          {m.at} {m.from === "me" && <CheckCheck size={12} style={{ marginLeft: 6 }} />}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="chat-composer">
                    <button className="icon-btn" onClick={() => document.getElementById("chat-file").click()}>
                      <Paperclip size={18} />
                    </button>
                    <input
                      className="chat-input"
                      placeholder="Type a message"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && send()}
                    />
                    <button className="send-btn" onClick={send}><Send size={16} /></button>
                    <input
                      id="chat-file"
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => {
                        onAttach(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="panel subtle" style={{ display:"grid", placeItems:"center", minHeight: 320 }}>
                  Select a chat from the left panel.
                </div>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
