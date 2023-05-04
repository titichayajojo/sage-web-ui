/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alatsi"],
      },
    },
    colors: {
      white: "#ffffff",
      purple: "#3f3cbb",
      black: "#000000",
      grey: "#9C9C9C",
      btn: {
        yellow:"#FFCD01",
        red: "#D34747",
        green: "#7EC772",
      },
      header: {
        dark: "#0190b0",
        light: "#00a5cb",
      },
    },
  },
  plugins: [],
};
