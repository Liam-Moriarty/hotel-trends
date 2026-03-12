/**
 * scripts/seed-rag-data.ts
 *
 * Seeds the RAG-specific collections for Hotel Trends — Stage environment.
 * These collections are used by the AI chatbot (RAG pipeline) to answer
 * questions about hotel performance, operational alerts, and guest sentiment.
 *
 * Collections populated:
 *   /hotels/{hotelId}/snapshots/{date}   — daily performance summaries
 *   /hotels/{hotelId}/alerts/{alertId}   — operational alerts
 *   /hotels/{hotelId}/sentiment/{id}     — guest reviews / sentiment
 *
 * Usage:
 *   pnpm tsx scripts/seed-rag-data.ts              (targets stage by default)
 *   pnpm tsx scripts/seed-rag-data.ts --env dev    (targets dev emulator)
 *
 * After seeding, trigger indexing via:
 *   pnpm tsx scripts/run-index.ts
 */

import * as admin from 'firebase-admin'

// ---------------------------------------------------------------------------
// 1. Initialise Firebase Admin
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
// 2. Seed data
// ---------------------------------------------------------------------------

const snapshots = [
  {
    date: '2026-03-01',
    occupancy: 82,
    revpar: 185.5,
    adr: 226.2,
    healthScore: 88,
  },
  {
    date: '2026-03-02',
    occupancy: 79,
    revpar: 178.2,
    adr: 225.6,
    healthScore: 85,
  },
  {
    date: '2026-03-03',
    occupancy: 91,
    revpar: 205.3,
    adr: 225.6,
    healthScore: 94,
  },
  {
    date: '2026-03-04',
    occupancy: 95,
    revpar: 214.2,
    adr: 225.5,
    healthScore: 97,
  },
  {
    date: '2026-03-05',
    occupancy: 88,
    revpar: 198.6,
    adr: 225.7,
    healthScore: 91,
  },
  {
    date: '2026-03-06',
    occupancy: 74,
    revpar: 166.9,
    adr: 225.5,
    healthScore: 79,
  },
  {
    date: '2026-03-07',
    occupancy: 70,
    revpar: 157.9,
    adr: 225.6,
    healthScore: 75,
  },
  {
    date: '2026-03-08',
    occupancy: 83,
    revpar: 187.2,
    adr: 225.5,
    healthScore: 89,
  },
  {
    date: '2026-03-09',
    occupancy: 86,
    revpar: 194.0,
    adr: 225.6,
    healthScore: 92,
  },
  {
    date: '2026-03-10',
    occupancy: 93,
    revpar: 209.8,
    adr: 225.6,
    healthScore: 96,
  },
  {
    date: '2026-03-11',
    occupancy: 97,
    revpar: 218.8,
    adr: 225.6,
    healthScore: 98,
  },
  {
    date: '2026-03-12',
    occupancy: 90,
    revpar: 203.0,
    adr: 225.6,
    healthScore: 93,
  },
]

const alerts = [
  {
    alertId: 'ALT001',
    createdAt: '2026-03-10T08:15:00Z',
    title: 'High no-show rate detected',
    description:
      'No-show rate reached 8% on 2026-03-09, significantly above the 3% threshold. Revenue impact estimated at AUD $1,800. Review overbooking strategy.',
    severity: 'high',
    resolved: false,
  },
  {
    alertId: 'ALT002',
    createdAt: '2026-03-09T14:30:00Z',
    title: 'Weekend occupancy forecast above 95%',
    description:
      'Forecast models predict 96% occupancy for the upcoming weekend (2026-03-14 to 2026-03-16). Consider selective rate uplift on remaining inventory.',
    severity: 'info',
    resolved: false,
  },
  {
    alertId: 'ALT003',
    createdAt: '2026-03-08T09:00:00Z',
    title: 'OTA commission cost spike',
    description:
      'Booking.com channel commissions increased 12% MoM. Direct booking share has dropped to 31%. Recommend activating loyalty rate promotion.',
    severity: 'medium',
    resolved: false,
  },
  {
    alertId: 'ALT004',
    createdAt: '2026-03-07T11:45:00Z',
    title: 'Housekeeping delay — Floor 4',
    description:
      'Rooms 401–412 flagged late checkout. 6 rooms not ready by 3 PM check-in window. Guest complaints logged for rooms 405 and 409.',
    severity: 'medium',
    resolved: true,
  },
  {
    alertId: 'ALT005',
    createdAt: '2026-03-06T16:00:00Z',
    title: 'RevPAR below budget target',
    description:
      'RevPAR for the week of 2026-03-03 came in at $185.5 vs budget of $195.0 (-5.1%). Midweek leisure demand underperforming expectations.',
    severity: 'medium',
    resolved: false,
  },
]

