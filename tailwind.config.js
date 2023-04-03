/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#12E081",

          secondary: "#FFCC4D",

          accent: "#9ca3af",

          neutral: "#111827",

          "base-100": "#FFEFC9",

          info: "#7c3aed",

          success: "#38bdf8",

          warning: "#fb923c",

          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
