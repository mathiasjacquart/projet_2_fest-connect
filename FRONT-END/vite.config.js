import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Changement important : utilisez '/' au lieu de './'
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      output: {
        // Configuration simplifiée mais efficace
        entryFileNames: "assets/js/[name].[hash].js",
        chunkFileNames: "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          // Garde la structure de dossiers pour les images
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `assets/img/[name].[hash].[ext]`;
          }

          if (/\.(css|scss|sass)$/i.test(assetInfo.name)) {
            return `assets/css/[name].[hash].[ext]`;
          }

          return `assets/[name].[hash].[ext]`;
        },
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
