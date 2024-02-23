/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '4-auto': 'repeat(4, 1fr)',
      }
    },
  },
  plugins: [],
}