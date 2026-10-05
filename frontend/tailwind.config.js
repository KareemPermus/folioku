/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#6366f1',
          dark: '#0f172a',
        },
        surface: {
          bg: '#f8fafc',
          main: '#fcfdfe',
        },
      },
    },
  },
  plugins: [],
};