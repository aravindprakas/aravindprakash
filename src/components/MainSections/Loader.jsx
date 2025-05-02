  import {
    useState,
    useEffect,
    useRef,
    createContext,
    useContext,
    Children,
    isValidElement,
  } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import { Menu, X } from "lucide-react";
  import logo from "../../assets/AG.svg";

  const ScrollContext = createContext();

  function useScroll() {
    return useContext(ScrollContext);
  }

  function AGSvg({ onComplete }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 5, opacity: 0, backgroundColor: "#000" }}
        transition={{ duration: 0.2 }}
        onAnimationComplete={onComplete}
        className="absolute inset-0 z-[100] flex items-center justify-center bg-black"
      >
      </motion.div>
    );
  }

  export default function AGLoadingScreen({ children }) {
    const [isAppReady, setIsAppReady] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [count, setCount] = useState(1);
    const [showAG, setShowAG] = useState(false);
    const [hideAll, setHideAll] = useState(false);

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

    useEffect(() => {
      window.scrollTo(0, 0);
      const preload = async () => {
        await new Promise((res) => setTimeout(res, 2000));
        setIsAppReady(true);
      };
      preload();
    }, []);

    useEffect(() => {
      document.body.style.overflow = hideAll ? "auto" : "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [hideAll]);

    useEffect(() => {
      if (count < 100) {
        const timer = setTimeout(() => setCount((prev) => prev + 1), 20);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setShowAG(true), 300);
      }
    }, [count]);

    const handleAGComplete = () => {
      setIsAnimationDone(true);
    };

    useEffect(() => {
      if (isAppReady && isAnimationDone) {
        setTimeout(() => {
          setHideAll(true);
        }, 300);
      }
    }, [isAppReady, isAnimationDone]);

    const wrappedSections = Children.map(children, (child) => {
      if (isValidElement(child)) {
        const key = child.props["data-key"];
        return (
          <section key={key} ref={sectionsRef[key]}>
            {child}
          </section>
        );
      }
      return null;
    });

    return (
      <ScrollContext.Provider value={{ scrollTo }}>
        <div className="relative w-full h-screen">
          {!hideAll && (
            <div className="w-full h-screen bg-black overflow-hidden fixed inset-0 z-[9999]">
              <div className="w-full h-full flex items-center justify-center z-[200] relative">
                <AnimatePresence>
                  {!showAG ? (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-white/95 text-6xl font-mono"
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

          {hideAll && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <NavBar />
              <main className="w-full scroll-smooth">{wrappedSections}</main>
            </motion.div>
          )}
        </div>
      </ScrollContext.Provider>
    );
  }

  export function NavBar() {
    const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollTo } = useScroll();

    return (
      <nav className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-xl rounded-full bg-black/30 backdrop-blur-md p-2">
        <div className="flex items-center justify-between">
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

          <div className="md:hidden pr-3">
            <button onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
              {isMobileMenuOpen ? (
                <X size={28} color="white" z={41}/>
              ) : (
                <Menu size={28} color="white" z={41}/>
              )}
            </button>
          </div>

          <ul
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
            className="relative hidden md:flex"
          >
            <Cursor position={position} />
            <Tab tag="about" setPosition={setPosition}>
              About
            </Tab>
            <Tab tag="skills" setPosition={setPosition}>
              Skills
            </Tab>
            <Tab tag="experience" setPosition={setPosition}>
              Experience
            </Tab>
            <Tab tag="contact" setPosition={setPosition}>
              Contact
            </Tab>
          </ul>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-screen w-[100%] overflow-hidden bg-black flex flex-col items-center justify-center gap-10 md:hidden"
            >
              {["about", "skills", "experience", "contact"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    scrollTo(tag);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white text-3xl font-semibold tracking-wide uppercase"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
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
      className="absolute z-0 h-7 w-23 rounded-full bg-white md:h-12 top-2"
    />
  );

  const Tab = ({ children, setPosition, tag }) => {
    const ref = useRef(null);
    const { scrollTo } = useScroll();
    return (
      <li
        ref={ref}
        onMouseEnter={() => {
          const { width } = ref.current.getBoundingClientRect();
          setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        }}
        onClick={() => scrollTo(tag)}
        className="relative z-10 px-3 py-1.5 uppercase text-white/70 mix-blend-difference md:px-5 rounded-full md:py-5 md:text-base cursor-pointer"
      >
        {children}
      </li>
    );
  };
