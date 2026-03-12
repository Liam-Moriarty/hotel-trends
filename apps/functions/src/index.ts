import { onRequest } from 'firebase-functions/v2/https'
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http'
import { appRouter } from './trpc/router.js'
import { initializeApp } from 'firebase-admin/app'

import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { embedText } from './services/vertexai'
import { indexHotelData } from './services/indexAll'

// Initialize Firebase Admin
initializeApp()

export { appRouter, type AppRouter } from './trpc/router.js'

/**
 * Main API entry point for tRPC via Firebase Functions
 * This handles all requests to /api/** (rewritten in firebase.json)
 */
export const api = onRequest(
  {
    region: 'asia-southeast1',
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

// Expose as a tRPC Procedure
// Wire the ragQuery service into the dashboard tRPC
// router so the frontend can call it

// auto-embed whenever a new snapshot is written
export const embed_on_snapshot = onDocumentCreated(
  'hotels/{hotelId}/snapshots/{date}',
  async event => {
    const data = event.data?.data()
    if (!data) return

    const text =
      `Snapshot ${data.date}: occupancy ${data.occupancy}%, ` +
      `RevPAR $${data.revpar}, health score ${data.healthScore}.`

    const embedding = await embedText(text)
    await event.data!.ref.update({ embedding })
  }
)

// nightly catch-all for any docs missing embeddings
export const nightly_embed = onSchedule(
  { schedule: '0 2 * * *', timeZone: 'Australia/Melbourne' },
  async () => {
    await indexHotelData('PILOT_HOTEL_ID')
  }
)
