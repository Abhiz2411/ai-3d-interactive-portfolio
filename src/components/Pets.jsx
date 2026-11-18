import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Small companions that make the page feel lived in.
 *  - <RoamingCat/>: a tabby that pads along the bottom edge, drifts toward the
 *    cursor, hops when you scroll, curls up and naps when you go idle, and says
 *    something when poked.
 *  - <SleepyDog/>: a dog napping on the contact card who wakes and wags when
 *    you hover him.
 * Both are pure SVG + CSS (no assets). With prefers-reduced-motion they hold a
 * still pose. They never block clicks on the page (the cat wrapper ignores
 * pointer events; only the cat's own body is clickable).
 */

const CAT_LINES = [
  "mrrp!",
  "purr…",
  "pet me twice",
  "Abhijit ships on weekends",
  "have you seen my projects?",
  "i approve this resume",
  "treats = tokens",
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function CatSvg({ asleep }) {
  return (
    <svg viewBox="0 0 90 64" width="90" height="64" aria-hidden="true">
      <g className="cat__tail">
        <path d="M18 46 C2 46 0 26 12 22" fill="none" stroke="#e8923f" strokeWidth="7" strokeLinecap="round" />
        <path d="M12 22 C10 22 9 21 9 20" fill="none" stroke="#7a4a22" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="cat__legs">
        <rect className="cat__leg cat__leg--a" x="26" y="48" width="8" height="13" rx="4" fill="#e8923f" />
        <rect className="cat__leg cat__leg--b" x="35" y="48" width="8" height="13" rx="4" fill="#d9822f" />
        <rect className="cat__leg cat__leg--b" x="52" y="48" width="8" height="13" rx="4" fill="#d9822f" />
        <rect className="cat__leg cat__leg--a" x="61" y="48" width="8" height="13" rx="4" fill="#e8923f" />
      </g>
      <ellipse cx="45" cy="42" rx="26" ry="14" fill="#f2a45a" />
      <path d="M32 31 q3 6 0 12 M42 29 q3 7 0 14 M52 30 q3 7 0 13" fill="none" stroke="#c9722b" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="50" cy="50" rx="14" ry="5" fill="#fde7c8" opacity=".8" />
      <g className="cat__head">
        <polygon points="58,20 61,6 70,16" fill="#f2a45a" />
        <polygon points="72,16 82,6 83,22" fill="#f2a45a" />
        <polygon points="61,17 62,10 67,16" fill="#f7b9c3" />
        <polygon points="74,16 80,10 80,19" fill="#f7b9c3" />
        <circle cx="71" cy="30" r="14" fill="#f2a45a" />
        <path d="M66 18 v5 M71 17 v6 M76 18 v5" stroke="#c9722b" strokeWidth="2.4" strokeLinecap="round" />
        {asleep ? (
          <>
            <path d="M62 31 q3 3 6 0" fill="none" stroke="#3a2210" strokeWidth="2" strokeLinecap="round" />
            <path d="M74 31 q3 3 6 0" fill="none" stroke="#3a2210" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <g className="cat__eyes">
            <ellipse cx="65" cy="30" rx="2.6" ry="3.4" fill="#2a1a0c" />
            <ellipse cx="77" cy="30" rx="2.6" ry="3.4" fill="#2a1a0c" />
            <circle cx="66" cy="28.8" r="1" fill="#fff" />
            <circle cx="78" cy="28.8" r="1" fill="#fff" />
          </g>
        )}
        <polygon points="69,35 73,35 71,38" fill="#e58a98" />
        <path d="M71 38 v2 M71 40 q-3 3 -6 1 M71 40 q3 3 6 1" fill="none" stroke="#3a2210" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M58 36 l-9 -2 M58 39 l-9 2 M84 36 l9 -2 M84 39 l9 2" stroke="#fff" strokeOpacity=".55" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function RoamingCat() {
  const catRef = useRef(null);
  const state = useRef({ x: 80, target: 80, dir: 1, lastActive: Date.now(), wander: 0 });
  const [mode, setMode] = useState("idle"); // idle | walk | sleep | hop
  const [flip, setFlip] = useState(false);
  const [line, setLine] = useState("");
  const lineTimer = useRef(0);
  const reduced = useRef(false);

  const wake = useCallback(() => {
    state.current.lastActive = Date.now();
    setMode((m) => (m === "sleep" ? "idle" : m));
  }, []);

  useEffect(() => {
    reduced.current = prefersReducedMotion();
    const s = state.current;
    const width = () => window.innerWidth;
    s.x = Math.min(width() - 110, 80);
    s.target = s.x;

    const onMove = (e) => {
      s.target = Math.max(8, Math.min(width() - 100, e.clientX - 45));
      wake();
    };
    let scrollHop = 0;
    const onScroll = () => {
      wake();
      const now = Date.now();
      if (now - scrollHop > 1800 && !reduced.current) {
        scrollHop = now;
        setMode("hop");
        setTimeout(() => setMode((m) => (m === "hop" ? "idle" : m)), 520);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", wake);

    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const idleFor = Date.now() - s.lastActive;

      // Go to sleep after 14 s with no mouse, scroll or key input.
      if (idleFor > 14000) {
        setMode((m) => (m === "sleep" ? m : "sleep"));
      } else if (!reduced.current) {
        // Touch devices (no pointermove) wander a little now and then.
        if (idleFor > 6000 && now - s.wander > 5000) {
          s.wander = now;
          s.target = 20 + Math.random() * (width() - 140);
        }
        const dx = s.target - s.x;
        if (Math.abs(dx) > 6) {
          s.dir = dx > 0 ? 1 : -1;
          s.x += Math.sign(dx) * Math.min(Math.abs(dx), 0.11 * dt);
          setMode((m) => (m === "idle" ? "walk" : m));
        } else {
          setMode((m) => (m === "walk" ? "idle" : m));
        }
        if (catRef.current) catRef.current.style.transform = `translateX(${s.x}px)`;
        setFlip((f) => (f !== (s.dir < 0) ? s.dir < 0 : f));
      }
      raf = requestAnimationFrame(tick);
    };
    if (catRef.current) catRef.current.style.transform = `translateX(${s.x}px)`;
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(lineTimer.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", wake);
    };
  }, [wake]);

  // Stop animating while the tab is hidden.
  useEffect(() => {
    const onVis = () => document.hidden && setMode("sleep");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const poke = () => {
    wake();
    const next = CAT_LINES[Math.floor(Math.random() * CAT_LINES.length)];
    setLine(next);
    clearTimeout(lineTimer.current);
    lineTimer.current = setTimeout(() => setLine(""), 2600);
    if (!reduced.current) {
      setMode("hop");
      setTimeout(() => setMode((m) => (m === "hop" ? "idle" : m)), 520);
    }
  };

  const asleep = mode === "sleep";
  return (
    <div className="pets-layer" aria-hidden="false">
      <div ref={catRef} className="cat-slot">
        <button
          type="button"
          className={`cat cat--${mode}${flip ? " cat--flip" : ""}`}
          onClick={poke}
          aria-label="Pet the cat"
        >
          {line && <span className="cat__bubble" role="status">{line}</span>}
          {asleep && (
            <span className="cat__zzz" aria-hidden="true">
              <i>z</i>
              <i>z</i>
              <i>Z</i>
            </span>
          )}
          <CatSvg asleep={asleep} />
        </button>
      </div>
    </div>
  );
}

export function SleepyDog() {
  const [awake, setAwake] = useState(false);
  return (
    <button
      type="button"
      className={`dog${awake ? " dog--awake" : ""}`}
      onMouseEnter={() => setAwake(true)}
      onMouseLeave={() => setAwake(false)}
      onFocus={() => setAwake(true)}
      onBlur={() => setAwake(false)}
      onClick={() => setAwake((a) => !a)}
      aria-label="Wake the dog"
    >
      <svg viewBox="0 0 110 62" width="110" height="62" aria-hidden="true">
        <g className="dog__tail">
          <path d="M96 40 C108 36 108 24 102 20" fill="none" stroke="#c9a37a" strokeWidth="8" strokeLinecap="round" />
        </g>
        <ellipse cx="56" cy="44" rx="40" ry="16" fill="#e4c29a" />
        <ellipse cx="72" cy="52" rx="20" ry="6" fill="#f6e6cf" />
        <g className="dog__head">
          <ellipse className="dog__ear" cx="24" cy="30" rx="9" ry="14" fill="#a9794a" transform="rotate(14 24 30)" />
          <ellipse cx="30" cy="40" rx="19" ry="16" fill="#e4c29a" />
          <ellipse cx="18" cy="46" rx="11" ry="8" fill="#f6e6cf" />
          <ellipse cx="9" cy="43" rx="4" ry="3" fill="#2a1a0c" />
          {awake ? (
            <>
              <circle cx="27" cy="34" r="2.8" fill="#2a1a0c" />
              <circle cx="28" cy="33" r="0.9" fill="#fff" />
              <path d="M10 49 q6 7 13 1" fill="#f28a9b" stroke="#2a1a0c" strokeWidth="1.2" strokeLinecap="round" />
            </>
          ) : (
            <path d="M22 35 q4 4 9 0" fill="none" stroke="#3a2210" strokeWidth="2" strokeLinecap="round" />
          )}
        </g>
        <path className="dog__paw" d="M44 56 q8 -3 16 0" fill="none" stroke="#e4c29a" strokeWidth="9" strokeLinecap="round" />
      </svg>
      {!awake && (
        <span className="dog__zzz" aria-hidden="true">
          <i>z</i>
          <i>z</i>
        </span>
      )}
    </button>
  );
}
