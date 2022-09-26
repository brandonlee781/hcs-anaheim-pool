import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'

export default defineConfig({
  base: '/hcs-tournament-schedule/',
  build: { target: 'esnext' },
  optimizeDeps: { esbuildOptions: { target: 'esnext' } },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    WindiCSS({
      transformCSS: 'pre',
      scan: {
        dirs: ['src'], // all files in the cwd
        fileExtensions: ['vue', 'js', 'ts'], // also enabled scanning for js/ts
      },
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        'hcs-icons': FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    Components({
      extensions: ['vue', 'ts'],
      dirs: ['src/components', 'src/providers'],
      dts: true,
      resolvers: [
        IconsResolver({
          customCollections: ['hcs-icons'],
        }),
      ],
    }),
    VitePWA({
      base: '/hcs-tournament-schedule/',
      srcDir: 'src',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'HCS Tournament Schedule',
        short_name: 'HCS Schedule',
        description: 'Schedule HCS Halo Infinite Tournaments',
        theme_color: '#1f2937',
        start_url: '.',
        display: 'standalone',
        background_color: '#374151',
        icons: [
          {
            src: 'android-chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'mstile-150x150.png',
            size: '150x150',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'safari-pinned-tab.svg',
            type: 'image/svg',
          },
        ],
      },
      // devOptions: {
      //   enabled: true,
      //   type: 'module',
      //   /* other options */
      // },
    }),
    ViteYaml(),
    vueI18n({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/locales/*.json'
      ),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
