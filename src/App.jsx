import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Navbar, Preloader, ScrollyHero } from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import NotFound from "./components/NotFound";
import Teaser, { REVEAL_AT, TEST_SECONDS } from "./components/Teaser";
import ReactBitsAudioProvider from "./reactbits/context/ReactBitsAudioProvider";
import ReactBitsCursorProvider from "./reactbits/context/ReactBitsCursorProvider";

// Everything below the hero (and the WebGL star field) is split out of the
// initial bundle and only requested once the page has loaded and the browser
// is idle, so the hero paints and becomes interactive first.
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));
const Works = lazy(() => import("./components/Works"));
const Achievement = lazy(() => import("./components/Achievement"));
const SkillKeyboard = lazy(() => import("./components/SkillKeyboard"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));

// The fallback reserves height so sections don't shift the layout on mount.
const SectionFallback = () => <div style={{ minHeight: "100vh" }} />;

function useIdleReady(delayMs = 1200) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer;
    const start = () => {
      timer = setTimeout(() => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(() => setReady(true), { timeout: 3000 });
        } else {
          setReady(true);
        }
      }, delayMs);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, [delayMs]);

  return ready;
}

// Before the launch time only the hero + countdown render. `?reveal=1` lets the
// owner preview the full site early. The gate is client-side (device clock).
const isRevealed = () =>
  new URLSearchParams(window.location.search).has("reveal") ||
  (!TEST_SECONDS && Date.now() >= REVEAL_AT);

const App = () => {
  const belowFoldReady = useIdleReady();
  const [revealed, setRevealed] = useState(isRevealed);
  const revealedOnLoad = useRef(revealed);

  // Single-page site: any path other than the root is a 404.
  const isHome = ["/", "/index.html"].includes(window.location.pathname);
  if (!isHome) return <NotFound />;

  return (
    <ReactBitsCursorProvider>
      <ReactBitsAudioProvider>
        <Preloader>
          <BrowserRouter>
            {/* key remounts on reveal so the full site fades in after the celebration */}
            <motion.div
              key={revealed ? "full" : "teaser"}
              initial={{ opacity: revealedOnLoad.current || !revealed ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="relative z-0"
              style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
            >
              <ElasticCursor />
              <EasterEggs />
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                {revealed && <Navbar />}
                <ScrollyHero teaser={!revealed}>
                  <Teaser
                    onReveal={() => {
                      window.scrollTo(0, 0);
                      setRevealed(true);
                    }}
                  />
                </ScrollyHero>
              </div>
              {!revealed ? null : belowFoldReady ? (
                <>
                  <Suspense fallback={null}>
                    <StarsCanvas />
                  </Suspense>
                  <Suspense fallback={<SectionFallback />}>
                    <Feedbacks />
                  </Suspense>
                  <About />
                  <Suspense fallback={<SectionFallback />}>
                    <Achievement />
                    <Works />
                    <SkillKeyboard />
                    <div className="relative z-0">
                      <Contact />
                    </div>
                  </Suspense>
                </>
              ) : (
                <SectionFallback />
              )}
            </motion.div>
          </BrowserRouter>
        </Preloader>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