const sentiment = [
  {
    sentimentId: 'SEN001',
    source: 'Google Reviews',
    date: '2026-03-11',
    score: 5,
    reviewText:
      'Absolutely stunning views from the upper floors. Staff were incredibly attentive and the breakfast was exceptional. Will definitely return for our next Melbourne trip.',
  },
  {
    sentimentId: 'SEN002',
    source: 'Booking.com',
    date: '2026-03-10',
    score: 4,
    reviewText:
      'Great location in the CBD, easy walk to restaurants and shopping. Room was clean and comfortable. Check-in was a bit slow but staff were friendly once we got to the desk.',
  },
  {
    sentimentId: 'SEN003',
    source: 'TripAdvisor',
    date: '2026-03-09',
    score: 2,
    reviewText:
      'Disappointed with the room on level 3 — noise from the street was loud all night. Requested a room change but was told the hotel was fully booked. Bed was comfortable but sleep quality suffered.',
  },
  {
    sentimentId: 'SEN004',
    source: 'Google Reviews',
    date: '2026-03-08',
    score: 5,
    reviewText:
      'Stayed for a conference at the convention centre next door. Perfect location. The restaurant on-site served excellent food. Room service was prompt. Highly recommend the suite upgrade.',
  },
  {
    sentimentId: 'SEN005',
    source: 'Expedia',
    date: '2026-03-07',
    score: 3,
    reviewText:
      'Average stay overall. The room felt dated compared to the photos online. Air conditioning was noisy. However, the pool area was lovely and the concierge was very helpful with restaurant recommendations.',
  },
  {
    sentimentId: 'SEN006',
    source: 'Booking.com',
    date: '2026-03-06',
    score: 4,
    reviewText:
      'Good value for a Melbourne city hotel. Parking was expensive but convenient. The gym facilities were well-maintained. Would stay again for business travel.',
  },
  {
    sentimentId: 'SEN007',
    source: 'TripAdvisor',
    date: '2026-03-05',
    score: 5,
    reviewText:
      'Celebrated our anniversary here. The team arranged a surprise room decoration with champagne — it was magical. Cannot fault the service or the room quality. Best hotel experience in Melbourne.',
  },
]

// ---------------------------------------------------------------------------
// 3. Write to Firestore
// ---------------------------------------------------------------------------

async function seedSnapshots(): Promise<void> {
  console.log('\n📊 Seeding snapshots...')
  const batch = db.batch()
  for (const snap of snapshots) {
    const ref = db.collection('hotels').doc(HOTEL_ID).collection('snapshots').doc(snap.date)
    batch.set(
      ref,
      { ...snap, hotelId: HOTEL_ID, seededAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
  await batch.commit()
  console.log(`  ✅ ${snapshots.length} snapshots → /hotels/${HOTEL_ID}/snapshots`)
}

async function seedAlerts(): Promise<void> {
  console.log('\n🚨 Seeding alerts...')
  const batch = db.batch()
  for (const alert of alerts) {
    const ref = db.collection('hotels').doc(HOTEL_ID).collection('alerts').doc(alert.alertId)
    batch.set(
      ref,
      { ...alert, hotelId: HOTEL_ID, seededAt: admin.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
  }
  await batch.commit()
  console.log(`  ✅ ${alerts.length} alerts → /hotels/${HOTEL_ID}/alerts`)
}

async function seedSentiment(): Promise<void> {
  console.log('\n⭐ Seeding sentiment...')
  const batch = db.batch()
  for (const review of sentiment) {
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
  console.log(`  ✅ ${sentiment.length} reviews → /hotels/${HOTEL_ID}/sentiment`)
}

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   Hotel Trends — RAG Data Seed Script        ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log(`\n  Environment : ${env}`)
  console.log(`  Project ID  : ${projectId}`)
  console.log(`  Hotel ID    : ${HOTEL_ID}`)

  try {
    await seedSnapshots()
    await seedAlerts()
    await seedSentiment()

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
