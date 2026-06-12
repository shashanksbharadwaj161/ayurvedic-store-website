import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:   ['react', 'react-dom', 'react-router-dom'],
          motion:   ['framer-motion'],
          carousel: ['embla-carousel-react', 'embla-carousel-autoplay'],
          ui:       ['lucide-react', '@headlessui/react'],
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true,
  }
})
