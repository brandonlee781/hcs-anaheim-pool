import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
 
export default defineConfig({
  base: '/hcs-tournament-schedule/',
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    WindiCSS({ transformCSS: 'pre' }),
    Components({
      extensions: ['vue', 'ts'],
      dts: true,
    }),
    VitePWA({
      base: '/hcs-tournament-schedule/',
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      includeAssets: ['favicon.ico', 'robots.txt'],  
      manifest: {
        name: 'HCS Kansas City Major',
        short_name: 'KC Major',
        description: 'Pool play schedule for HCS Kansas City Major tournament',
        theme_color: '#ffffff',
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module"
        /* other options */  
      }
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
