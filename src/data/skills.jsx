import { SiAdobe, SiFlutter, SiReact, SiJavascript, SiGit, SiFirebase } from "react-icons/si";

const Skills = [
  {
    icon: <SiAdobe className="w-10 h-10 text-white" />,
    title: "AEM (Adobe Experience Manager)",
    description: "Specialized in building scalable and efficient web content management systems.",
    bg: "bg-gradient-to-r from-[#7c1c1c] to-black/80",
    glow: "rgba(124, 28, 28, 0.6)", // matches #7c1c1c
  },
  {
    icon: <SiReact className="w-10 h-10 text-white" />,
    title: "ReactJS",
    description: "Focused on developing dynamic, high-performance frontend applications.",
    bg: "bg-gradient-to-r from-[#1f3b5c] to-black/80",
    glow: "rgba(31, 59, 92, 0.6)", // matches #1f3b5c
  },
  {
    icon: <SiFlutter className="w-10 h-10 text-white" />,
    title: "Flutter",
    description: "Creating beautiful, natively compiled apps for mobile, web, and desktop.",
    bg: "bg-gradient-to-r from-[#1b4b52] to-black/80",
    glow: "rgba(27, 75, 82, 0.6)", // matches #1b4b52
  },
  {
    icon: <SiJavascript className="w-10 h-10 text-white" />,
    title: "JavaScript",
    description: "Strong grasp of core JS, ES6+, and modern asynchronous programming patterns.",
    bg: "bg-gradient-to-r from-[#5e4c00] to-black/80",
    glow: "rgba(94, 76, 0, 0.6)", // matches #5e4c00
  },
  {
    icon: <SiFirebase className="w-10 h-10 text-white" />,
    title: "Firebase",
    description: "Implementing real-time databases, authentication, and cloud functions seamlessly.",
    bg: "bg-gradient-to-r from-[#6b3c1e] to-black/80",
    glow: "rgba(107, 60, 30, 0.6)", // matches #6b3c1e
  },
  {
    icon: <SiGit className="w-10 h-10 text-white" />,
    title: "Git",
    description: "Proficient in version control, branching, and collaborative development workflows.",
    bg: "bg-gradient-to-r from-[#1a1f2b] to-black/90",
    glow: "rgba(26, 31, 43, 0.6)", // matches #1a1f2b
  },
];

export default Skills;
