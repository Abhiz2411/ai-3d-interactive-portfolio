import { useEffect, useRef, useState } from "react";

// Defers mounting heavy children (WebGL canvases, Spline scenes) until the
// wrapper is about to scroll into view, so they don't compete with the hero
// for CPU/GPU/network on first load. The wrapper keeps its size so mounting
// doesn't shift layout.
const LazyMount = ({
  children,
  rootMargin = "600px 0px",
  className,
  style,
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || mounted) return;
    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {mounted ? children : null}
    </div>
  );
};

export default LazyMount;
