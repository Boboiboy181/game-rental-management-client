/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Poppins', 'sans-serif'],
        cursive: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
