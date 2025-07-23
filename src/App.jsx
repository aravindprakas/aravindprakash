import "./style/App.css";
import Lenis from "@studio-freight/lenis";
import ParallaxHeader from "./components/MainSections/ParallaxHeader.jsx";
import About from "./components/MainSections/About.jsx";
import { useEffect } from "react";
import SkillsShowcase from "./components/MainSections/Skills.jsx";
import FourWords from "./components/SubSections/FourWords.jsx";
import QualitiesScroller from "./components/SubSections/QualitiesScroller.jsx";
import AGLoadingScreen from "./components/MainSections/Loader.jsx";
import ExperienceAccordion from "./components/MainSections/ExperienceAccordion.jsx";
import Cursor from "./components/SubSections/Cursor.jsx";
import ContactSection from "./components/MainSections/ContactUs.jsx";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.02, // lower is slower/smoother, try 0.07 for slow
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
      <AGLoadingScreen>
        <ParallaxHeader data-key={"home"} />
        <About data-key={"about"} />
        <FourWords />
        <SkillsShowcase data-key={"skills"} />
        <QualitiesScroller data-key={"qualities"} />
        <ExperienceAccordion data-key={"experience"} />
        <ContactSection data-key={"contact"} />
      </AGLoadingScreen>
    </div>
  );
}

export default App;
