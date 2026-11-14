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
  // Free GPU memory: unmount again once scrolled well away (phones crash
  // when several WebGL contexts stay alive at once).
  unmountWhenFar = false,
  onUnmount,
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          if (!unmountWhenFar) observer.disconnect();
        } else if (unmountWhenFar) {
          setMounted(false);
          if (onUnmount) onUnmount();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, unmountWhenFar]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className={className} style={style}>
      {mounted ? children : null}
    </div>
  );
};

export default LazyMount;
