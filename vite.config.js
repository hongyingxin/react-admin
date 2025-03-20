const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const path = require("path");

// https://vite.dev/config/
module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8888,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "https://mock.apifox.cn/m1/3037186-0-default",
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(new RegExp(`^/api`), "")
      }
    }
  }
});
