import { useEffect } from "react";

// Shown for any path other than "/". Themed after the portfolio: deep navy
// space, drifting star field, violet/cyan accents, an AI-flavoured joke.
const NotFound = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "404 | Lost in latent space";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = previousTitle;
      robots.remove();
    };
  }, []);

  return (
    <main className="nf-root">
      <style>{css}</style>
      <div className="nf-stars" aria-hidden="true" />
      <div className="nf-stars nf-stars-2" aria-hidden="true" />
      <div className="nf-planet" aria-hidden="true">
        <span className="nf-ring" />
      </div>

      <section className="nf-content">
        <p className="nf-eyebrow">Error 404</p>
        <h1 className="nf-code" aria-label="404">
          <span>4</span>
          <span className="nf-zero">0</span>
          <span>4</span>
        </h1>
        <h2 className="nf-title">Lost in latent space</h2>
        <p className="nf-text">
          This page wandered off the training data. The link may be broken, or
          the page never existed.
        </p>
        <a className="nf-btn" href="/">
          Back to home
        </a>
        <p className="nf-hint">
          <code>confidence: 0.00 &nbsp;|&nbsp; tokens found: 0</code>
        </p>
      </section>
    </main>
  );
};

const css = `
.nf-root{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
  overflow:hidden;background:radial-gradient(ellipse at 50% 0%,#0b1033 0%,#050816 60%);color:#fff;
  font-family:"Poppins",system-ui,sans-serif;text-align:center;padding:24px}
.nf-stars{position:absolute;inset:0;width:2px;height:2px;background:transparent;border-radius:50%;
  box-shadow:12vw 18vh #fff,28vw 72vh #cfd8ff,41vw 9vh #fff,55vw 33vh #8ec5ff,68vw 81vh #fff,
  83vw 22vh #cfd8ff,91vw 61vh #fff,7vw 55vh #8ec5ff,19vw 91vh #fff,36vw 47vh #fff,73vw 12vh #cfd8ff,
  95vw 90vh #fff,48vw 66vh #8ec5ff,62vw 52vh #fff,4vw 8vh #fff;animation:nfTwinkle 4s ease-in-out infinite}
.nf-stars-2{width:1px;height:1px;opacity:.7;animation-delay:-2s;
  box-shadow:8vw 40vh #fff,22vw 25vh #fff,33vw 85vh #cfd8ff,47vw 15vh #fff,59vw 70vh #fff,
  71vw 38vh #8ec5ff,86vw 48vh #fff,93vw 8vh #fff,15vw 66vh #cfd8ff,52vw 92vh #fff,79vw 74vh #fff}
@keyframes nfTwinkle{0%,100%{opacity:.35}50%{opacity:1}}
.nf-planet{position:absolute;right:-90px;bottom:-90px;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%,#a78bfa 0%,#915eff 35%,#2a1b6e 80%);
  box-shadow:0 0 80px rgba(145,94,255,.45);animation:nfFloat 9s ease-in-out infinite}
.nf-ring{position:absolute;left:-40px;right:-40px;top:46%;height:44px;border-radius:50%;
  border:3px solid rgba(142,197,255,.55);transform:rotate(-18deg)}
@keyframes nfFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
.nf-content{position:relative;z-index:1;max-width:560px}
.nf-eyebrow{letter-spacing:.35em;text-transform:uppercase;font-size:13px;color:#8ec5ff;margin:0 0 6px}
.nf-code{margin:0;display:flex;justify-content:center;gap:6px;font-size:clamp(96px,22vw,190px);
  font-weight:900;line-height:1;background:linear-gradient(180deg,#fff 20%,#915eff 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 0 24px rgba(145,94,255,.45))}
.nf-zero{display:inline-block;animation:nfSpin 12s linear infinite}
@keyframes nfSpin{to{transform:rotate(360deg)}}
.nf-title{margin:8px 0 10px;font-size:clamp(24px,5vw,34px);font-weight:700}
.nf-text{margin:0 auto 26px;color:#b9bfdc;font-size:16px;line-height:1.6;max-width:440px}
.nf-btn{display:inline-block;padding:12px 28px;border-radius:10px;font-weight:600;color:#fff;
  text-decoration:none;background:linear-gradient(90deg,#06b6d4,#6366f1);
  box-shadow:0 8px 24px rgba(99,102,241,.35);transition:transform .2s,box-shadow .2s}
.nf-btn:hover,.nf-btn:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px rgba(99,102,241,.5);outline:none}
.nf-hint{margin:26px 0 0;color:#6b7399;font-size:13px}
@media (prefers-reduced-motion:reduce){.nf-stars,.nf-planet,.nf-zero{animation:none}}
@media (max-width:640px){.nf-planet{width:200px;height:200px;right:-70px;bottom:-70px}}
`;

export default NotFound;
