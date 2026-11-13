import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { About, Navbar, Preloader, ScrollyHero } from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
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

const App = () => {
  const belowFoldReady = useIdleReady();

  return (
    <ReactBitsCursorProvider>
      <ReactBitsAudioProvider>
        <Preloader>
          <BrowserRouter>
            <div
              className="relative z-0"
              style={{ backgroundColor: "hsl(222.2 84% 4.9%)" }}
            >
              <ElasticCursor />
              <EasterEggs />
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <ScrollyHero />
              </div>
              {belowFoldReady ? (
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
            </div>
          </BrowserRouter>
        </Preloader>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
