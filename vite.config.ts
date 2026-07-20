import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/save-lead.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/save-lead': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/send-lead': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/send-lead.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/save-partner.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/save-visitor.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/partner-login.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/dev/approve-partner': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/api/mobile/save-lead.php': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
})
