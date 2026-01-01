/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      colors: {
        'magma-orange': '#FF5500',
        'race-blue': '#00AEEF',
        'asphalt': '#2C2C2C',
        'brick-red': '#C91A09',
        'brick-yellow': '#FFD700',
        'brick-blue': '#0055BF',
      },
      fontFamily: {
        'heading': ['Bangers', 'cursive'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
