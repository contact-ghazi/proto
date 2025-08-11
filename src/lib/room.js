export function newRoomCode(len = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `case-${s}`;
}
export function roomLink(code) {
  return `${window.location.origin}/call/${encodeURIComponent(code)}`;
}
