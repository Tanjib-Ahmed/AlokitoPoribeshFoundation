/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E9F2F8",
          100: "#D0E4F1",
          200: "#A8CCE4",
          300: "#7FB5DA",
          400: "#5A9FCC",
          500: "#3F8BC4",
          600: "#2F6FA3",
          700: "#1F4E79",
          800: "#173D5A",
          900: "#0F2A3F"
        }
      },
      fontFamily: {
        sans: ['"Li Ador Noirrit"', '"Hind Siliguri"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
