import { useEffect, useRef, useMemo } from "react";
import Me from "../../assets/Aravind.jpg";

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function About({ id }) {
  const containerRef = useRef(null);

  const TEXT_PARTS = [
    {
      text: "I am Aravind",
      style: {
        fontFamily: "'professional', sans-serif",
        fontWeight: 400,
      },
    },
    {
      text: " Prakash, ",
      style: {
        fontFamily: "'Apparel', sans-serif",
      },
    },
    {
      text: "a frontend developer crafting web experiences that move, respond, and connect.",
      style: {
        fontFamily: "'professional', sans-serif",
        fontWeight: 400,
      },
    },
  ];

  const splitText = useMemo(() => {
    return TEXT_PARTS.flatMap((part, partIndex) =>
      part.text.split(/(\s+)/).map((chunk, index) => {
        if (/^\s+$/.test(chunk)) return chunk;

        return (
          <span
            key={`${partIndex}-${index}`}
            className="word inline-block"
            style={{
              ...part.style,
              willChange: "opacity, transform, filter",
            }}
          >
            {chunk}
          </span>
        );
      })
    );
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = Array.from(el.querySelectorAll(".word"));
    if (!words.length) return;

    const baseOpacity = 0;
    const translateY = 12;
    const blurPx = 3; // controlled blur
    const staggerAmount = 0.6;

    const totalWords = words.length;
    const perWordOffset = staggerAmount / totalWords;

    let start = 0;
    let range = 1;
    let frameId;

    const measure = () => {
      const vh = window.innerHeight;
      start = vh * 0.5;
      const end = vh * 0.1;
      range = start - end;
    };

    const initStyles = () => {
      words.forEach((w) => {
        w.style.opacity = baseOpacity;
        w.style.transform = `translateY(${translateY}px)`;
        w.style.filter = `blur(${blurPx}px)`;
      });
    };

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Skip work if fully offscreen
      if (rect.bottom < 0 || rect.top > vh) return;

      let progress = clamp((start - rect.top) / range, 0, 1);

      words.forEach((wordEl, index) => {
        const wordStart = index * perWordOffset;
        const wordEnd = wordStart + (1 - staggerAmount);

        let wp = clamp(
          (progress - wordStart) / (wordEnd - wordStart),
          0,
          1
        );

        // Blur dies early – not tied to full scroll
        const blur = blurPx * Math.max(0, 1 - wp * 2);

        wordEl.style.opacity = wp;
        wordEl.style.transform = `translateY(${(1 - wp) * translateY}px)`;
        wordEl.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    measure();
    initStyles();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div id={id} className="min-h-[100dvh] bg-black">
      <section className="bg-black px-8 md:px-16 py-16 relative min-h-[100dvh]">
        <div className="max-w-7xl mx-auto">
          <h2 ref={containerRef} className="relative">
            {/* Floating image */}
            <div
              className="
                w-full h-72 mb-8 overflow-hidden
                md:float-left md:w-80 md:h-80 md:mr-12 md:mt-[2.2em]
                lg:w-96 lg:h-96
              "
            >
              <img
                src={Me}
                alt="Portrait"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Scroll reveal text */}
            <p className="text-4xl md:text-5xl lg:text-7xl leading-tight text-white">
              {splitText}
            </p>
          </h2>
        </div>

        <div className="clear-both" />
      </section>
    </div>
  );
}
