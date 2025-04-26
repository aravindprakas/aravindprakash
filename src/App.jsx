import "./style/App.css";
import ParallaxHeader from "./components/ParallaxHeader.jsx";
// import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import { useEffect } from "react";
import SkillsShowcase from "./components/Skills.jsx";
import FourWords from "./components/FourWords.jsx";
import QualitiesScroller from "./components/QualitiesScroller.jsx";
import NavBar from "./Unused/NavBar.jsx";

function App() {
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
        <ParallaxHeader key={"home"} />
        <NavBar />
        <About key={"about"} />
        <FourWords key={'four words'}/>
        <SkillsShowcase key={"skills"} />
        <QualitiesScroller key={'qualities'} />
        <div key={"contact"} className="h-screen bg-black"></div>
    </div>
  );
}

export default App;
