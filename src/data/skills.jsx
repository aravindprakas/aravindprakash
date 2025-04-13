import { RiTailwindCssLine } from "react-icons/ri";
import { SiAdobe, SiFlutter, SiReact, SiJavascript, SiHtml5 } from "react-icons/si";

const Skills = [
  {
    icon: <SiAdobe className="w-10 h-10 text-white" />, 
    title: "AEM (Adobe Experience Manager)", 
    description: "Expertise in building scalable web content management systems.",
    bg: "bg-gradient-to-r from-red-500 to-black/10"
  },
  {
    icon: <SiReact className="w-10 h-10 text-white" />, 
    title: "ReactJS", 
    description: "Developing dynamic and performant frontend applications.",
    bg: "bg-gradient-to-r from-blue-500 to-black/10"
  },
  {
    icon: <SiFlutter className="w-10 h-10 text-white" />, 
    title: "Flutter", 
    description: "Building beautiful natively compiled applications for mobile, web, and desktop.",
    bg: "bg-gradient-to-r from-cyan-500 to-black/10"
  },
  {
    icon: <SiJavascript className="w-10 h-10 text-white" />, 
    title: "JavaScript", 
    description: "Strong knowledge in core JS concepts, ES6+, and asynchronous programming.",
    bg: "bg-gradient-to-r from-yellow-500 to-black/10"
  },
  {
    icon: <SiHtml5 className="w-10 h-10 text-white" />, 
    title: "HTML", 
    description: "Proficient in writing semantic, accessible HTML for clean and structured web layouts.Experienced in forms, SEO optimization, and integrating with modern frameworks.",
    bg: "bg-gradient-to-r from-orange-600 to-black/10"
  },
  {
    icon: <RiTailwindCssLine className="w-10 h-10 text-white" />, 
    title: "TailwindCss", 
    description: "Skilled in using Tailwind CSS to build responsive, utility-first UI components efficiently.Experienced in customizing themes, optimizing design systems, and ensuring consistency across projects.",
    bg: "bg-gradient-to-r from-yellow-500 to-black/10"
  }
];

export default Skills;