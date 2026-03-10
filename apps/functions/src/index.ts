import { onRequest } from 'firebase-functions/v2/https'
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http'
import { appRouter } from './trpc/router.js'
import { initializeApp } from 'firebase-admin/app'

// Initialize Firebase Admin
initializeApp()

export { appRouter, type AppRouter } from './trpc/router.js'

/**
 * Main API entry point for tRPC via Firebase Functions
 * This handles all requests to /api/** (rewritten in firebase.json)
 */
export const api = onRequest(
  {
    region: 'australia-southeast1', // Updated for Melbourne pilot project
    cors: true, // Enable CORS for easier development/access
  },
  async (req, res) => {
    // tRPC expects the path without the '/api' prefix if rewritten
    // but the nodeHTTPRequestHandler handles the URL parsing from req.url
    return nodeHTTPRequestHandler({
      req,
      res,
      router: appRouter,
      createContext: () => ({}),
      // This is crucial: since firebase hosting rewrites /api/trpc to the 'api' function,
      // the function sees /trpc/... as the path
      path: req.path
        .replace(/^\/api/, '')
        .replace(/^\/trpc/, '')
        .substring(1),
    })
  }
)
