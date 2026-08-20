import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["icon.svg", "maskable-icon.svg"],
      manifest: {
        name: "Inventario Patrimonial de Tunja",
        short_name: "Patrimonio Tunja",
        description: "Inventario preliminar interno de bienes y manifestaciones culturales de Tunja.",
        lang: "es-CO",
        theme_color: "#173b3f",
        background_color: "#f7f3eb",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          },
          {
            src: "/maskable-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,ico,png}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
        clientsClaim: true
      }
    })
  ]
});
