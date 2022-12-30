import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],  // 注册插件
  server: {
    host: "localhost",
    port: 8080,
    open: true,
    proxy: {// 跨域代理
      '/api': {
        // target: 'http://' + env.VUE_APP_BASE_API,
        target: 'http://43.143.214.146:8001', // 
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      },
      // 代理 WebSocket 或 socket
      // '/socket.io': {
      //   target: 'ws://localhost:3000',
      //   ws: true
      //  }
    },

  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
    }
  }
})