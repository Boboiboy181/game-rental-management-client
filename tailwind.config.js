/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Poppins', 'sans-serif'],
        cursive: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
};
