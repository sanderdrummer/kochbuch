import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solidPlugin from "vite-plugin-solid";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@kochbuch/recipes",
        replacement: path.resolve(__dirname, "./src/recipe/index.ts"),
      },
      {
        find: "@kochbuch/components",
        replacement: path.resolve(__dirname, "./src/components/index.ts"),
      },
    ],
  },
  plugins: [
    solidPlugin(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
});
