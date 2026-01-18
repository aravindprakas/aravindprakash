import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const update = () => {
      x.set(mouse.current.x - 12);
      y.set(mouse.current.y - 12);
      rafId.current = requestAnimationFrame(update);
    };

    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const click = () => {
      controls.start({
        scale: [1, 2, 1],
        opacity: [1, 0.5, 1],
        transition: { duration: 0.4, ease: "easeOut" },
      });
    };

    rafId.current = requestAnimationFrame(update);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
    };
  }, [controls, x, y]);

  return (
    <motion.div
      animate={controls}
      style={{
        x,
        y,
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "white",
        position: "fixed",
        pointerEvents: "none",
        zIndex: 99,
      }}
      className="mix-blend-difference hidden lg:block"
    />
  );
}
