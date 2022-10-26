import { defineConfig } from 'windicss/helpers'
import scrollSnapPlugin from 'windicss/plugin/scroll-snap'

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map(i => i + startAt)
}

export default defineConfig({
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
        },
      },
    },
  },
  alias: {
    btn: 'px-4 py-2 mr-2 rounded-md hover:outline hover:underline underline-offset-3',
    card: 'shadow border-b border-gray-200',
    themeGradient: 'bg-gradient-to-br from-purple-600/70 to-purple-400/70',
  },
  safelist: [
    range(50).map(i => `grid-rows-${i}`),
    range(10).map(i => `grid-cols-${i}`),
    range(10, 0).map(i => `row-start-${i}`),
    range(10, 0).map(i => `row-span-${i}`),
    range(10, 0).map(i => `col-start-${i}`),
    range(10, 0).map(i => `col-span-${i}`),
  ],
  extract: {
    include: ['src/**/*.{tsx,html,ts,yaml}', 'src/assets/styles.ts'],
    extractors: [
      {
        extensions: ['yaml'],
        extractor: async content => {
          const styleClasses = content.match(/(?:\w*)Style:(.*)$/gim) ?? []
          const itemClasses = content.match(/textClass:(.*)$/gim) ?? []
          return { classes: [...styleClasses, ...itemClasses] }
        },
      },
    ],
  },
  plugins: [scrollSnapPlugin],
})
