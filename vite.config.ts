import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// @ts-ignore - JavaScript plugin
import autoRoutesPlugin from "./scripts/vite-plugin-auto-routes.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // Gunakan konfigurasi default React
    // Sementara disable auto-routes untuk testing HMR
    // autoRoutesPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // Simplified HMR configuration
    hmr: true, // Enable HMR dengan setting default
    host: "localhost",
    port: 5173,
    // Force reload on file changes
    watch: {
      usePolling: true, // Better for Windows
      interval: 1000, // Check every 1 second
    },
  },
  // Clear dependencies cache
  optimizeDeps: {
    force: true,
  },
});
