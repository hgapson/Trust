import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
    }),
  ],
  resolve: {
    alias: {
      "lucide-react": path.resolve(__dirname, "src/stubs/lucide-react.tsx"),
      "lucide-react@0.487.0": path.resolve(
        __dirname,
        "src/stubs/lucide-react.tsx",
      ),
    },
  },
});
