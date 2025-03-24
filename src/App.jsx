import "./style/App.css";
import ParallaxHeader from "./components/ParallaxHeader.jsx";
import NavBar from "./components/NavBar.jsx";
import About from "./components/About.jsx";
import { useEffect } from "react";



function App() {
  //Disabling tab button
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
  //Main
  return (
    <div className="App">
      <NavBar />
      <ParallaxHeader />
      <About/>
      <div className="h-screen bg-white"></div>
    </div>
  );
}

export default App;
