import { useEffect, useRef } from "react";
import Four from "../../assets/overlay-four.mp4";

function ParallaxHeader({id}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Setup: Ensure no CSS transitions interfere with our scroll physics
    if (textRef.current) {
      textRef.current.style.transition = "none";
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Calculate progress (0 to 1)
      const progress = Math.min(Math.max(scrollY / vh, 0), 1);

      if (textRef.current) {
        // MOVEMENT:
        // We calculate 50% of the screen height in pixels.
        // If you want it higher, increase 0.5 to 0.6
        const yMove = progress * (vh * 0.5);
        textRef.current.style.transform = `translateY(-${yMove}px)`;

        // FADE:
        // 1 - progress = Fades to 0 opacity at the end.
        // 1 - (progress * 0.5) = Fades to 0.5 opacity (semi-transparent).
        const opacity = 1 - progress * 4; // "pow" makes the fade start slow and end fast
        videoRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id={id} ref={containerRef} className="relative w-full h-[100vh]">
      {/* 2. The Sticky Viewport: Stays locked in place while we scroll the track */}
      <header
        className="
          sticky top-0 
          w-full h-screen 
          overflow-hidden 
          bg-black 
          flex items-end justify-center 
          pb-12 sm:pb-24 md:pb-32
        "
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={Four}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Text Layer */}
        <h1
          ref={textRef}
          className="
              relative z-10
              text-white/90
              leading-[0.8]
              tracking-tight
              text-center
              px-4
              text-[21vw] sm:text-[15vw] md:text-[13vw] lg:text-[13vw]
              mix-blend-difference
              will-change-transform
          "
        >
          <span style={{ fontFamily: "'professional', sans-serif" }}>
            Aravind
          </span>{" "}
          <span
            style={{ fontFamily: "'Apparel', sans-serif" }}
            className="font-Apparel"
          >
            Prakash
          </span>
        </h1>
      </header>
    </div>
  );
}

export default ParallaxHeader;
