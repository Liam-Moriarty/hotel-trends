import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load VITE_* vars from the repo root (two levels up from apps/web).
  // This mirrors the envDir setting so both the Vite dev server and this
  // config read from the same .env.local file.
  const env = loadEnv(mode, '../../', 'VITE_')

  // Firebase Functions emulator URL format:
  //   http://127.0.0.1:{port}/{projectId}/{region}/{functionName}/{path}
  // These values come from env so the proxy works on any machine without
  // editing source code.
  const projectId = env.VITE_FIREBASE_PROJECT_ID ?? 'hotel-trends-stage'
  const region = env.VITE_FUNCTIONS_REGION ?? 'us-central1'
  const emulatorPort = env.VITE_FUNCTIONS_EMULATOR_PORT ?? '5001'

  return {
    plugins: [react()],
    envDir: '../../',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${emulatorPort}`,
          changeOrigin: true,
          rewrite: proxyPath => `/${projectId}/${region}${proxyPath}`,
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      api: false, // Prevents Vitest from starting a WebSocket server
    },
  }
})
