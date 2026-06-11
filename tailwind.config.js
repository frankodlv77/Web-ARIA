/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kova: {
          bg: '#F8F7F4',
          dark: '#0A0A0A',
          accent: '#E8501A',
          gray: '#888888',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
