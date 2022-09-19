import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  alias: {
    btn: 'px-4 py-2 mr-2 rounded-md hover:outline',
    card: 'shadow border-b border-gray-200',
  },
  safelist: [
    'shadow-lg rounded-lg overflow-hidden',
    'dark:bg-gray-800 dark:text-gray-200 bg-gray-300 text-dark-500',
    'dark:divide-gray-200 divid-gray-600 border-separate',
    'dark:bg-gray-700 bg-gray-200',
    'dark:text-gray-100 text-gray-900',
    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    'transition hover:outline-gray-400 hover:bg-gray-700',
    'hover:text-light-500 hover:dark:bg-gray-500',
    'dark:bg-gray-500 text-gray-200 bg-dark-900 hover:text-gray-200 hover:bg-dark-900',
    'text-xl font-bold tracking-wide',
  ],
})
