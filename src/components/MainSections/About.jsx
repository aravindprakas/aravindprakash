import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import React, { useRef } from "react";
import aboutMe from "../../data/about";
import wheel from "../../assets/ring.jpg";

function About() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const x = useTransform(smoothScroll, [0, 1], ["40%", "-40%"]);
  const rotate = useTransform(smoothScroll, [0, 1], ["160deg", "0deg"]);
  const blur = useTransform(smoothScroll, [0, 1], ["0px", "8px"]);
  const cardY = useTransform(smoothScroll, [0, 1], ["0%", "20%"]);

  const visibleCards = aboutMe.slice(0, 5);

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
        
        <motion.img
          src={wheel}
          alt="background wheel"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            rotate,
            filter: blur,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-12">
          <motion.div
            style={{ x, y: cardY }}
            className="flex min-w-[150%] justify-around will-change-transform gap-6"
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
