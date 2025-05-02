import React from "react";
import '../../style/QualitiesBanner.css'

const qualities = [
  "Pixel-Perfect UI",
"Algorithmic Thinking",
"AEM Dev Expert",
"React.js Mastery",
"Optimized Performance",
"Clean, Scalable Code",
"Agile Team Player",
"Tech-Savvy Learner",
"UI/UX Precision",
"Consistent Delivery",
];

const QualitiesBanner = () => {
  return (
    <div className="relative w-full h-[40vh] overflow-hidden bg-black flex items-center">
      <div className="absolute left-0 top-0 h-full w-50 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>

      <div className="absolute right-0 top-0 h-full w-50 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="flex animate-scroll hover:animate-slowScroll">
        <div className="whitespace-nowrap font-beautiful text-white text-4xl md:text-6xl uppercase">
          {qualities.map((item, idx) => (
            <span key={idx} className="mx-10 inline-block tracking-wide">
              {item}
            </span>
          ))}
        </div>

        <div className="whitespace-nowrap text-white text-4xl md:text-6xl uppercase">
          {qualities.map((item, idx) => (
            <span key={`dup-${idx}`} className="mx-10 inline-block tracking-wide">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QualitiesBanner;
