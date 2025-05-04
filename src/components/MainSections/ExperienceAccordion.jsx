import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useState, useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full h-screen mx-auto bg-black text-gray-300 font-serif p-4 mt-20">
      <p className="uppercase text-xl sm:text-2xl tracking-widest mb-8 text-center sm:text-left">
        Experience
      </p>
      {projects.map((project) => (
        <div
          key={project.id}
          className="border-t border-b border-gray-700 py-4"
        >
          <div
            onClick={() => toggleAccordion(project.id)}
            className="flex flex-col md:flex-row md:justify-between md:items-center cursor-pointer transition duration-300 ease-in p-4 rounded-lg"
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <span className="text-sm md:text-base">{`0${project.id}`}</span>
              <motion.span
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-3xl md:text-8xl"
              >
                {project.name}
              </motion.span>
              <motion.span
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }} className="text-base md:text-lg text-gray-400">
                {project.designation}
              </motion.span>
            </div>
            <motion.span
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }} className="uppercase text-xs md:text-sm tracking-widest mt-2 md:mt-0">
              {project.time}
            </motion.span>
          </div>
          <AnimatePresence>
            {openId === project.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden mt-2 md:mt-4 px-2 md:px-12 text-base md:text-lg text-white/70"
              >
                {project.details}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
