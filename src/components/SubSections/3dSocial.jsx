import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaMailBulk,
  FaEnvelope,
} from "react-icons/fa";

export default function SkewedSocialLinks() {
  const socials = [
    {
      icon: FaLinkedin,
      color: "#3b5998",
      side: "#365492",
      bottom: "#4a69ad",
      link: "https://www.linkedin.com/in/aravindprakash06/"
    },
    {
      icon: FaGithub,
      color: "#2B1B3D",
      side: "#2B1B3D",
      bottom: "#2B1B3D",
      link: "https://github.com/aravindprakas"
    },
    {
      icon: FaEnvelope,
      color: "#EA4335",
      side: "#EA4335",
      bottom: "#EA4335",
      link: "mailto:aravindprakash006@gmail.com"
    },
  ];

  return (
    <div className="relative w-full h-35 flex items-center justify-center bg-[#1A1A1A] overflow-hidden ">
      
      {/* Left text */}
      <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 
                       text-white font-semibold tracking-wide
                       text-sm sm:text-base md:text-4xl hidden md:block">
        ARAVIND
      </span>

      {/* Right text */}
      <span className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 
                       text-white font-semibold tracking-wide
                       text-sm sm:text-base md:text-4xl hidden md:block">
        PRAKASH
      </span>

      {/* Social tiles */}
      <ul className="flex gap-4 md:gap-6">
        {socials.map((s, i) => {
          const Icon = s.icon;

          return (
            <li key={i}>
              <a
                href={s.link}
                style={{
                  "--main": s.color,
                  "--side": s.side,
                  "--bottom": s.bottom,
                }}
                className="
                  group relative block
                  w-[90px] h-[80px]
                  sm:scale-90
                  md:scale-100

                  pl-6 flex items-center gap-4
                  bg-black text-white
                  transform rotate-[-30deg] skew-x-[25deg]
                  transition-all ease-out
                  shadow-[-20px_20px_10px_rgba(0,0,0,0.5)]

                  hover:-translate-y-[18px]
                  hover:bg-[var(--main)]
                  hover:shadow-[-20px_35px_35px_rgba(0,0,0,0.6)]

                  before:content-['']
                  before:absolute before:top-[10px] before:left-[-20px]
                  before:w-[20px] before:h-full
                  before:bg-[#b1b1b1]
                  before:skew-y-[-45deg]
                  before:transition-all
                  group-hover:before:bg-[var(--side)]

                  after:content-['']
                  after:absolute after:bottom-[-20px] after:left-[-10px]
                  after:w-full after:h-[20px]
                  after:bg-[#b1b1b1]
                  after:skew-x-[-45deg]
                  after:transition-all duration-500
                  group-hover:after:bg-[var(--bottom)]
                "
              >
                <Icon className="text-[40px] transition-colors duration-300 group-hover:text-white" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
