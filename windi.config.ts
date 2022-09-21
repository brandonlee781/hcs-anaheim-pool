import { defineConfig } from 'windicss/helpers'
import fs from 'fs/promises'

export default defineConfig({
  darkMode: 'class',
  alias: {
    btn: 'px-4 py-2 mr-2 rounded-md hover:outline',
    card: 'shadow border-b border-gray-200',
  },
  extract: {
    include: ['src/**/*.{vue,html,ts,yaml}'],
    extractors: [
      {
        extensions: ['yaml'],
        extractor: async content => {
          const classes = content.match(/(?:\w*)Style:(.*)$/gim) ?? []
          return { classes }
        },
      },
    ],
  },
})
