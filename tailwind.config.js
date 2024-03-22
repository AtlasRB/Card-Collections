/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pokemon1': "url('/images/pokemon1.jpg')"
      },
    },
  },
  plugins: [],
}