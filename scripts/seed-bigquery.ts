/**
 * scripts/seed-bigquery.ts
 *
 * Creates BigQuery dataset + tables and loads structured hotel data.
 * This powers the chatbot's analytical queries (revenue, occupancy, rate plans, rooms).
 *
 * Tables created in dataset `hotel_trends`:
 *   reservations   ← pms-reservations-mock.json
 *   availability   ← room-availability.json
 *   rate_plans     ← rate-plan-master.json
 *   rooms          ← hotel-rooms-master.json
 *
 * Usage:
 *   pnpm seed:bq
 */

import { BigQuery } from '@google-cloud/bigquery'
import * as fs from 'fs'
import * as path from 'path'

const PROJECT_ID = 'hotel-trends-stage'
const DATASET_ID = 'hotel_trends'
const HOTEL_ID = 'SAND01'

const bq = new BigQuery({ projectId: PROJECT_ID })

// ---------------------------------------------------------------------------
// Table schemas
// ---------------------------------------------------------------------------

const SCHEMAS = {
  reservations: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'reservationId', type: 'STRING' },
    { name: 'confirmationId', type: 'STRING' },
    { name: 'reservationStatus', type: 'STRING' },
    { name: 'arrivalDate', type: 'DATE' },
    { name: 'departureDate', type: 'DATE' },
    { name: 'nights', type: 'INTEGER' },
    { name: 'totalAmount', type: 'FLOAT' },
    { name: 'currencyCode', type: 'STRING' },
    { name: 'roomType', type: 'STRING' },
    { name: 'roomNumber', type: 'STRING' },
    { name: 'roomClass', type: 'STRING' },
    { name: 'ratePlanCode', type: 'STRING' },
    { name: 'marketCode', type: 'STRING' },
    { name: 'sourceCode', type: 'STRING' },
    { name: 'channel', type: 'STRING' },
    { name: 'paymentMethod', type: 'STRING' },
    { name: 'guaranteeCode', type: 'STRING' },
    { name: 'vipCode', type: 'STRING' },
    { name: 'createdBy', type: 'STRING' },
  ],
  availability: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'date', type: 'DATE' },
    { name: 'totalRooms', type: 'INTEGER' },
    { name: 'occupiedRooms', type: 'INTEGER' },
    { name: 'availableRooms', type: 'INTEGER' },
    { name: 'occupancyRate', type: 'FLOAT' },
  ],
  rate_plans: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'ratePlanCode', type: 'STRING' },
    { name: 'ratePlanName', type: 'STRING' },
    { name: 'marketCode', type: 'STRING' },
    { name: 'sourceCode', type: 'STRING' },
    { name: 'channel', type: 'STRING' },
    { name: 'isRefundable', type: 'BOOLEAN' },
    { name: 'cancellationPolicy', type: 'STRING' },
    { name: 'commissionPct', type: 'FLOAT' },
    { name: 'roomType', type: 'STRING' },
    { name: 'ratePerNight', type: 'FLOAT' },
  ],
  rooms: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'roomNumber', type: 'STRING' },
    { name: 'roomType', type: 'STRING' },
    { name: 'roomClass', type: 'STRING' },
    { name: 'floor', type: 'INTEGER' },
    { name: 'maxOccupancy', type: 'INTEGER' },
    { name: 'baseRatePerNight', type: 'FLOAT' },
    { name: 'isActive', type: 'BOOLEAN' },
  ],
  snapshots: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'date', type: 'DATE' },
    { name: 'occupancy', type: 'INTEGER' },
    { name: 'revpar', type: 'FLOAT' },
    { name: 'adr', type: 'FLOAT' },
    { name: 'healthScore', type: 'INTEGER' },
  ],
  alerts: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'alertId', type: 'STRING' },
    { name: 'createdAt', type: 'TIMESTAMP' },
    { name: 'title', type: 'STRING' },
    { name: 'description', type: 'STRING' },
    { name: 'severity', type: 'STRING' },
    { name: 'resolved', type: 'BOOLEAN' },
  ],
  sentiment: [
    { name: 'hotelId', type: 'STRING' },
    { name: 'sentimentId', type: 'STRING' },
    { name: 'source', type: 'STRING' },
    { name: 'date', type: 'DATE' },
    { name: 'score', type: 'INTEGER' },
    { name: 'reviewText', type: 'STRING' },
  ],
}

