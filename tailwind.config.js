/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
