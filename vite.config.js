import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local: base "/" so assets load from http://localhost:<port>/assets/...
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  clearScreen: false,
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "three"],
  },
  build: {
    target: "es2022",
    sourcemap: true,
  },
});
