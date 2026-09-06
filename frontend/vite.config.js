import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://content-block-generator-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})