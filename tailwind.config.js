/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: '#252838',
        secondary: '#343a4f',
        tertiary: '#385cbb'
      }
    }
  },
  plugins: [require('daisyui')]
}
