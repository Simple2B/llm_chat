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
        'rose-fog': {
          50: '#fbf6f5',
          100: '#f7ebe9',
          200: '#f1dbd7',
          300: '#e3bab3',
          400: '#d69d93',
          500: '#c47b6f',
          600: '#ae6154',
          700: '#914f44',
          800: '#79443b',
          900: '#663d36',
          950: '#361d19',
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
