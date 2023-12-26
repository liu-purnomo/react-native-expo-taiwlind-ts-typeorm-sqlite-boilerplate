/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  extend: {
    colors: {
      main: "#9B5ED8",
      white: "#ffffff",
      black: "#4F4F4F",
      light: "#FCF9FF",

      blue: "#97B4FF",
      softblue: "#CBDAFF",
      red: "#FF7777",
      softred: "#FFCACA",
      yellow: "#CFB872",
      softyellow: "#FFEEBA",
      purple: "#AC7BCD",
      softpurple: "#EED3FF",
      green: "#91C778",
      softgreen: "#EAFFE0",
      orange: "#FFA829",
    },
    fontSize: {
      "2xs": "10px",
    },
    padding: {
      10: "10px",
      14: "14px",
      20: "20px",
    },
  },
  plugins: [],
};
