import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Chat companions (pure SVG + CSS, colours come from tokens in styles.css).
 *  - <DeskCat/> walks along the top edge of the message box, follows the
 *    pointer, naps when you go quiet, hops when a message is sent or arrives,
 *    and while the assistant is working says so truthfully.
 *  - <NappingDog/> sleeps beside the welcome headline and wakes on hover.
 * Reduced motion: both hold a still pose.
 */

const POKE_LINES = ["mrrp.", "purr.", "pet me twice.", "he ships on weekends.", "ask about the RAG project.", "i approve this resume."];
const WORKING_LINE = "digging through his resume…";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function CatSvg({ asleep }) {
  return (
    <svg viewBox="0 0 90 64" width="90" height="64" aria-hidden="true">
      <g className="cat__tail">
        <path className="pc-stroke-body" d="M18 46 C2 46 0 26 12 22" fill="none" strokeWidth="7" strokeLinecap="round" />
        <path className="pc-stroke-dark" d="M12 22 C10 22 9 21 9 20" fill="none" strokeWidth="7" strokeLinecap="round" />
      </g>
      <g>
        <rect className="cat__leg cat__leg--a pc-body" x="26" y="48" width="8" height="13" rx="4" />
        <rect className="cat__leg cat__leg--b pc-body-2" x="35" y="48" width="8" height="13" rx="4" />
        <rect className="cat__leg cat__leg--b pc-body-2" x="52" y="48" width="8" height="13" rx="4" />
        <rect className="cat__leg cat__leg--a pc-body" x="61" y="48" width="8" height="13" rx="4" />
      </g>
      <ellipse className="pc-body" cx="45" cy="42" rx="26" ry="14" />
      <path className="pc-stroke-stripe" d="M32 31 q3 6 0 12 M42 29 q3 7 0 14 M52 30 q3 7 0 13" fill="none" strokeWidth="3" strokeLinecap="round" />
      <ellipse className="pc-belly" cx="50" cy="50" rx="14" ry="5" />
      <g className="cat__head">
        <polygon className="pc-body" points="58,20 61,6 70,16" />
        <polygon className="pc-body" points="72,16 82,6 83,22" />
        <polygon className="pc-pink" points="61,17 62,10 67,16" />
        <polygon className="pc-pink" points="74,16 80,10 80,19" />
        <circle className="pc-body" cx="71" cy="30" r="14" />
        <path className="pc-stroke-stripe" d="M66 18 v5 M71 17 v6 M76 18 v5" strokeWidth="2.4" strokeLinecap="round" />
        {asleep ? (
          <>
            <path className="pc-stroke-ink" d="M62 31 q3 3 6 0 M74 31 q3 3 6 0" fill="none" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <g className="cat__eyes">
            <ellipse className="pc-ink" cx="65" cy="30" rx="2.6" ry="3.4" />
            <ellipse className="pc-ink" cx="77" cy="30" rx="2.6" ry="3.4" />
            <circle className="pc-shine" cx="66" cy="28.8" r="1" />
            <circle className="pc-shine" cx="78" cy="28.8" r="1" />
          </g>
        )}
        <polygon className="pc-nose" points="69,35 73,35 71,38" />
        <path className="pc-stroke-ink" d="M71 38 v2 M71 40 q-3 3 -6 1 M71 40 q3 3 6 1" fill="none" strokeWidth="1.2" strokeLinecap="round" />
        <path className="pc-stroke-whisker" d="M58 36 l-9 -2 M58 39 l-9 2 M84 36 l9 -2 M84 39 l9 2" strokeWidth="1" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function DeskCat({ working, nudge }) {
  const laneRef = useRef(null);
  const catRef = useRef(null);
  const st = useRef({ x: 40, target: 40, dir: 1, active: Date.now(), wander: 0 });
  const [mode, setMode] = useState("idle"); // idle | walk | sleep | hop
  const [flip, setFlip] = useState(false);
  const [poke, setPoke] = useState("");
  const pokeTimer = useRef(0);
  const noMotion = useRef(false);

  const hop = useCallback(() => {
    if (noMotion.current) return;
    setMode("hop");
    setTimeout(() => setMode((m) => (m === "hop" ? "idle" : m)), 520);
  }, []);

  const wake = useCallback(() => {
    st.current.active = Date.now();
    setMode((m) => (m === "sleep" ? "idle" : m));
  }, []);

  // A message was sent or an answer arrived: react.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    wake();
    hop();
  }, [nudge, wake, hop]);

  useEffect(() => {
    noMotion.current = reduced();
    const s = st.current;
    const lane = () => laneRef.current?.getBoundingClientRect();

    const onMove = (e) => {
      const r = lane();
      if (!r) return;
      s.target = Math.max(0, Math.min(r.width - 92, e.clientX - r.left - 46));
      wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("keydown", wake);

    let raf;
    let last = performance.now();
    const place = () => catRef.current && (catRef.current.style.transform = `translateX(${s.x}px)`);
    const tick = (now) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const idle = Date.now() - s.active;
      if (idle > 16000) {
        setMode((m) => (m === "sleep" || m === "hop" ? m : "sleep"));
      } else if (!noMotion.current) {
        const r = lane();
        if (idle > 6000 && r && now - s.wander > 5000) {
          s.wander = now;
          s.target = Math.random() * Math.max(0, r.width - 92);
        }
        const dx = s.target - s.x;
        if (Math.abs(dx) > 6) {
          s.dir = dx > 0 ? 1 : -1;
          s.x += Math.sign(dx) * Math.min(Math.abs(dx), 0.1 * dt);
          setMode((m) => (m === "idle" ? "walk" : m));
        } else {
          setMode((m) => (m === "walk" ? "idle" : m));
        }
        place();
        setFlip((f) => (f === (s.dir < 0) ? f : s.dir < 0));
      }
      raf = requestAnimationFrame(tick);
    };
    place();
    raf = requestAnimationFrame(tick);

    const onVis = () => document.hidden && setMode("sleep");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(pokeTimer.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", wake);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [wake]);

  const onPoke = () => {
    wake();
    setPoke(POKE_LINES[Math.floor(Math.random() * POKE_LINES.length)]);
    clearTimeout(pokeTimer.current);
    pokeTimer.current = setTimeout(() => setPoke(""), 2600);
    hop();
  };

  const asleep = mode === "sleep" && !working;
  const say = poke || (working ? WORKING_LINE : "");
  return (
    <div className="lane" ref={laneRef}>
      <div className="lane__slot" ref={catRef}>
        <button
          type="button"
          className={`cat cat--${asleep ? "sleep" : mode}${flip ? " cat--flip" : ""}${working ? " cat--working" : ""}`}
          onClick={onPoke}
          aria-label="Pet the cat"
        >
          {say && <span className="bubble-pet" role="status">{say}</span>}
          {asleep && (
            <span className="zzz" aria-hidden="true">
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

export function NappingDog() {
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
      <svg viewBox="0 0 110 62" width="132" height="74" aria-hidden="true">
        <g className="dog__tail">
          <path className="pc-stroke-dog-dark" d="M96 40 C108 36 108 24 102 20" fill="none" strokeWidth="8" strokeLinecap="round" />
        </g>
        <ellipse className="pc-dog" cx="56" cy="44" rx="40" ry="16" />
        <ellipse className="pc-dog-belly" cx="72" cy="52" rx="20" ry="6" />
        <g className="dog__head">
          <ellipse className="dog__ear pc-dog-ear" cx="24" cy="30" rx="9" ry="14" transform="rotate(14 24 30)" />
          <ellipse className="pc-dog" cx="30" cy="40" rx="19" ry="16" />
          <ellipse className="pc-dog-belly" cx="18" cy="46" rx="11" ry="8" />
          <ellipse className="pc-ink" cx="9" cy="43" rx="4" ry="3" />
          {awake ? (
            <>
              <circle className="pc-ink" cx="27" cy="34" r="2.8" />
              <circle className="pc-shine" cx="28" cy="33" r="0.9" />
              <path className="pc-tongue" d="M10 49 q6 7 13 1" strokeWidth="1.2" strokeLinecap="round" />
            </>
          ) : (
            <path className="pc-stroke-ink" d="M22 35 q4 4 9 0" fill="none" strokeWidth="2" strokeLinecap="round" />
          )}
        </g>
        <path className="pc-stroke-dog" d="M44 56 q8 -3 16 0" fill="none" strokeWidth="9" strokeLinecap="round" />
      </svg>
      {!awake && (
        <span className="zzz zzz--dog" aria-hidden="true">
          <i>z</i>
          <i>z</i>
        </span>
      )}
    </button>
  );
}
