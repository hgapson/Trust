import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "lucide-react": path.resolve(__dirname, "src/stubs/lucide-react.tsx"),
      "lucide-react@0.487.0": path.resolve(
        __dirname,
        "src/stubs/lucide-react.tsx",
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});