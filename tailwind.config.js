/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        beautiful: ['"Beautiful Freak"', "cursive"],
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
