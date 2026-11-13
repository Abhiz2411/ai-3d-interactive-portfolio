import { useEffect, useRef, useState } from "react";

// Reveals a section once and keeps it revealed. A tall section (e.g. a long
// project grid) can never reach a fixed visible-ratio threshold, and toggling
// back to "hidden" when it scrolls out made content vanish while scrolling up.
const useSectionObserver = ({ threshold = 0.3 } = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleEnough =
          entry.intersectionRatio >= threshold ||
          entry.intersectionRect.height >= window.innerHeight * 0.3;
        if (entry.isIntersecting && visibleEnough) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.05, 0.1, threshold] }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, amount: threshold };
};

export default useSectionObserver;
