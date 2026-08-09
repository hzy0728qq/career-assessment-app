import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'./' 保证无论部署在根路径还是子路径(如 /career/ ),资源引用都正确
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // 生产构建压缩混淆,移除 console 与 debugger
    minify: 'esbuild',
    target: 'es2019'
  }
})
