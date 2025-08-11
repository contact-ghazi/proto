import React, { useEffect, useRef, useState } from "react";

/**
 * TypeWriter
 * Modes:
 *  - "default": single line loop (type + delete)
 *  - "stacked": types each line under the previous; now supports looping
 *
 * Props:
 *  - lines / words: string[]
 *  - mode: "default" | "stacked"
 *  - typingSpeed: ms per char
 *  - deletingSpeed: ms per char (default mode only)
 *  - holdTime: ms to hold full word (default mode)
 *  - startDelay: ms before first line starts (stacked)
 *  - betweenDelay: ms after a line finishes before next starts (stacked)
 *  - loop: boolean (stacked + default)  ← NEW
 *  - loopDelay: ms to wait before restarting stacked sequence ← NEW
 *  - glowActive: boolean
 *  - className: string
 *  - lineGapClass: string
 */
export default function TypeWriter({
  lines,
  words,
  mode = "stacked",
  typingSpeed = 45,
  deletingSpeed = 28,
  holdTime = 1100,
  startDelay = 300,
  betweenDelay = 300,
  loop = true,          // 🔁 default: keep looping
  loopDelay = 1200,     // pause before restarting stacked sequence
  glowActive = true,
  className = "text-lg md:text-2xl font-semibold text-white",
  lineGapClass = "mt-2",
}) {
  const items = (lines && lines.length ? lines : words) || [];
  const [text, setText] = useState(""); // default mode
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // STACKED state
  const [rendered, setRendered] = useState(Array(items.length).fill(""));
  const timers = useRef({}); // {start,type,between,restart}

  useEffect(() => {
    if (!items.length) return;

    // clear all timers on rerun/unmount
    const clearAll = () => Object.values(timers.current).forEach(t => t && clearTimeout(t));

    if (mode === "stacked") {
      clearAll();
      // reset output
      setRendered(Array(items.length).fill(""));

      let i = 0;
      let j = 0;
      const out = Array(items.length).fill("");

      const startTyping = () => {
        const typeNext = () => {
          const line = items[i] || "";
          if (j <= line.length) {
            timers.current.type = setTimeout(() => {
              out[i] = line.slice(0, j);
              setRendered(out.slice());
              j += 1;
              typeNext();
            }, typingSpeed);
          } else if (i + 1 < items.length) {
            timers.current.between = setTimeout(() => {
              i += 1; j = 0;
              typeNext();
            }, betweenDelay);
          } else {
            // finished last line
            if (loop) {
              timers.current.restart = setTimeout(() => {
                // reset and restart sequence
                setRendered(Array(items.length).fill(""));
                i = 0; j = 0; out.fill("");
                startTyping();
              }, loopDelay);
            }
          }
        };
        typeNext();
      };

      timers.current.start = setTimeout(startTyping, startDelay);

      return () => clearAll();
    }

    // DEFAULT (single-line loop)
    const current = items[idx % items.length] || "";
    const speed = deleting ? deletingSpeed : typingSpeed;

    const step = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          const hold = setTimeout(() => setDeleting(true), holdTime);
          // store so we can cleanup
          timers.current.hold = hold;
        }
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setDeleting(false);
          setIdx((i) => (loop ? (i + 1) % items.length : Math.min(i + 1, items.length - 1)));
        }
      }
    }, speed);

    timers.current.step = step;
    return () => Object.values(timers.current).forEach(t => t && clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, mode, typingSpeed, deletingSpeed, holdTime, startDelay, betweenDelay, loop, loopDelay, idx, text, deleting]);

  if (!items.length) return null;

  if (mode === "stacked") {
    const firstIncomplete = rendered.findIndex((x, k) => x.length < ((items[k] || "").length));
    return (
      <div className="w-full">
        {rendered.map((t, i) => {
          const isActive = i === (firstIncomplete === -1 ? rendered.length - 1 : firstIncomplete);
          return (
            <div
              key={i}
              className={`${i > 0 ? lineGapClass : ""} ${className} ${
                glowActive && isActive ? "type-glow text-purple-200" : "text-white/90"
              }`}
            >
              <span>{t}</span>
              {glowActive && isActive && <span className="ml-0.5">|</span>}
            </div>
          );
        })}
      </div>
    );
  }

  // default single-line
  return (
    <div className={className}>
      <span>{text}</span>
      <span className="ml-0.5">|</span>
    </div>
  );
}
