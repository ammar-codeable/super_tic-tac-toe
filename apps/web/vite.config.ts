import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
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
