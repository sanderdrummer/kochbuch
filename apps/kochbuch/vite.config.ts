import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	base: "/kochbuch/",
	plugins: [
		tailwindcss(),
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Kochbuch",
				short_name: "Kochbuch",
				description: "Kochbuch und Einkaufsliste",
				theme_color: "#1bfff3",
				icons: [
					{
						src: "android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
			devOptions: { enabled: false },
		}),
	],
});
