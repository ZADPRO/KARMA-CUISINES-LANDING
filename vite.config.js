import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.JPG", "**/*.WEBP"],
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.postcodeapi.nu",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
