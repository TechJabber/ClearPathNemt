/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cp-navy': '#003366',
        'cp-gold': '#D4A574',
      },
    },
  },
  plugins: [],
}
