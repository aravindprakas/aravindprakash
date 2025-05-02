import { useRef } from "react";
import { motion } from "framer-motion";
import skills from "../../data/skills.jsx";

export default function SkillsShowcase() {
  const containerRef = useRef(null);
  return (
    <section ref={containerRef} className="py-16 px-6 text-center bg-black">
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 tracking-wider">
        A versatile developer skilled in a diverse set of technologies aimed at
        building modern, high-performing apps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-19 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: 30 }}
            transition={{ delay: index * 0.1, duration: 0.35 }}
            viewport={{ once: true, amount: 0.3 }}
            className={`${skill.bg} p-6 text-left rounded-2xl shadow-lg flex items-center h-60`}
          >
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-white/20 rounded-lg">{skill.icon}</div>
              <div>
                <h3 className="text-xl tracking-wide text-white">
                  {skill.title}
                </h3>
                <p className="text-white/80 mt-2 tracking-wide">{skill.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
