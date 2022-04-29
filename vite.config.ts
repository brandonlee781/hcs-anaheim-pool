import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import * as path from 'path'

export default defineConfig({
  base: '/hcs-anaheim-pool/',
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    WindiCSS({ transformCSS: 'pre' }),
    Components({
      extensions: ['vue', 'ts'],
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
