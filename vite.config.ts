import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Reduce bundle size for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['react-bootstrap', 'bootstrap'],
          utils: ['axios', 'sweetalert2', '@reduxjs/toolkit', 'react-redux']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild'
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
