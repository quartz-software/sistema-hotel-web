import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5010,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  build: {
    outDir: "../server/dist",
  },
});
