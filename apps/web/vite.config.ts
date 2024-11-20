import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "build") {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": "/src",
        },
      },
      preview: {
        port: 443,
      },
      server: {
        https: {
          key: "import.meta.env.VITE_SSL_KEY_PATH",
          cert: "import.meta.env.VITE_SSL_CERT_PATH",
        },
        host: "0/.0.0.0",
        port: 443,
      },
    };
  } else {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          "@": "/src",
        },
      },
    };
  }
});
