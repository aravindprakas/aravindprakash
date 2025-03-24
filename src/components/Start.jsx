import "../style/Start.css";
import React, { useState, useEffect } from "react";
import useLenis from "./useLenis.jsx";

function StartingState (){

  useLenis();

  const [scale, setScale] = useState(1);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setScale(1 + scrollY / 5);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [scrollYValue, setScrollYValue] = useState(0);

  useEffect(() => {
    const handleScrollY = () => {
      setScrollYValue(window.scrollY);
    };

    window.addEventListener("scroll", handleScrollY);
    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  // const opacity = Math.max(0, 1 - scrollYValue / 550);

  return (
    <div className="Container">
      <div className="Sticky-Symbol">
        <div
          className="Code-symbol"
          style={{
            // opacity: opacity,
            transition: "opacity 0.2s ease",
            transform: `scale(${scale})`,
          }}
        >
          {"Hi"}
        </div>
      </div>
    </div>
  );
};

export default StartingState;
