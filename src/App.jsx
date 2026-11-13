import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Navbar,
  Preloader,
  ScrollyHero,
  StarsCanvas,
} from "./components";
import EasterEggs from "./components/EasterEggs";
import ElasticCursor from "./components/ElasticCursor";
import ReactBitsAudioProvider from "./reactbits/context/ReactBitsAudioProvider";
import ReactBitsCursorProvider from "./reactbits/context/ReactBitsCursorProvider";

// Below-the-fold sections are split out of the initial bundle; the fallback
// reserves height so they do not shift the layout when they mount.
const Works = lazy(() => import("./components/Works"));
const Achievement = lazy(() => import("./components/Achievement"));
const SkillKeyboard = lazy(() => import("./components/SkillKeyboard"));
const Feedbacks = lazy(() => import("./components/Feedbacks"));
const Contact = lazy(() => import("./components/Contact"));

const SectionFallback = () => <div style={{ minHeight: "100vh" }} />;

const App = () => {
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
              <StarsCanvas />
              <About />
              <Suspense fallback={<SectionFallback />}>
                <Works />
                <Achievement />
                <SkillKeyboard />
                <Feedbacks />
                <div className="relative z-0">
                  <Contact />
                </div>
              </Suspense>
            </div>
          </BrowserRouter>
        </Preloader>
      </ReactBitsAudioProvider>
    </ReactBitsCursorProvider>
  );
};

export default App;
