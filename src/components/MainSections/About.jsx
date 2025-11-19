import React, { useRef, useEffect, useState } from "react";
import aboutMe from "../../data/about";
import wheel from "../../assets/ring.jpg";

/**
 * useScrollProgressExact
 * - Computes progress = (scrollTop - elementTop) / (elementHeight - windowHeight)
 * - Caches element metrics and updates them on resize / via ResizeObserver
 * - Uses requestAnimationFrame to avoid work on every scroll event
 * - Clamps progress to [0,1] and handles cases where elementHeight <= windowHeight
 */
function useScrollProgressExact(targetRef) {
  const [progress, setProgress] = useState(0);   // 0..1
  const [inView, setInView] = useState(false);
  const metricsRef = useRef({
    elementTop: 0,
    elementHeight: 0,
    totalScrollLength: 1, // avoid div-by-zero
  });
  const tickingRef = useRef(false);
  const rafRef = useRef(null);

  // update metrics (absolute elementTop and height)
  const updateMetrics = () => {
    const el = targetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const elementTop = rect.top + scrollTop;
    const elementHeight = el.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollLength = Math.max(elementHeight - windowHeight, 0);

    metricsRef.current = { elementTop, elementHeight, totalScrollLength, windowHeight };
  };

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    updateMetrics();

    // keep metrics fresh when element or viewport changes
    let ro;
    try {
      ro = new ResizeObserver(() => {
        updateMetrics();
        // if size changed while in viewport, run a measurement frame so progress updates immediately
        if (!tickingRef.current) {
          tickingRef.current = true;
          rafRef.current = window.requestAnimationFrame(() => {
            tick();
            tickingRef.current = false;
          });
        }
      });
      ro.observe(el);
    } catch (e) {
      // ResizeObserver may not be available in some envs — that's okay
    }

    const handleResize = () => {
      updateMetrics();
      // force an immediate recompute
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = window.requestAnimationFrame(() => {
          tick();
          tickingRef.current = false;
        });
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // core tick: compute progress using cached metrics
    const tick = () => {
      const el2 = targetRef.current;
      if (!el2) return;
      const scrollTop = window.scrollY || window.pageYOffset;
      const { elementTop, elementHeight, totalScrollLength, windowHeight } = metricsRef.current;

      // determine inView: simple check whether any part intersects viewport
      const rect = el2.getBoundingClientRect();
      const isInView = rect.bottom > 0 && rect.top < windowHeight;
      setInView(isInView);

      // compute progress using original formula (safe)
      let p = 0;
      if (totalScrollLength > 0) {
        p = (scrollTop - elementTop) / totalScrollLength;
        // If elementTop is when element top aligns to document top:
        // clamp to 0..1
        p = Math.min(Math.max(p, 0), 1);
      } else {
        // element fits within viewport (or shorter). define logic:
        // when element top has scrolled up past viewport top => 1, else 0
        // or you can use a smoother mapping using rect:
        // use rect.top relative to windowHeight to get a smooth 0..1
        const moved = (windowHeight - rect.top) / (windowHeight + elementHeight);
        p = Math.min(Math.max(moved, 0), 1);
      }

      setProgress(p);
    };

    // we need tick accessible in outer scope; define wrapper to avoid hoisting issues
    function tickWrapper() {
      // call the internal tick defined above (closure binds)
      // but ensure react state updates are throttled via rAF
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = window.requestAnimationFrame(() => {
          tick();
          tickingRef.current = false;
        });
      }
    }

    // attach events
    window.addEventListener("scroll", tickWrapper, { passive: true });
    window.addEventListener("touchmove", tickWrapper, { passive: true });
    // perform initial tick
    tick();

    return () => {
      window.removeEventListener("scroll", tickWrapper);
      window.removeEventListener("touchmove", tickWrapper);
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetRef]);

  // one more effect to update metrics when mount and when DOM changes that may affect layout
  useEffect(() => {
    updateMetrics();
    // also schedule a tick just in case
    const id = window.requestAnimationFrame(() => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const moved = (windowH - rect.top) / (windowH + el.offsetHeight);
      setProgress((prev) => Math.min(Math.max(moved, 0), 1));
      setInView(rect.bottom > 0 && rect.top < windowH);
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, inView };
}

export default function About() {
  const targetRef = useRef(null);
  const { progress: scrollProgress, inView } = useScrollProgressExact(targetRef);

  const lerp = (start, end, t) => start + (end - start) * t;

  const xValue = lerp(40, -40, scrollProgress);
  const rotateValue = lerp(160, 0, scrollProgress);
  const blurValue = lerp(0, 8, scrollProgress);
  const visibleCards = aboutMe;

  return (
    <div ref={targetRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center bg-black overflow-hidden">
        <img
          src={wheel}
          loading="lazy"
          alt="background wheel"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            transform: `rotate(${rotateValue}deg)`,
            filter: `blur(${blurValue}px)`,
            transition: "transform 0.15s linear, filter 0.15s linear",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-12">
          {inView && (
            <div
              className="flex min-w-[150%] justify-around will-change-transform gap-6"
              style={{
                transform: `translateX(${xValue}%)`,
                transition: "transform 0.15s linear",
              }}
            >
              {visibleCards.map((text, index) => (
                <div
                  key={index}
                  className="w-[250px] md:w-[350px] flex-shrink-0 rounded-4xl p-5 bg-black/30 backdrop-blur-lg border border-white/20"
                >
                  <p className="text-gray-300 text-xl md:text-2xl p-3 tracking-wide leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
