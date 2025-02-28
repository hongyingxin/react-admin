import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    },
  },
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "https://mock.apifox.cn/m1/3037186-0-default",
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(new RegExp(`^/api`), ""),
      },
    },
  },
})
