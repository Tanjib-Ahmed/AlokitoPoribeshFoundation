/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#2F6FA3', // Professional NGO Blue
          600: '#0284c7',
          700: '#1F4E79', // Accent/Deep Blue
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: '#7FB5DA',
        accent: '#1F4E79',
        background: '#F8FAFC',
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
        bangla: ['"Li Ador Noirrit"', '"Hind Siliguri"', 'sans-serif'],
        sans: ['"Li Ador Noirrit"', '"Hind Siliguri"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
