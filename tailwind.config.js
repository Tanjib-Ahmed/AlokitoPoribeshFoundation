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
          DEFAULT: '#1F7A3E', // Original Brand Color
          50: '#f0f9f3',
          100: '#dcf0e3',
          200: '#bbe1c8',
          300: '#8dc6a1',
          400: '#5ca373',
          500: '#1F7A3E',
          600: '#2d8b4c',
          700: '#287241',
          800: '#235b37',
          900: '#1e4b30',
          950: '#0f291a',
        },
        secondary: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
        },
        accent: {
          DEFAULT: '#F5C542',
          hover: '#E5B532',
        },
        background: '#FDFDFD',
        dark: '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        bangla: ['"Li Ador Noirito"', 'serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      container: {
        center: true,
        padding: '2rem',
      }
    },
  },
  plugins: [],
}
