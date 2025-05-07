/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#d1b580",
      },
      fontFamily: {
        copperplate: ['Copperplate', 'serif'],
      },
    },
  },
  plugins: [],
}

