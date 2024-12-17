import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@super-tic-tac-toe/constants": path.resolve(
        __dirname,
        "../../packages/constants/src",
      ),
      "@super-tic-tac-toe/utils": path.resolve(
        __dirname,
        "../../packages/utils/src",
      ),
      "@super-tic-tac-toe/types": path.resolve(
        __dirname,
        "../../packages/types/src",
      ),
    },
  },
});
