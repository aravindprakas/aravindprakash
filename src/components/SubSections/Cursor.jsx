import { useEffect } from "react";
import { motion, useSpring, useMotionValue, useAnimation } from "framer-motion";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const smoothY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const controls = useAnimation();

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 12); // adjust 12 → half circle size
      mouseY.set(e.clientY - 12);
    };

    const click = () => {
      controls.start({
        scale: [1, 2, 1],
        opacity: [1, 0.5, 1],
        transition: { duration: 0.5, ease: "easeOut" },
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
    };
  }, [mouseX, mouseY, controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        x: smoothX,
        y: smoothY,
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: "white",
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
      }}
      whileHover={{ scale: 1.5 }}
      className="mix-blend-difference hidden lg:block"
    />
  );
}
