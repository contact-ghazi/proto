import React, { useEffect, useState, Suspense } from "react";

export default function HeroAnimation({
  size = 160,
  className = "",
  loop = true,
  autoplay = true,
}) {
  const [Lottie, setLottie] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [{ default: LottieComp }, maybeData] = await Promise.all([
          import("lottie-react"),
          import("../assets/lawyer-walk.json").catch(() => ({ default: null })),
        ]);
        if (!mounted) return;
        setLottie(() => LottieComp);
        if (maybeData?.default) setAnimationData(maybeData.default);
      } catch {
        // use fallback silently
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div
      className={["relative select-none pointer-events-none", className].join(" ")}
      style={{ width: size, height: size }}
      aria-label="Advocate AI animation"
    >
      {Lottie && animationData ? (
        <Suspense fallback={<Skeleton size={size} />}>
          <Lottie animationData={animationData} loop={loop} autoplay={autoplay}
                  style={{ width: size, height: size }} />
        </Suspense>
      ) : (
        <FallbackSVG size={size} />
      )}
    </div>
  );
}

function Skeleton({ size }) {
  return (
    <div className="animate-pulse rounded-xl bg-white/10"
         style={{ width: size, height: size }} />
  );
}

function FallbackSVG({ size = 160 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      <g fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
        <path d="M14 50h36" />
        <path d="M22 40l18-18M36 14l10 10" />
        <path d="M20 42l4 4" />
      </g>
    </svg>
  );
}
