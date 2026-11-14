// Google Analytics 4. Does nothing unless VITE_GA_ID (e.g. G-XXXXXXXXXX) is
// set at build time, so local/dev builds never send data. The gtag script is
// injected only after the page is idle to keep it off the critical path.
const GA_ID = import.meta.env.VITE_GA_ID;
let enabled = false;

function gtag() {
  window.dataLayer.push(arguments);
}

export function initAnalytics() {
  if (!GA_ID || enabled || typeof window === "undefined") return;
  enabled = true;
  window.dataLayer = window.dataLayer || [];

  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
    trackScrollDepth();
  };

  const whenIdle = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(load, { timeout: 4000 })
      : setTimeout(load, 2000);

  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}

export function trackEvent(name, params = {}) {
  if (!enabled || !window.dataLayer) return;
  gtag("event", name, params);
}

function trackScrollDepth() {
  const marks = [25, 50, 75, 100];
  const fired = new Set();
  window.addEventListener(
    "scroll",
    () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      marks.forEach((m) => {
        if (pct >= m - 1 && !fired.has(m)) {
          fired.add(m);
          trackEvent("scroll_depth", { percent: m });
        }
      });
    },
    { passive: true }
  );
}
