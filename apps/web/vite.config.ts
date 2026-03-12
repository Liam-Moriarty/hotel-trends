import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  envDir: '../../',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Firebase Functions emulator uses the format:
      // http://127.0.0.1:5001/{projectId}/{region}/{functionName}/{path}
      // So /api/trpc/... → /hotel-trends-stage/asia-southeast1/api/trpc/...
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true,
        rewrite: path => `/hotel-trends-stage/asia-southeast1${path}`,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    api: false, // Prevents Vitest from starting a WebSocket server
  },
})
