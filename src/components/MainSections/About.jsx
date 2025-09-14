import React, { useRef, useEffect, useState } from "react";
import aboutMe from "../../data/about";
import wheel from "../../assets/ring.jpg";

function About() {
  const targetRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intersection Observer for lazy rendering
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, []);

  // Throttle scroll updates (simple version)
  useEffect(() => {
    if (!inView) return;
    let ticking = false;

    const handleScroll = () => {
      if (!targetRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const element = targetRef.current;
          const windowHeight = window.innerHeight;
          const scrollTop = window.scrollY || window.pageYOffset;
          const elementTop = element.offsetTop;
          const totalScrollLength = element.offsetHeight - windowHeight;
          let progress = (scrollTop - elementTop) / totalScrollLength;
          progress = Math.min(Math.max(progress, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView]);

  const lerp = (start, end, t) => start + (end - start) * t;
  const xValue = lerp(40, -40, scrollProgress);
  const rotateValue = lerp(160, 0, scrollProgress);
  const blurValue = lerp(0, 8, scrollProgress);
  // const cardYValue = lerp(0, 20, scrollProgress); translateY(${cardYValue}%)
  const visibleCards = aboutMe.slice(0, 5);

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
            transition: "transform 0.2s linear, filter 0.2s linear",
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-12">
          {inView && (
            <div
              className="flex min-w-[150%] justify-around will-change-transform gap-6"
              style={{
                transform: `translateX(${xValue}%)`,
                transition: "transform 0.2s linear",
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