// ---------------------------------------------------------------------------
// Data transformers
// ---------------------------------------------------------------------------

function loadJson(filename: string): unknown {
  const filePath = path.resolve('scripts/seed-data', filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function transformReservations(): Record<string, unknown>[] {
  const raw = loadJson('pms-reservations-mock.json') as {
    reservations: {
      hotelId: string
      reservationInfo: Array<{
        reservationIdList: Array<{ id: string; type: string }>
        reservationStatus: string
        roomStay: {
          arrivalDate: string
          departureDate: string
          totalAmount: { amount: number; currencyCode: string }
          roomDetails: { roomType: string; roomNumber: string | null; roomClass: string }
          ratePlans: Array<{ ratePlanCode: string; marketCode: string; sourceCode: string }>
        }
        guestDetails: { customer: { membership: Array<unknown> } }
        paymentMethod: string
        guaranteeCode: string
        vipCode: string | null
        createdBy: string
      }>
    }
  }

  const rows: Record<string, unknown>[] = []
  for (const r of raw.reservations.reservationInfo) {
    const resId = r.reservationIdList.find(i => i.type === 'Reservation')?.id ?? ''
    const confId = r.reservationIdList.find(i => i.type === 'Confirmation')?.id ?? null
    if (!resId) continue

    const rs = r.roomStay
    const ratePlan = rs.ratePlans[0]
    const arrival = new Date(rs.arrivalDate)
    const departure = new Date(rs.departureDate)
    const nights = Math.round((departure.getTime() - arrival.getTime()) / 86400000)

    // map sourceCode to channel
    const channelMap: Record<string, string> = {
      BKGCOM: 'Booking.com',
      EXPDIA: 'Expedia',
      DIRECT: 'Direct',
      COLD: 'Direct',
      GDS: 'GDS',
    }

    rows.push({
      hotelId: HOTEL_ID,
      reservationId: resId,
      confirmationId: confId,
      reservationStatus: r.reservationStatus,
      arrivalDate: rs.arrivalDate,
      departureDate: rs.departureDate,
      nights,
      totalAmount: rs.totalAmount.amount,
      currencyCode: rs.totalAmount.currencyCode,
      roomType: rs.roomDetails.roomType,
      roomNumber: rs.roomDetails.roomNumber ?? null,
      roomClass: rs.roomDetails.roomClass,
      ratePlanCode: ratePlan?.ratePlanCode ?? null,
      marketCode: ratePlan?.marketCode ?? null,
      sourceCode: ratePlan?.sourceCode ?? null,
      channel: channelMap[ratePlan?.sourceCode ?? ''] ?? ratePlan?.sourceCode ?? null,
      paymentMethod: r.paymentMethod,
      guaranteeCode: r.guaranteeCode,
      vipCode: r.vipCode ?? null,
      createdBy: r.createdBy,
    })
  }
  return rows
}

function transformAvailability(): Record<string, unknown>[] {
  const raw = loadJson('room-availability.json') as {
    roomAvailability: {
      dailySummary: Array<{
        date: string
        totalRooms: number
        occupiedRooms: number
        availableRooms: number
        occupancyRate: number
      }>
    }
  }

  return raw.roomAvailability.dailySummary.map(d => ({
    hotelId: HOTEL_ID,
    date: d.date,
    totalRooms: d.totalRooms,
    occupiedRooms: d.occupiedRooms,
    availableRooms: d.availableRooms,
    occupancyRate: d.occupancyRate,
  }))
}

function transformRatePlans(): Record<string, unknown>[] {
  const raw = loadJson('rate-plan-master.json') as {
    ratePlans: {
      plans: Array<{
        ratePlanCode: string
        ratePlanName: string
        marketCode: string
        sourceCode: string
        channel: string
        isRefundable: boolean
        cancellationPolicy: string
        commissionPct: number
        rates: Array<{ roomType: string; ratePerNight: number }>
      }>
    }
  }

  const rows: Record<string, unknown>[] = []
  for (const plan of raw.ratePlans.plans) {
    for (const rate of plan.rates) {
      rows.push({
        hotelId: HOTEL_ID,
        ratePlanCode: plan.ratePlanCode,
        ratePlanName: plan.ratePlanName,
        marketCode: plan.marketCode,
        sourceCode: plan.sourceCode,
        channel: plan.channel,
        isRefundable: plan.isRefundable,
        cancellationPolicy: plan.cancellationPolicy,
        commissionPct: plan.commissionPct,
        roomType: rate.roomType,
        ratePerNight: rate.ratePerNight,
      })
    }
  }
  return rows
}

function transformRooms(): Record<string, unknown>[] {
  const raw = loadJson('hotel-rooms-master.json') as {
    hotel: {
      rooms: Array<{
        roomNumber: string
        roomType: string
        roomClass: string
        floor: number
        maxOccupancy: number
        baseRatePerNight: number
        isActive: boolean
      }>
    }
  }

  return raw.hotel.rooms.map(r => ({
    hotelId: HOTEL_ID,
    roomNumber: r.roomNumber,
    roomType: r.roomType,
    roomClass: r.roomClass,
    floor: r.floor,
    maxOccupancy: r.maxOccupancy,
    baseRatePerNight: r.baseRatePerNight,
    isActive: r.isActive,
  }))
}

function transformSnapshots(): Record<string, unknown>[] {
  const raw = loadJson('rag-snapshots.json') as Array<{
    date: string
    occupancy: number
    revpar: number
    adr: number
    healthScore: number
  }>
  return raw.map(s => ({ hotelId: HOTEL_ID, ...s }))
}

function transformAlerts(): Record<string, unknown>[] {
  const raw = loadJson('rag-alerts.json') as Array<{
    alertId: string
    createdAt: string
    title: string
    description: string
    severity: string
    resolved: boolean
  }>
  return raw.map(a => ({
    hotelId: HOTEL_ID,
    ...a,
    createdAt: new Date(a.createdAt).toISOString().replace('T', ' ').replace('Z', ''),
  }))
}

function transformSentiment(): Record<string, unknown>[] {
  const raw = loadJson('rag-sentiment.json') as Array<{
    sentimentId: string
    source: string
    date: string
    score: number
    reviewText: string
  }>
  return raw.map(s => ({ hotelId: HOTEL_ID, ...s }))
}

// ---------------------------------------------------------------------------
// BigQuery helpers
// ---------------------------------------------------------------------------

async function ensureDataset(): Promise<void> {
  const dataset = bq.dataset(DATASET_ID)
  const [exists] = await dataset.exists()
  if (!exists) {
    await dataset.create({ location: 'asia-southeast1' })
    console.log(`  ✅ Dataset ${DATASET_ID} created`)
  } else {
    console.log(`  ℹ️  Dataset ${DATASET_ID} already exists`)
  }
}

async function loadTable(
  tableName: keyof typeof SCHEMAS,
  rows: Record<string, unknown>[]
): Promise<void> {
  const table = bq.dataset(DATASET_ID).table(tableName)
  const [exists] = await table.exists()

  if (exists) {
    await table.delete()
    console.log(`  🗑️  Dropped existing table ${tableName}`)
  }

  await table.create({ schema: SCHEMAS[tableName] })
  await table.insert(rows)
  console.log(`  ✅ ${rows.length} rows → ${DATASET_ID}.${tableName}`)
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   Hotel Trends — BigQuery Seed Script        ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log(`\n  Project  : ${PROJECT_ID}`)
  console.log(`  Dataset  : ${DATASET_ID}`)
  console.log(`  Hotel ID : ${HOTEL_ID}\n`)

  try {
    await ensureDataset()

    console.log('\n📋 Loading reservations...')
    await loadTable('reservations', transformReservations())

    console.log('\n📅 Loading availability...')
    await loadTable('availability', transformAvailability())

    console.log('\n💰 Loading rate plans...')
    await loadTable('rate_plans', transformRatePlans())

    console.log('\n🛏️  Loading rooms...')
    await loadTable('rooms', transformRooms())

    console.log('\n📊 Loading snapshots...')
    await loadTable('snapshots', transformSnapshots())

    console.log('\n🚨 Loading alerts...')
    await loadTable('alerts', transformAlerts())

    console.log('\n⭐ Loading sentiment...')
    await loadTable('sentiment', transformSentiment())

    console.log('\n╔══════════════════════════════════════════════╗')
    console.log('║       ✅ BigQuery seed complete!             ║')
    console.log('╚══════════════════════════════════════════════╝')
    console.log(`\nView at: https://console.cloud.google.com/bigquery?project=${PROJECT_ID}\n`)
  } catch (err) {
    console.error('\n❌ Seed failed:', err)
    process.exit(1)
  }
}

main()
