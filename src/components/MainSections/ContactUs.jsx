import { motion, AnimatePresence, useInView } from "framer-motion";
export default function ContactSection() {
  const tags = [
    "FRONTEND DEVELOPMENT",
    "AEM DEVELOPMENT",
    "FLUTTER DEVELOPMENT",
    "PERFORMANCE OPTIMIZATION",
    "CI/CD AUTOMATION",
    "UI/UX DESIGN SYSTEMS",
    "CLOUD & DEVOPS FUNDAMENTALS",
  ];

  const socials = ["DRIBBBLE", "BEHANCE", "MAIL", "INSTAGRAM"];

  return (
    <section className="bg-black text-gray-300 py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="relative text-6xl md:text-9xl tracking-wider uppercase leading-tight mb-10">
          Let’s <br /> Connect
        </h1>

        <p className="uppercase mb-6 text-sm md:text-base font-light">
          I'm always interested about
        </p>

        <div className="flex flex-wrap justify-center gap-7 mb-10">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-2 border border-white rounded-full text-sm md:text-xl uppercase tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center items-center mb-10">
          <span className="uppercase mr-4 text-sm md:text-base tracking-wider">
            Are you minding a project?
          </span>

          <motion.button
            className="relative w-40 h-12 overflow-hidden rounded-full bg-gray-300 text-black uppercase flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute w-full h-full flex items-center whitespace-nowrap">
              <motion.div
                className="flex h-full w-full"
                initial={{ x: "8%", y: "15%" }}
                whileHover={{
                  x: ["8%", "-600%"],
                  transition: {
                    x: { repeat: Infinity, ease: "linear", duration: 8 },
                  },
                }}
              >
                <span className="text-2xl tracking-widest mr-10">
                  Contact Me &nbsp; Contact Me &nbsp; Contact Me &nbsp; Contact
                  Me &nbsp; Contact Me &nbsp; Contact Me &nbsp; Contact Me
                  &nbsp; Contact Me &nbsp;
                </span>
              </motion.div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
