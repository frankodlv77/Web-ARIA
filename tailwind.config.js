/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kova: {
          bg:     '#FAFAF8',
          beige:  '#F0EDE6',
          dark:   '#2A2A2A',
          accent: '#1A1A1A',
          border: '#E5E2DC',
          gray:   '#888888',
        },
      },
      fontFamily: {
        serif:   ['Sora', 'sans-serif'],
        sans:    ['Sora', 'system-ui', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
