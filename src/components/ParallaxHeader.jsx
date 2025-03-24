import React, { useRef } from "react";
import background from "../assets/ParallaxHeader/background-new.png";
import foreground from "../assets/ParallaxHeader/foreground-new.png";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxHeader() {

  const ref = useRef(null);  


  const {scrollYProgress} = useScroll({
    target: ref,
    offset:['start start','end start'],
})

const backgroundY= useTransform(scrollYProgress, [0,1],['0%' , '100%']);
const textY= useTransform(scrollYProgress, [0,1],['0%' , '200%']);

console.log(scrollYProgress);


  return (
    <main  id="home"  className="w-full h-screen overflow-hidden relative grid place-items-center bg-[#244550]">
      <motion.h1 className="z-1 font-bold text-7xl md:text-9xl relative text-white bottom-7" style={{y:textY}}> 
        Aravind Prakash{" "}
      </motion.h1>
      <motion.div ref={ref} className="absolute z-0 inset-0 left-0" style={{y:backgroundY}}>
        <img src={background} alt="Background" />
      </motion.div>
      <div className="absolute z-2 w-screen">
        <img src={foreground} alt="Foreground" />
      </div>
    </main>
  );
}
