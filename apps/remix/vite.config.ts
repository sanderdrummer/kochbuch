import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    remix({
      ssr: false,
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route('/', 'routes/recipes/recipes-view.tsx', { index: true })
          route('/recipes/:title', 'routes/recipes/recipes-details-view.tsx')
          route('/list', 'routes/list/ListView.tsx')
          route('/list/add', 'routes/list/AddListItemsForm.tsx')
        })
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
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
