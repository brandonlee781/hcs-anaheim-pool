function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{tsx,html,ts,css}', 'src/assets/styles.ts'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      colors: {
        hcsDark: {
          100: '#9aa0ff',
          200: '#9aa7ff',
          300: '#92a5f1',
          400: '#7b8bcb',
          500: '#6471a5',
          600: '#4d577f',
          700: '#363d59',
          800: '#1f2333',
        },
        hcsMid: {
          300: '#606a90',
          400: '#474e6a',
          500: '#2e3244',
          600: '#0b0c10',
        },
      },
    },
  },
  // safelist: [
  //   range(50).map(i => `grid-rows-${i}`),
  //   range(10).map(i => `grid-cols-${i}`),
  //   range(10, 0).map(i => `row-start-${i}`),
  //   range(10, 0).map(i => `row-span-${i}`),
  //   range(10, 0).map(i => `col-start-${i}`),
  //   range(10, 0).map(i => `col-span-${i}`),
  // ],
  plugins: [],
}
