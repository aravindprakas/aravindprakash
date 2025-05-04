import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import aboutMe from "../../data/about";
import wheel from "../../assets/ring.jpg";

function About() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["160deg", "0deg"]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            rotate,
            filter:blur,
            backgroundImage: `url(${wheel})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">

          <motion.div style={{ x}} className="flex min-w-[150%] justify-around">
            {aboutMe.map((d, index) => (
              <div
                key={index}
                className="w-[250px] md:w-[350px] h-auto flex-shrink-0 items-center mr-0 rounded-4xl p-5 bg-black/20 backdrop-blur-lg border border-white/30"
              >
                <p className="text-gray-300 p-3 text-2xl tracking-wide">{d}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
