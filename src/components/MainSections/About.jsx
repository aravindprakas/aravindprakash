import React, { useRef, useEffect, useState, useCallback } from "react";
import aboutMe from "../../data/about";
import wheel from "../../assets/ring.jpg";

function About() {
  const targetRef = useRef(null);
  const frame = useRef(null);
  const scrollProgressRef = useRef(0);
  const [, setRender] = useState(0);
  const [inView, setInView] = useState(false);

  // Lazy load check using Intersection Observer
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll tracking, only update when in view
  const handleScroll = useCallback(() => {
    if (!targetRef.current || !inView) return;
    const element = targetRef.current;
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const elementTop = element.offsetTop;
    const totalScrollLength = element.offsetHeight - windowHeight;
    let progress = (scrollTop - elementTop) / totalScrollLength;
    progress = Math.min(Math.max(progress, 0), 1);
    scrollProgressRef.current = progress;

    if (!frame.current) {
      frame.current = requestAnimationFrame(() => {
        setRender((r) => r + 1);
        frame.current = null;
      });
    }
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [handleScroll, inView]);

  const lerp = (start, end, t) => start + (end - start) * t;
  const progress = scrollProgressRef.current;
  const xValue = lerp(40, -40, progress);
  const rotateValue = lerp(160, 0, progress);
  const blurValue = lerp(0, 8, progress);
  const cardYValue = lerp(0, 20, progress);
  const visibleCards = React.useMemo(() => aboutMe.slice(0, 5), []);

  return (
    <div ref={targetRef} className="relative" style={{ height: "300vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black"
        style={{ position: "sticky", top: 0 }}
      >
        {/* Lazy loaded background image */}
        <img
          src={wheel}
          loading="lazy"
          alt="background wheel"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            transform: `rotate(${rotateValue}deg)`,
            filter: `blur(${blurValue}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-black opacity-50 z-0"
          style={{ pointerEvents: "none" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-12">
          {/* Only render cards if section is in/near viewport */}
          {inView && (
            <div
              className="flex min-w-[150%] justify-around will-change-transform gap-6"
              style={{
                transform: `translateX(${xValue}%) translateY(${cardYValue}%)`,
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

export default About;
