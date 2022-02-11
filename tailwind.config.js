module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xl: '1200px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
