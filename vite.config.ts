import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// @ts-ignore - JavaScript plugin
import autoRoutesPlugin from "./scripts/vite-plugin-auto-routes.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    autoRoutesPlugin(), // 🚀 Auto-generate routes on file changes
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
