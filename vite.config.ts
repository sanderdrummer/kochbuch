/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kochbuch/',
  test: {},
  resolve: {
    alias: [
      {
        find: '@kochbuch/recipes',
        replacement: path.resolve(__dirname, './src/recipe/index.ts'),
      },
      {
        find: '@kochbuch/list',
        replacement: path.resolve(__dirname, './src/list/index.ts'),
      },
      {
        find: '@kochbuch/components',
        replacement: path.resolve(__dirname, './src/components/index.ts'),
      },
    ],
  },
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Kochbuch',
        short_name: 'Kochbuch',
        description: 'Kochbuch und Einkaufsliste',
        theme_color: '#1c1917',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
})
