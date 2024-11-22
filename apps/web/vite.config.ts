import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

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
