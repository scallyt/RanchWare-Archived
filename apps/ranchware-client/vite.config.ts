import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from "@rollup/plugin-commonjs" 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [commonjs()]
    },
  },
  optimizeDeps: {
    include: ['api-contract/**/*']
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost3000', // Local Nest-App
        changeOrigin: true
      },
    },
  },
})

