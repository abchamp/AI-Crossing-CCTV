/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a237e',
        secondary: '#303f9f',
        'primary-text': '#0A1F1C',
        'secondary-text': '#1a237e',
      },
      fontFamily: {
        sans: ['Poppins', 'IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
  plugins: [],
  prefix: 'tw-', // Optional: to avoid conflicts with Quasar's classes
}
