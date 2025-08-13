// src/utils/historyStore.js
const STORAGE_KEY = "advai_history_v1";
const UPDATE_EVENT = "advai:history-update";
const SCHEMA_VERSION = 2;

function nowISO() { return new Date().toISOString(); }
function uuid() {
  return (crypto?.randomUUID?.() ||
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0, v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }));
}

function migrate(db) {
  db.calls = (db.calls || []).map((c) => {
    let peer = c.peerId ?? c.with ?? c.to ?? c.target ?? c.peer ?? "";
    peer = (peer == null ? "" : String(peer)).trim();
    if (!peer) peer = "unknown_contact";
    return { ...c, peerId: peer };
  });
  db._v = SCHEMA_VERSION;
  return db;
}

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let data = raw ? JSON.parse(raw) : { messages: {}, calls: [], _v: SCHEMA_VERSION };
    if (!data.messages) data.messages = {};
    if (!Array.isArray(data.calls)) data.calls = [];
    if (typeof data._v !== "number") data._v = 1;
    if (data._v < SCHEMA_VERSION) {
      data = migrate(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    return data;
  } catch {
    return { messages: {}, calls: [], _v: SCHEMA_VERSION };
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
  if ("BroadcastChannel" in window) {
    try {
      const bc = new BroadcastChannel(UPDATE_EVENT);
      bc.postMessage("update");
      bc.close();
    } catch {}
  }
}

const History = {
  addMessage(threadId, { id = uuid(), from, text, at = nowISO(), kind = "text" } = {}) {
    const db = read();
    if (!db.messages[threadId]) db.messages[threadId] = [];
    db.messages[threadId].push({ id, from, text, at, kind });
    write(db);
    return id;
  },
  getMessages(threadId) {
    const db = read();
    return db.messages[threadId] || [];
  },
  getThreads() {
    const db = read();
    return Object.keys(db.messages);
  },
  clearThread(threadId) {
    const db = read();
    delete db.messages[threadId];
    write(db);
  },

  startCall({ peerId, type = "video", direction = "out" } = {}) {
    const db = read();
    const id = uuid();
    const call = {
      id,
      peerId: peerId ? String(peerId) : "unknown_contact",
      type,
      direction,
      startedAt: nowISO(),
      endedAt: null,
      durationSec: 0,
      status: "ongoing",
    };
    db.calls.unshift(call);
    write(db);
    return id;
  },
  endCall(callId, { status = "completed" } = {}) {
    const db = read();
    const call = db.calls.find(c => c.id === callId);
    if (call && !call.endedAt) {
      call.endedAt = nowISO();
      call.status = status;
      try {
        const s = new Date(call.startedAt).getTime();
        const e = new Date(call.endedAt).getTime();
        call.durationSec = Math.max(0, Math.round((e - s) / 1000));
      } catch {}
      write(db);
    }
  },
  getCalls() {
    const db = read();
    return db.calls;
  },
  clearCalls() {
    const db = read();
    db.calls = [];
    write(db);
  },

  subscribe(fn) {
    const onUpdate = () => fn();
    window.addEventListener(UPDATE_EVENT, onUpdate);
    let bc;
    if ("BroadcastChannel" in window) {
      bc = new BroadcastChannel(UPDATE_EVENT);
      bc.onmessage = onUpdate;
    }
    return () => {
      window.removeEventListener(UPDATE_EVENT, onUpdate);
      if (bc) bc.close();
    };
  }
};

export default History;
