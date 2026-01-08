import {
  useState,
  useRef,
  createContext,
  useContext,
  Children,
  isValidElement,
} from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../../assets/AG.svg";

// --- Context for Scrolling ---
const ScrollContext = createContext();

function useScroll() {
  return useContext(ScrollContext);
}

// --- Main Layout Component ---
export default function AGLayout({ children }) {
  // Refs for scrolling to specific sections
  const sectionsRef = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  const scrollTo = (key) => {
    const ref = sectionsRef[key];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Wrap children in sections with refs so the navbar can find them
  const wrappedSections = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const key = child.props["data-key"];
      return (
        <section key={key} id={key} ref={sectionsRef[key]}>
          {child}
        </section>
      );
    }
    return null;
  });

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      <div className="relative w-full">
        {/* Navbar is now always visible */}
        <NavBar />
        
        {/* Main Content */}
        <main className="w-full scroll-smooth">
          {wrappedSections}
        </main>
      </div>
    </ScrollContext.Provider>
  );
}

// --- NavBar Components ---

export function NavBar() {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollTo } = useScroll();

  return (
    <nav className="z-40 fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl rounded-full bg-black/30 backdrop-blur-md p-2">
      <div className="flex items-center justify-between">
        {/* Logo - Scrolls to Home */}
        <a onClick={() => scrollTo("home")}>
          <motion.img
            src={logo}
            className="w-14 md:w-20 px-2 py-1 cursor-pointer"
            alt="AG"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </a>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className={`fixed inset-0 h-screen w-full flex flex-col items-center justify-center z-50 bg-black/90 gap-10 md:hidden`}
          >
            {/* Close Button for Mobile Menu */}
            <div className="absolute top-8 right-8">
               <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={32} color="white" />
               </button>
            </div>

            {["about", "skills", "experience", "contact"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollTo(tag);
                }}
                className="text-white text-3xl font-semibold tracking-wider uppercase"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Hamburger Button (Mobile Only) */}
        <div className="md:hidden pr-3">
          <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
            {isMobileMenuOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </button>
        </div>

        {/* Desktop Links */}
        <ul
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
          className="relative hidden md:flex"
        >
          <Cursor position={position} />
          <Tab tag="about" setPosition={setPosition}>
            <p className="tracking-wider">About</p>
          </Tab>
          <Tab tag="skills" setPosition={setPosition}>
            <p className="tracking-wider">Skills</p>
          </Tab>
          <Tab tag="experience" setPosition={setPosition}>
            <p className="tracking-wider">Experience</p>
          </Tab>
          <Tab tag="contact" setPosition={setPosition}>
            <p className="tracking-wider">Contact</p>
          </Tab>
        </ul>
      </div>
    </nav>
  );
}

const Cursor = ({ position }) => (
  <motion.li
    initial={{ left: 0, width: 0, opacity: 0 }}
    animate={{
      left: position.left,
      width: position.width,
      opacity: position.opacity,
    }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="hidden md:inline-block absolute h-7 w-23 rounded-full bg-white md:h-12 top-2 z-0"
  />
);

const Tab = ({ children, setPosition, tag }) => {
  const ref = useRef(null);
  const { scrollTo } = useScroll();
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        }
      }}
      onClick={() => scrollTo(tag)}
      className="relative z-10 px-3 py-1.5 uppercase text-white/70 mix-blend-difference md:px-5 rounded-full md:py-5 md:text-base cursor-pointer"
    >
      {children}
    </li>
  );
};