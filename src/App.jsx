import "./style/App.css";
import ParallaxHeader from "./components/ParallaxHeader.jsx";
// import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import { useEffect } from "react";
import SkillsShowcase from "./components/Skills.jsx";
import FourWords from "./components/FourWords.jsx";
import LoaderWithAG,{NavBar} from "./components/Loader.jsx";

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
      <LoaderWithAG>
        <ParallaxHeader />
      </LoaderWithAG>
      <NavBar />
      <About />
      <FourWords />
      <SkillsShowcase />
      <div className="h-screen bg-white"></div>
    </div>
  );
}

export default App;
