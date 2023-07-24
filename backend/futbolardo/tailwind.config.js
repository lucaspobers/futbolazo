/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '90vh': '90vh',
      },
      fontFamily: {
        'sans': ['Crimson', 'sans-serif'],
      }
    },
  },
  mode: 'jit',
  plugins: [],
}
