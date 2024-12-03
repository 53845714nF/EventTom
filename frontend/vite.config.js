import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";

dotenv.config();

const backendUrl = process.env.VITE_BACKEND_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // all requests starting with /api are proxied to the backend server
      "/api": {
        target: backendUrl, // change this to the address of your backend server
        changeOrigin: true, // this is needed for the correct headers to be set (CORS)
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
    },
  },
});
