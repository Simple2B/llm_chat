/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bright-turquoise': {
            '50': '#effbff',
            '100': '#def5ff',
            '200': '#b6eeff',
            '300': '#75e4ff',
            '400': '#2cd7ff',
            '500': '#00c7fc',
            '600': '#009dd4',
            '700': '#007dab',
            '800': '#00698d',
            '900': '#065774',
            '950': '#04374d',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
