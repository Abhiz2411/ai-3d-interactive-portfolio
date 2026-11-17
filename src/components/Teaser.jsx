import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { styles } from "../styles";
import { fireConfetti } from "../utils/confetti";

// Launch moment: midnight at the start of 24 Nov 2026, India time.
export const REVEAL_AT = new Date("2026-11-24T00:00:00+05:30").getTime();
// Dev-only test mode: `?countdown=20` (npm run dev / vite dev server) runs a
// short countdown. Compiled out of production builds so visitors cannot use it.
const testParam = import.meta.env.DEV
  ? Number(new URLSearchParams(window.location.search).get("countdown"))
  : 0;
export const TEST_SECONDS = testParam > 0 ? Math.min(testParam, 600) : 0;

const BIRTH_YEAR = 2001;
const AGE_ON_REVEAL = new Date(REVEAL_AT).getFullYear() - BIRTH_YEAR; // 25

const accentTextStyle = {
  textShadow: "0 0 6px rgba(0,0,0,0.95), 0 1px 12px rgba(0,0,0,0.85)",
};

const STATS = [
  { value: "30K+", label: "Lifetime views" },
  { value: "320+", label: "GitHub stars" },
  { value: "Top 10", label: "3D portfolio in India, per ChatGPT" },
];

const pad = (n) => String(n).padStart(2, "0");

function useCountdown(target, onDone) {
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));
  const doneRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, target - Date.now());
      setLeft(remaining);
      if (remaining === 0 && !doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, onDone]);

  const s = Math.floor(left / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const Unit = ({ value, label, glow }) => (
  <div
    className={`flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md
      w-[68px] h-[78px] xs:w-[76px] xs:h-[88px] sm:w-[110px] sm:h-[120px] md:w-[130px] md:h-[136px]
      ${glow ? "shadow-[0_0_40px_rgba(145,94,255,0.28)]" : ""}`}
  >
    <span className="font-bold tabular-nums text-white leading-none text-[30px] xs:text-[34px] sm:text-[52px] md:text-[62px]">
      {value}
    </span>
    <span className="mt-2 uppercase tracking-[0.18em] text-white/55 text-[9px] sm:text-[11px]">
      {label}
    </span>
  </div>
);

const CELEBRATION_MS = 3200;

const Teaser = ({ onReveal }) => {
  const [target] = useState(() =>
    TEST_SECONDS ? Date.now() + TEST_SECONDS * 1000 : REVEAL_AT
  );
  const [done, setDone] = useState(false);

  const { days, hours, minutes, seconds } = useCountdown(target, () => {
    setDone(true);
    fireConfetti(CELEBRATION_MS + 600);
    setTimeout(() => onReveal?.(), CELEBRATION_MS);
  });

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center text-center px-5">
      {/* readability scrim for the lower half */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/55 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-[17vh] md:pt-[10vh]"
      >
        <h1
          className={`${styles.heroHeadText} text-white max-md:!text-[34px] max-md:!leading-[42px]`}
        >
          Hi, I'm{" "}
          <span className="text-[#915EFF]" style={accentTextStyle}>
            Abhijit Zende
          </span>
        </h1>
        <p className="mt-2 text-white font-medium text-xl sm:text-2xl md:text-3xl">
          Lead AI Engineer
        </p>
      </motion.div>

      {done && (
        <>
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: [0, 0.9, 0.35], scale: [0.4, 1.6, 2.2] }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-[62%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(145,94,255,0.65),rgba(145,94,255,0)_65%)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 12 }}
            className="relative mt-auto mb-[14vh] flex flex-col items-center"
            role="status"
          >
            <p className="uppercase tracking-[0.3em] text-[#c9b3ff] text-[10px] sm:text-xs">
              24 November 2026
            </p>
            <h2 className="mt-3 font-black text-white text-[38px] leading-[44px] sm:text-[64px] sm:leading-[72px]">
              The wait is{" "}
              <span className="text-[#915EFF]" style={accentTextStyle}>
                over
              </span>
              .
            </h2>
            <p className="mt-3 text-white/90 text-base sm:text-xl">
              Welcome to my portfolio.
            </p>
          </motion.div>
        </>
      )}

      <div
        className={`relative mt-auto w-full flex-col items-center pb-7 sm:pb-10 ${
          done ? "hidden" : "flex"
        }`}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="uppercase tracking-[0.3em] text-[#c9b3ff] text-[10px] sm:text-xs"
        >
          Portfolio reveal · 24 November 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 flex gap-2 sm:gap-4"
          role="timer"
          aria-label="Time until the portfolio goes live"
        >
          <Unit value={days} label="Days" />
          <Unit value={pad(hours)} label="Hours" />
          <Unit value={pad(minutes)} label="Minutes" />
          <Unit value={pad(seconds)} label="Seconds" glow />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-5 max-w-[34rem] text-white/90 text-[15px] sm:text-lg leading-snug"
        >
          On my birthday I turn{" "}
          <span className="font-semibold text-white">{AGE_ON_REVEAL}</span>,
          and my portfolio goes live. Come back and see what I've built.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 sm:mt-8 grid grid-cols-3 w-full max-w-[40rem] divide-x divide-white/15"
        >
          {STATS.map((s) => (
            <li key={s.value} className="px-2 sm:px-4">
              <div className="text-xl sm:text-3xl font-bold text-white">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] sm:text-xs leading-tight text-white/55">
                {s.label}
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Teaser;
