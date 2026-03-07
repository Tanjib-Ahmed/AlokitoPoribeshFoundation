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
          DEFAULT: '#1F7A3E',
          dark: '#165B2D',
          light: '#2E9D52',
        },
        secondary: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
        },
        accent: {
          DEFAULT: '#F5C542',
          hover: '#E5B532',
        },
        background: '#F8FAF8',
        dark: '#1A1A1A',
        brand: {
          50: '#f0f7f1',
          100: '#dceee0',
          200: '#bbddc4',
          300: '#8dc29e',
          400: '#5ca274',
          500: '#1F7A3E',
          600: '#327c4d',
          700: '#28633e',
          800: '#214f33',
          900: '#1c422c',
          950: '#0f2518',
        }
      },
      fontFamily: {
        bangla: ['"Li Ador Noirrit"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
      }
    },
  },
  plugins: [],
}
