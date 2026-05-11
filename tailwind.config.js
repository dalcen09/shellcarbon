/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shell: {
          green: '#1a7f5a',
          'green-light': '#22a070',
          'green-dark': '#145c41',
          teal: '#0f766e',
          gray: '#f0f4f2',
          dark: '#0f1f17',
        },
      },
    },
  },
  plugins: [],
}

