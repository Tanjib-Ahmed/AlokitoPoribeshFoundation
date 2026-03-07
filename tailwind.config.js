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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Success/Primary Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534', // Deep NGO Green
          900: '#14532d',
        },
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
