import { useEffect, useRef, useMemo } from "react";

function ParallaxHeader({ id }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  const videoSources = [
    "/videos/overlay-one.mp4",
    "/videos/overlay-two.mp4",
    "/videos/overlay-three.mp4",
    "/videos/overlay-four.mp4",
  ];

  // Select ONE video per mount (stable)
  const selectedVideo = useMemo(() => {
    return videoSources[Math.floor(Math.random() * videoSources.length)];
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.transition = "none";
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const progress = Math.min(Math.max(scrollY / vh, 0), 1);

      if (textRef.current) {
        const yMove = progress * (vh * 0.5);
        textRef.current.style.transform = `translateY(-${yMove}px)`;
      }

      if (videoRef.current) {
        const opacity = Math.max(1 - progress * 4, 0);
        videoRef.current.style.opacity = opacity;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id={id} ref={containerRef} className="relative w-full h-screen">
      <header
        className="
          sticky top-0
          w-full h-screen
          overflow-hidden
          bg-black
          flex justify-center
          items-center            /* mobile center */
          md:items-end            /* desktop bottom */
          pb-0
          md:pb-24 lg:pb-32
        "
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={selectedVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Text Layer */}
        <h1
          ref={textRef}
          className="
            relative z-10
            text-white/90
            leading-[0.85]
            tracking-tight
            text-center
            px-4
            text-[22vw] sm:text-[16vw] md:text-[13vw] lg:text-[13vw]
            mix-blend-difference
            will-change-transform
          "
        >
          <span style={{ fontFamily: "'professional', sans-serif" }}>
            Aravind
          </span>{" "}
          <span style={{ fontFamily: "'Apparel', sans-serif" }}>
            Prakash
          </span>
        </h1>
      </header>
    </div>
  );
}

export default ParallaxHeader;
