import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0", // Allows external devices (like phone) to access
    port: 5173, // Frontend port
    strictPort: true, // Ensures Vite doesn't auto-switch ports
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Proxy backend requests to Express
        changeOrigin: true,
      },
    },
  },
});
