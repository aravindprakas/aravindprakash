import "./style/App.css";
import Lenis from "@studio-freight/lenis";
import ParallaxHeader from "./components/MainSections/ParallaxHeader.jsx";
import { useEffect } from "react";
import SkillsShowcase from "./components/MainSections/Skills.jsx";
import QualitiesScroller from "./components/SubSections/QualitiesScroller.jsx";
import ExperienceAccordion from "./components/MainSections/ExperienceAccordion.jsx";
import Cursor from "./components/SubSections/Cursor.jsx";
import ContactSection from "./components/MainSections/ContactUs.jsx";
import ChatBubble from "./components/SubSections/ChatBubble.jsx";
import About from "./components/MainSections/About.jsx";
import NavBar from "./components/SubSections/NavBar.jsx";

function App() {
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.07, // lower is slower/smoother, try 0.07 for slow
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const disableTabNavigation = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", disableTabNavigation);

    return () => {
      document.removeEventListener("keydown", disableTabNavigation);
    };
  }, []);

  return (
    <div className="App">
      <Cursor />
      <ChatBubble />
      <NavBar />
      <ParallaxHeader id="home" />
      <About id="about" />
      <SkillsShowcase id="skills" />
      <QualitiesScroller />
      <ExperienceAccordion id="experience" />
      <ContactSection id="contact" />
    </div>
  );
}

export default App;
