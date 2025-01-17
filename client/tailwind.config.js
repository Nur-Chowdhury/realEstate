/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        sans: ['Avro', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'custom-inset': 'inset 5px 5px 5px rgba(0, 0, 0, 0.05), inset -5px -5px 5px rgba(255, 255, 255, 0.5), 5px 5px 5px rgba(0, 0, 0, 0.05), -5px -5px 5px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}