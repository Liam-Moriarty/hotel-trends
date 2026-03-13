/**
 * scripts/run-index.ts
 *
 * Manually triggers the RAG indexing pipeline for a given hotel.
 * Reads documents from snapshots, alerts, and sentiment collections,
 * generates Vertex AI embeddings, and writes them back to Firestore.
 *
 * Run this after seeding RAG data to make documents searchable.
 *
 * Usage:
 *   pnpm tsx scripts/run-index.ts              (targets stage by default)
 *   pnpm tsx scripts/run-index.ts --env dev    (targets dev emulator)
 */

import * as admin from 'firebase-admin'

const args = process.argv.slice(2)
const envFlag = args.indexOf('--env')
const env = envFlag !== -1 ? args[envFlag + 1] ?? 'stage' : 'stage'

const projectIds: Record<string, string> = {
  dev: 'hotel-trends',
  stage: 'hotel-trends-stage',
  prod: 'hotel-trends-prod',
}

const projectId = projectIds[env]
if (!projectId) {
  console.error(`❌ Unknown env "${env}". Use: dev | stage | prod`)
  process.exit(1)
}

if (env === 'dev') {
  process.env['FIRESTORE_EMULATOR_HOST'] = 'localhost:8080'
}

process.env['GCLOUD_PROJECT'] = projectId

admin.initializeApp({ projectId })

const HOTEL_ID = 'SAND01'

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   Hotel Trends — RAG Indexer                 ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log(`\n  Environment : ${env}`)
  console.log(`  Project ID  : ${projectId}`)
  console.log(`  Hotel ID    : ${HOTEL_ID}`)
  console.log('\n⚙️  Running indexHotelData...\n')

  // Dynamic import so Firebase Admin is initialized before the services load
  const { indexHotelData } = await import('../apps/functions/src/services/indexAll.js')
  await indexHotelData(HOTEL_ID)

  console.log('\n╔══════════════════════════════════════════════╗')
  console.log('║           ✅ Indexing complete!              ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log('\nThe chatbot can now answer questions about hotel data.\n')
}

main().catch(err => {
  console.error('\n❌ Indexing failed:', err)
  process.exit(1)
})
