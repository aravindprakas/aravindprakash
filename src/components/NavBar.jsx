import { useRef, useState } from "react";
import logo from "../assets/AG.svg";
import { motion } from "framer-motion";

function NavBar() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0 ,
  });
  return (
    <nav className="flex mx-auto w-fit rounded-full border-black bg-black/50 backdrop-blur-md p-1 fixed text-white overflow-hidden z-50 left-120 top-10">
      <a href="#home">
        <img src={logo}  className="px-1 py-1 md:px-5 md:py-5 w-20 relative" alt="AG" />
      </a>
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="flex relative"
      >
        <Cursor position={position} />
        <Tab tag={"#about"} setPosition={setPosition}>
          About
        </Tab>
        <Tab tag={"#interest"} setPosition={setPosition}>
          Interest
        </Tab>
        <Tab tag={"#skills"} setPosition={setPosition}>
          Skills
        </Tab>
        <Tab tag={"#contact-us"} setPosition={setPosition}>
          Contact me
        </Tab>
      </ul>
    </nav>
  );
}

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 w-23 rounded-full bg-white md:h-12 top-2"
    />
  );
};

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
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-5 md:text-base "
    >
      <a href={tag}>{children}</a>
    </li>
  );
};

export default NavBar;
