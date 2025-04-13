import { useState, useEffect,useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // for hamburger icon
import logo from "../assets/AG.svg"; // Assume this is the NavBar logo

function AGSvg({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 5, opacity: 0, backgroundColor: "#000" }}
      transition={{ duration: 1.2 }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-screen h-screen text-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100%" height="100%" fill="black" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="70"
          fill="white"
          fontFamily="'Brush Script MT', cursive"
        >
          AG
        </text>
      </svg>
    </motion.div>
  );
}

export default function AGLoadingScreen({ children }) {
  const [count, setCount] = useState(1);
  const [showAG, setShowAG] = useState(false);
  const [hideAll, setHideAll] = useState(false);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => setCount((prev) => prev + 1), 20);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowAG(true), 300);
    }
  }, [count]);

  const handleAGComplete = () => {
    setTimeout(() => {
      setHideAll(true);
    }, 1200);
  };

  return (
    <div className="relative w-full h-screen">
      {!hideAll && (
        <div className="w-full h-screen bg-black overflow-hidden absolute inset-0 z-[100]">
          {/* Loader and AG SVG */}
          <div className="w-full h-full flex items-center justify-center z-[100] relative">
            <AnimatePresence>
              {!showAG ? (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-white text-6xl font-mono"
                >
                  {count}%
                </motion.div>
              ) : (
                <AGSvg key="agsvg" onComplete={handleAGComplete} />
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <AnimatePresence>
        {hideAll && (
          <motion.div
            className="w-full h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavBar() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl rounded-full bg-black/30 backdrop-blur-md p-2 border-1 ">
      <div className="flex items-center justify-between">
        <a href="#home">
          <motion.img
            src={logo}
            className="w-14 md:w-20 px-2 py-1"
            alt="AG"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </a>

        <div className="md:hidden pr-3">
          <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <ul
          onMouseLeave={() =>
            setPosition((pv) => ({ ...pv, opacity: 0 }))
          }
          className="relative hidden md:flex"
        >
          <Cursor position={position} />
          <Tab tag={"#about"} setPosition={setPosition}>
            About
          </Tab>
          <Tab tag={"#skills"} setPosition={setPosition}>
            Skills
          </Tab>
          <Tab tag={"#contact-us"} setPosition={setPosition}>
            Contact me
          </Tab>
        </ul>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-4 mt-4 md:hidden p-4"
          >
            <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
            <li><a href="#interest" onClick={() => setIsMobileMenuOpen(false)}>Interest</a></li>
            <li><a href="#skills" onClick={() => setIsMobileMenuOpen(false)}>Skills</a></li>
            <li><a href="#contact-us" onClick={() => setIsMobileMenuOpen(false)}>Contact me</a></li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

const Cursor = ({ position }) => (
  <motion.li
    animate={{
      left: position.left,
      width: position.width,
      opacity: position.opacity,
    }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="absolute z-0 h-7 w-23 rounded-full bg-white md:h-12 top-2"
  />
);

const Tab = ({ children, setPosition, tag }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 px-3 py-1.5 uppercase text-white mix-blend-difference md:px-5 rounded-full md:py-5 md:text-base"
    >
      <a href={tag}>{children}</a>
    </li>
  );
};

export {NavBar};
