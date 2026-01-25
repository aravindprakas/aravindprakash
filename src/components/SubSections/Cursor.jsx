import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimation, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useSpring(0, { damping: 30, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 200 });
  const controls = useAnimation();

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleClick = () => {
      controls.start({
        scale: [1, 2, 1],
        opacity: [1, 0.5, 1],
        transition: { duration: 0.4, ease: "easeOut" },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleClick);
    };
  }, [cursorX, cursorY, controls]);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>
      <motion.div
        animate={controls}
        style={{
          x: cursorX,
          y: cursorY,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "white",
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9999,
          top: 0,
          left: 0,
        }}
        className="mix-blend-difference hidden lg:block"
      />
    </>
  );
}