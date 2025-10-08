import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5188,
    allowedHosts: ["if.workbrink.com", "localhost"], // :white_tick: merged into one array
    hmr: {
      port: 24678, // Use a different port for HMR
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],
  build: {
    rollupOptions: {
      external: ["chart.js"],
      output: {
        globals: {
          "chart.js": "Chart",
        },
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["chart.js", "react", "react-dom", "react-router-dom"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
