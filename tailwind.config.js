/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        dpShadow: "20px 20px 60px #d35e72,-20px -20px 60px #ff7f9a",
        boxShadow1: "0px 0px 22px -3px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
}
