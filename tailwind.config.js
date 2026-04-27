/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'gold':'#c9a84c','gold-light':'#e8c97a','gold-dim':'#8a6a28',
        'cream':'#f0e6d0','cream-dim':'#c4b49a','off-black':'#0d0c0a','site-dark':'#111008',
      },
      fontFamily: {
        display:['Bebas Neue','sans-serif'],
        serif:['Cormorant Garamond','serif'],
        body:['DM Sans','sans-serif'],
      },
    },
  },
  plugins: [],
}
