import { motion } from "framer-motion";

export default function ContactSection() {
  const tags = [
    "FRONTEND DEVELOPMENT",
    "REACT.JS EXPERTISE",
    "FLUTTER DEVELOPMENT",
    "AEM DEVELOPMENT",
    "JAVASCRIPT",
    "PORTFOLIO DEVELOPMENT",
    "APPLE ASPIRANT",
    "LEAN BULKING",
  ];

  const socials = ["DRIBBBLE", "BEHANCE", "TWITTER", "INSTAGRAM"];

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl tracking-wider uppercase leading-tight mb-10">
          Let’s <br /> Connect
        </h1>

        <p className="uppercase mb-6 text-sm md:text-base font-light">
          I'm always interested about
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-2 border border-white rounded-full text-sm md:text-base uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center items-center mb-10">
          <span className="uppercase mr-4 text-sm md:text-base">
            Are you minding a project?
          </span>

          <motion.button
            className="relative w-40 h-12 overflow-hidden rounded-full bg-white text-black font-semibold uppercase flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute w-full h-full flex items-center whitespace-nowrap">
              <motion.div
                className="flex h-full w-full"
                whileHover={{
                  x: ["15%", "-50%"],
                  transition: { x: { repeat: Infinity, ease: "linear", duration: 2 } },
                }}
              >
                <span className="text-2xl tracking-wide mr-10">
                  Contact Me &nbsp; Contact Me &nbsp; Contact Me &nbsp; Contact Me &nbsp;
                </span>
              </motion.div>
            </div>
          </motion.button>
        </div>

        <div className="flex justify-center gap-6 text-sm md:text-base uppercase font-light">
          {socials.map((social, idx) => (
            <a key={idx} href="#" className="hover:underline">
              {social}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
