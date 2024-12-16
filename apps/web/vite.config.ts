import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import path from "path";
import { defineConfig } from "vite";

config();

export default defineConfig(() => {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.VITE_SSL_CERT_PATH || !process.env.VITE_SSL_KEY_PATH) {
      throw new Error(
        "SSL certificate paths not configured in environment variables",
      );
    }
  }

  const commonConfig = {
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
    preview: {
      host: "0.0.0.0",
      port: 443,
      https: {
        key: process.env.VITE_SSL_KEY_PATH,
        cert: process.env.VITE_SSL_CERT_PATH,
      },
    },
  };

  return commonConfig;
});
