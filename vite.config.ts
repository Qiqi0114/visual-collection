import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],  // 注册插件
  server: {
    open: true
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
      "@": path.resolve(__dirname, "src"),
      "comps": path.resolve(__dirname, "src/components"),
    }
  }
})