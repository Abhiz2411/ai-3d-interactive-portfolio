import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { styles } from "../styles";
import useMediaQuery from "../utils/useMediaQuery";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (i) =>
  `/assets/my-profile-hero-section/frame_${String(i).padStart(
    3,
    "0"
  )}_delay-0.041s.webp`;

const ScrollyHero = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Desktop loads every frame; mobile loads every 3rd frame to cap data/memory use.
  const frameIndices = useMemo(() => {
    if (isMobile) {
      const step = 3;
      const indices = [];
      for (let i = 0; i < TOTAL_FRAMES; i += step) indices.push(i);
      if (indices[indices.length - 1] !== TOTAL_FRAMES - 1) {
        indices.push(TOTAL_FRAMES - 1);
      }
      return indices;
    }
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const line1Opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22],
    [1, 1, 0]
  );
  const line1Y = useTransform(scrollYProgress, [0, 0.22], [0, -40]);

  const line2Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.58],
    [0, 1, 1, 0]
  );
  const line2X = useTransform(scrollYProgress, [0.3, 0.58], [-40, 40]);

  const line3Opacity = useTransform(
    scrollYProgress,
    [0.66, 0.76, 0.88, 0.96],
    [0, 1, 1, 0]
  );
  const line3X = useTransform(scrollYProgress, [0.66, 0.96], [40, -40]);

  const draw = (image) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const scale = Math.max(
      cssWidth / image.naturalWidth,
      cssHeight / image.naturalHeight
    );
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (cssWidth - drawWidth) / 2;
    const offsetY = (cssHeight - drawHeight) / 2;

    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(frameIndices.length).fill(null);

    frameIndices.forEach((frameNumber, i) => {
      const img = new Image();
      img.src = FRAME_PATH(frameNumber);
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        if (i === 0) draw(img);
      };
    });

    return () => {
      cancelled = true;
    };
  }, [frameIndices]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const lastIndex = frameIndices.length - 1;
      const targetIndex = Math.min(
        lastIndex,
        Math.max(0, Math.round(progress * lastIndex))
      );
      currentFrameRef.current = targetIndex;
      const image = imagesRef.current[targetIndex];
      if (image) draw(image);
    });
    return unsubscribe;
  }, [scrollYProgress, frameIndices]);

  useEffect(() => {
    const handleResize = () => {
      const image = imagesRef.current[currentFrameRef.current];
      if (image) draw(image);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[400vh]" id="hero">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/60 pointer-events-none" />

        <motion.div
          style={{ opacity: line1Opacity, y: line1Y }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Abhijit Zende</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Lead AI Engineer
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: line2Opacity, x: line2X }}
          className="absolute inset-0 z-10 flex items-center justify-start px-8 md:px-20"
        >
          <p className={`${styles.heroSubText} text-white max-w-xl`}>
            I build <span className="text-[#915EFF]">GenAI</span> &{" "}
            <span className="text-[#915EFF]">Agentic AI</span> systems.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: line3Opacity, x: line3X }}
          className="absolute inset-0 z-10 flex items-center justify-end px-8 md:px-20 text-right"
        >
          <p className={`${styles.heroSubText} text-white max-w-xl`}>
            Bridging <span className="text-[#915EFF]">AI</span> and{" "}
            <span className="text-[#915EFF]">engineering</span>.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute xs:bottom-10 bottom-16 w-full flex justify-center items-center z-10"
        >
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollyHero;
