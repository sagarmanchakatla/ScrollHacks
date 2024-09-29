import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically updates the service worker
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ], // Icons and assets
      manifest: {
        name: "FinPlanPro", // Name of the app
        short_name: "Learn about finance with AI", // Short name for the app
        description: "Help with financial planning",
        theme_color: "#ffffff", // Theme color
        background_color: "#ffffff", // Background color
        display: "standalone", // App will display standalone like a native app
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icon-192x192.png", // Path to your icons
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png", // Path to your icons
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
