// Tiny dependency-free confetti: two cannons from the bottom corners plus a
// centre burst, drawn on a temporary full-screen canvas that removes itself.
const COLORS = ["#915EFF", "#c9b3ff", "#ffffff", "#ffd166", "#4cc9f0", "#ff6b9d"];

export function fireConfetti(duration = 3800) {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = window.innerWidth;
  const H = window.innerHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const parts = [];
  const spawn = (x, y, angle, spread, count, speed) => {
    for (let i = 0; i < count; i++) {
      const a = angle + (Math.random() - 0.5) * spread;
      const v = speed * (0.55 + Math.random() * 0.6);
      parts.push({
        x,
        y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
      });
    }
  };

  const power = Math.min(W, 900) / 55;
  spawn(0, H, -Math.PI / 3, 0.7, 90, power * 2.2);
  spawn(W, H, (-2 * Math.PI) / 3, 0.7, 90, power * 2.2);
  spawn(W / 2, H * 0.55, -Math.PI / 2, Math.PI * 1.4, 110, power * 1.6);

  const start = performance.now();
  const frame = (now) => {
    const t = now - start;
    ctx.clearRect(0, 0, W, H);
    const fade = t > duration - 900 ? Math.max(0, (duration - t) / 900) : 1;
    for (const p of parts) {
      p.vy += 0.16; // gravity
      p.vx *= 0.992;
      p.vy *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (t < duration) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
