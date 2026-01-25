import React, { useRef, useState, useEffect } from "react";
import projects from "../../data/Experience";

// --- Simple Intersection Observer hook ---
function useInView({ threshold = 0.18, rootMargin = "-60px" } = {}) {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

// --- Replace this arrow SVG for your cursor if you want it back ---
// const rightArrowCursor =
//   "url('data:image/svg+xml;utf8,<svg fill=\"white\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 4l8 8-8 8\" stroke=\"white\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>') 12 12, pointer";

// --- Experience Data ---

export default function ExperienceAccordion({ id }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div
      id={id}
      className="w-full py-30 md:py-50 bg-black text-gray-300 font-serif p-4 pt-20"
    >
      <p className="uppercase text-xl sm:text-2xl tracking-widest mb-8 text-center sm:text-left">
        Experience
      </p>
      {projects.map((project) => {
        const [ref, inView] = useInView();
        return (
          <div
            ref={ref}
            key={project.id}
            className={`
              border-t border-b border-gray-700 py-4
              transition-all duration-700 ease-out
              ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }
            `}
            style={{
              willChange: "opacity, transform",
            }}
          >
            <div
              onClick={() =>
                setOpenId(openId === project.id ? null : project.id)
              }
              // style={{ cursor: rightArrowCursor }}
              className="flex flex-col md:flex-row md:justify-between md:items-center cursor-pointer transition duration-300 ease-in p-4 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 items-center text-center md:text-left flex-1">
                <span className="text-sm md:text-base">{`0${project.id}`}</span>
                <span
                  className="font-extrabold text-2xl sm:text-4xl md:text-6xl lg:text-8xl"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {project.name}
                </span>
                <span className="text-base md:text-lg text-gray-400">
                  {project.designation}
                </span>
              </div>
              <span className="uppercase text-xs md:text-sm tracking-widest mt-2 md:mt-0 text-center md:text-left md:w-auto">
                {project.time}
              </span>
              <span className="flex justify-center items-center mt-2 md:m-2 md:pt-1 md:flex-none">
                <span
                  className={`
    flex justify-center items-center mt-5 md:m-2 md:flex-none
    transition-transform duration-500 ease-out
    ${openId === project.id ? "rotate-180" : "rotate-0"}
  `}
                >
                  ^
                </span>
              </span>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out
                ${
                  openId === project.id
                    ? "max-h-[600px] opacity-100 mt-2 md:mt-4 px-2 md:px-12"
                    : "max-h-0 opacity-0"
                }
                text-base md:text-lg text-white/70`}
              style={{
                pointerEvents: openId === project.id ? "auto" : "none",
              }}
            >
              {project.details}
            </div>
          </div>
        );
      })}
    </div>
  );
}
