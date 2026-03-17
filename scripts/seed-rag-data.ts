/**
 * scripts/seed-rag-data.ts
 *
 * Seeds the RAG-specific collections for Hotel Trends — Stage environment.
 * These collections are used by the AI chatbot (RAG pipeline) to answer
 * questions about hotel performance, operational alerts, and guest sentiment.
 *
 * Data is loaded from JSON files in scripts/seed-data/.
 *
 * Usage:
 *   pnpm tsx scripts/seed-rag-data.ts              (targets stage by default)
 *   pnpm tsx scripts/seed-rag-data.ts --env dev    (targets dev emulator)
 */

import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'
import { z } from 'zod'

// ---------------------------------------------------------------------------
// 1. Zod schemas for validation
// ---------------------------------------------------------------------------

const SnapshotSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  occupancy: z.number().min(0).max(100),
  revpar: z.number().nonnegative(),
  adr: z.number().nonnegative(),
  healthScore: z.number().min(0).max(100),
  // Added for RevenueChart: actual and forecasted daily revenue
  revenue: z.number().nonnegative(),
  revenueForecasted: z.number().nonnegative(),
  // Added for RevparForecast: AI-forecasted daily RevPAR (0 for past months)
  revparForecasted: z.number().nonnegative(),
  // Added for DeptPerformance: performance index (0–100) per department
  deptScores: z.object({
    Rooms: z.number().min(0).max(100),
    'F&B': z.number().min(0).max(100),
    Spa: z.number().min(0).max(100),
    Events: z.number().min(0).max(100),
    Ops: z.number().min(0).max(100),
  }),
})

const AlertSchema = z.object({
  alertId: z.string(),
  createdAt: z.string(),
  title: z.string(),
  description: z.string(),
  severity: z.string(), // z.enum(['low', 'medium', 'high', 'info'])
  resolved: z.boolean(),
})

const SentimentSchema = z.object({
  sentimentId: z.string(),
  source: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  score: z.number().min(1).max(5),
  reviewText: z.string(),
})

type Snapshot = z.infer<typeof SnapshotSchema>
type Alert = z.infer<typeof AlertSchema>
type Sentiment = z.infer<typeof SentimentSchema>

// ---------------------------------------------------------------------------
// 2. Initialise Firebase Admin
// ---------------------------------------------------------------------------

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

admin.initializeApp({ projectId })
const db = admin.firestore()
const HOTEL_ID = 'SAND01'

// ---------------------------------------------------------------------------
// 3. Helper to load and validate JSON
// ---------------------------------------------------------------------------

function loadAndValidate<T>(filename: string, schema: z.ZodSchema<T[]>): T[] {
  const filePath = path.resolve(__dirname, 'seed-data', filename)
  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed data file not found: ${filePath}`)
  }
  const raw: unknown = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const result = schema.safeParse(raw)
  if (!result.success) {
    const errors = result.error.errors.map(e => `  [${e.path.join('.')}] ${e.message}`).join('\n')
    throw new Error(`Validation failed for ${filename}:\n${errors}`)
  }
  console.log(`  ✅ ${filename} validated`)
  return result.data
}

// ---------------------------------------------------------------------------
// 4. Seed functions
// ---------------------------------------------------------------------------

async function seedSnapshots(data: Snapshot[]): Promise<void> {
  console.log('\n📊 Seeding snapshots...')
  const batch = db.batch()
  for (const snap of data) {
    const ref = db.collection('hotels').doc(HOTEL_ID).collection('snapshots').doc(snap.date)
    batch.set(
      ref,
      { ...snap, hotelId: HOTEL_ID, seededAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
  await batch.commit()
  console.log(`  ✅ ${data.length} snapshots → /hotels/${HOTEL_ID}/snapshots`)
}

async function seedAlerts(data: Alert[]): Promise<void> {
  console.log('\n🚨 Seeding alerts...')
  const batch = db.batch()
  for (const alert of data) {
    const ref = db.collection('hotels').doc(HOTEL_ID).collection('alerts').doc(alert.alertId)
    batch.set(
      ref,
      { ...alert, hotelId: HOTEL_ID, seededAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
  await batch.commit()
  console.log(`  ✅ ${data.length} alerts → /hotels/${HOTEL_ID}/alerts`)
}

async function seedSentiment(data: Sentiment[]): Promise<void> {
  console.log('\n⭐ Seeding sentiment...')
  const batch = db.batch()
  for (const review of data) {
    const ref = db
      .collection('hotels')
      .doc(HOTEL_ID)
      .collection('sentiment')
      .doc(review.sentimentId)
    batch.set(
      ref,
      { ...review, hotelId: HOTEL_ID, seededAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
  await batch.commit()
  console.log(`  ✅ ${data.length} reviews → /hotels/${HOTEL_ID}/sentiment`)
}

// ---------------------------------------------------------------------------
// 5. Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   Hotel Trends — RAG Data Seed Script        ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log(`\n  Environment : ${env}`)
  console.log(`  Project ID  : ${projectId}`)
  console.log(`  Hotel ID    : ${HOTEL_ID}`)

  console.log('\n🔍 Validating seed data files...')

  try {
    const snapshots = loadAndValidate('rag-snapshots.json', z.array(SnapshotSchema))
    const alerts = loadAndValidate('rag-alerts.json', z.array(AlertSchema))
    const sentiment = loadAndValidate('rag-sentiment.json', z.array(SentimentSchema))

    await seedSnapshots(snapshots)
    await seedAlerts(alerts)
    await seedSentiment(sentiment)

    console.log('\n╔══════════════════════════════════════════════╗')
    console.log('║           ✅ RAG seed complete!              ║')
    console.log('╚══════════════════════════════════════════════╝')
    console.log('\nNext step: run the indexer to generate embeddings:')
    console.log('  pnpm tsx scripts/run-index.ts\n')
  } catch (err) {
    console.error('\n❌ Seed failed:', err)
    process.exit(1)
  }
}

main()
