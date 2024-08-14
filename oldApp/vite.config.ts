/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
        base: '/kochbuch/',
        test: {},
        plugins: [
                tsconfigPaths({
                        projects: ['tsconfig.json'],
                }),
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
