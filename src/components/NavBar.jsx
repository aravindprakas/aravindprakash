import { useRef, useState } from "react";
import logo from "../assets/AG.svg";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // for hamburger icon

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
          <img src={logo} className="w-14 md:w-20 px-2 py-1" alt="AG" />
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

export default NavBar;