/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Anton"', "sans-serif"],
        fancy: ['"Quintessential"', "serif"],
        suisse: ['"SuisseIntl"', "sans-serif"],
        beautiful: ['"Beautiful Freak"', "cursive"],
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scrollLeft 20s linear infinite",
      },
      transitionProperty: {
        blur: "filter",
        opacity: "opacity",
      },
      screens: {
        "max-xs": { max: "425px" },
      },
    },
  },
  plugins: [],
};
