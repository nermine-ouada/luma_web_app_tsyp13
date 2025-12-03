import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.VITE_PORT) || 3005, // Frontend dev server port (React app runs here)
    proxy: {
      "/api": {
        target: process.env.VITE_API_TARGET || "http://localhost:3002", // Backend server base URL (without /api)
        changeOrigin: true, // Changes the origin header to match target
      },
    },
  },
});
