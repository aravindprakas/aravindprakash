import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

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

  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setIsOpen(false);
          }, 3000);
        },
        (error) => {
          alert("Failed to send. Try again.");
          console.error(error);
        }
      );
    console.log("SERVICE:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("TEMPLATE:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  };

  const socials = ["DRIBBBLE", "BEHANCE", "MAIL", "INSTAGRAM"];

  return (
    <section className="bg-black text-gray-300 py-20 px-4 relative">
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
            onClick={() => setIsOpen(true)}
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
                  Me &nbsp;
                </span>
              </motion.div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Form Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          >
            <div className="bg-white text-black rounded-2xl p-8 w-[90%] max-w-md relative">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Contact Form
              </h2>
              {success ? (
                <p className="text-green-600 text-center">
                  Message sent successfully!
                </p>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={sendEmail}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className="border p-2 rounded-md"
                  />
                  <input
                    type="text"
                    name="user_number"
                    placeholder="Your Phone Number"
                    required
                    className="border p-2 rounded-md"
                  />
                  <button
                    type="submit"
                    className="bg-black text-white rounded-md py-2 hover:bg-gray-800 transition-all"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="text-sm text-gray-500 mt-2 underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
