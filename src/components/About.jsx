import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
import aboutMe from "../data/about";

function About() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <div ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen bg-[#244550] flex items-center overflow-hidden justify-center">
        <h1 className="text-white top-0 bg-center">About me</h1>
        <motion.div style={{ x }} className="flex justify-around">
          {aboutMe.map((d) => (
            <div className="w-100 h-100 flex items-center mr-24 rounded-3xl p-5  bg-black/50 backdrop-blur-md">
              <p className="text-white  p-3 text-2xl">{d}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default About;
