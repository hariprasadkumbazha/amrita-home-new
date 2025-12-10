/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'am:', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Note: We are NOT using extend here to force override for testing
    fontFamily: {
      'anton': ['Anton', 'sans-serif'],
      'satoshi': ['Satoshi', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}