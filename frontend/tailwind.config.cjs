/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  themes: ['light', 'dark', 'cupcake'],
};
