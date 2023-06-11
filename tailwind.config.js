/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
