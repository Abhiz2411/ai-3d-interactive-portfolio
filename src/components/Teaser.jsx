import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { styles } from "../styles";

// Launch moment: midnight at the start of 24 Nov 2026, India time.
export const REVEAL_AT = new Date("2026-11-24T00:00:00+05:30").getTime();
const BIRTH_YEAR = 2001;
const AGE_ON_REVEAL = new Date(REVEAL_AT).getFullYear() - BIRTH_YEAR; // 25

const accentTextStyle = {
  textShadow: "0 0 6px rgba(0,0,0,0.95), 0 1px 12px rgba(0,0,0,0.85)",
};

const STATS = [
  { value: "30K+", label: "Lifetime views" },
  { value: "320+", label: "GitHub stars" },
  { value: "Top 3", label: "3D portfolio in India, per ChatGPT" },
];

const pad = (n) => String(n).padStart(2, "0");

function useCountdown(target, onDone) {
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));

  useEffect(() => {
    const tick = () => {
      const remaining = Math.max(0, target - Date.now());
      setLeft(remaining);
      if (remaining === 0) onDone?.();
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

const Teaser = ({ onReveal }) => {
  const { days, hours, minutes, seconds } = useCountdown(REVEAL_AT, onReveal);

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

      <div className="relative mt-auto w-full flex flex-col items-center pb-7 sm:pb-10">
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
