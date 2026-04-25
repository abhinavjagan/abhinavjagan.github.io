import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function resolveBasePath(command) {
  const explicit = process.env.VITE_BASE_PATH;
  if (explicit) {
    return explicit.endsWith("/") ? explicit : `${explicit}/`;
  }

  if (command === "build") {
    const repo = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
    if (repo) {
      if (repo.endsWith(".github.io")) {
        return "/";
      }
      return `/${repo}/`;
    }
  }

  return "/";
}

export default defineConfig(({ command }) => ({
  // GH Pages hosts repos at /<repo>/, while local dev should stay at /
  base: resolveBasePath(command),
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
}));
