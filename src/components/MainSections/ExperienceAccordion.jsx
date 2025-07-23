import React, { useRef, useState, useEffect } from "react";

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
      { threshold, rootMargin }
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
const projects = [
  {
    id: 2,
    name: "UST",
    designation: "Software Engineer",
    time: "2023 - Present",
    details:
      "As a Software Engineer at UST, I have been instrumental in developing scalable and high-performance web applications using AEM and React.js. Led the delivery of over 25 custom AEM components with a 96% reusability rate, significantly reducing development time across multiple projects. Consistently maintained a 99% responsive design success rate, ensuring seamless user experiences across devices. Collaborated cross-functionally with design, QA, and backend teams to achieve a 95% project completion rate, meeting all deadlines and client requirements. Also contributed to code reviews, performance optimization, and implementation of CI/CD pipelines, improving overall code quality and deployment efficiency.",
  },
  {
    id: 1,
    name: "Moonraft Innovations Lab",
    designation: "Developer Intern",
    time: "2022 - 2023",
    details:
      "During my internship at Moonraft Innovations Lab, I worked as an AEM Content Author and React.js Developer, gaining hands-on experience in both content management and front-end development. Played a key role in several large-scale client projects, achieving a 97% task completion rate with 100% on-time content delivery. Focused on maintaining 98% design consistency across all deliverables, ensuring pixel-perfect implementations aligned with UX specifications. Successfully delivered 90% of UI components ahead of schedule by proactively collaborating with senior developers, improving project velocity. Additionally, I contributed to optimizing authoring workflows, enhancing content editor usability, and improving internal documentation to support future projects.",
  },
];

export default function ExperienceAccordion() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="w-full min-h-screen bg-black text-gray-300 font-serif p-4 pt-20">
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
