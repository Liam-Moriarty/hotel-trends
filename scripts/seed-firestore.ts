/**
 * scripts/seed-firestore.ts
 *
 * Firestore seed script for Hotel Trends — Stage environment.
 * Fully type-safe — all data is validated through Zod schemas from
 * packages/shared before any Firestore write is attempted.
 *
 * Collections populated:
 *   /hotels/{hotelId}                         — hotel metadata
 *   /hotels/{hotelId}/rooms/{roomNumber}       — rooms master
 *   /hotels/{hotelId}/ratePlans/{planId}       — rate plan master
 *   /hotels/{hotelId}/availability/{date}      — nightly availability summary
 *   /hotels/{hotelId}/revenue/{reservationId}  — per-reservation revenue records
 *   /hotels/{hotelId}/guests/{profileId}       — guest profiles
 *
 * Usage:
 *   pnpm seed                  (targets stage by default)
 *   pnpm seed --env dev        (targets dev emulator)
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS set, OR Firebase CLI logged in
 *   - Firebase project alias `stage` configured in .firebaserc
 *   - pnpm install has been run
 */

import * as admin from 'firebase-admin'
import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'
import { z } from 'zod'

import {
  PmsReservationsPayloadSchema,
  type PmsReservationsPayload,
  getReservationId,
  getPrimaryGuest,
  getLengthOfStay,
} from '../packages/shared/src/schemas/integrations'

import {
  HubOSRoomSchema,
  HubOSTaskSchema,
  HubOSRosterEntrySchema,
} from '../packages/shared/src/schemas/hubos'

// ---------------------------------------------------------------------------
// Zod schemas for supplementary seed data files
// ---------------------------------------------------------------------------

const RoomTypeEnum = z.enum(['STD', 'DLX', 'JNR', 'STE', 'PSTE'])
const RoomClassEnum = z.enum(['Standard', 'Junior Suite', 'Suite', 'Presidential'])

const RoomSchema = z.object({
  roomNumber: z.string().min(1),
  roomType: RoomTypeEnum,
  roomClass: RoomClassEnum,
  floor: z.number().int().positive(),
  maxOccupancy: z.number().int().positive(),
  baseRatePerNight: z.number().positive(),
  isActive: z.boolean(),
})

const RoomTypeSummarySchema = z.object({
  roomType: RoomTypeEnum,
  roomClass: RoomClassEnum,
  count: z.number().int().positive(),
  baseRatePerNight: z.number().positive(),
})

const HotelMasterSchema = z.object({
  hotel: z.object({
    hotelId: z.string().min(1),
    hotelName: z.string().min(1),
    starRating: z.number().int().min(1).max(5),
    city: z.string().min(1),
    country: z.string().min(1),
    currencyCode: z.string().length(3),
    timezone: z.string().min(1),
    totalRooms: z.number().int().positive(),
    floors: z.number().int().positive(),
    rooms: z.array(RoomSchema).min(1),
    roomTypeSummary: z.array(RoomTypeSummarySchema).min(1),
  }),
})

const RatePerRoomSchema = z.object({
  roomType: RoomTypeEnum,
  ratePerNight: z.number().positive(),
})

const RatePlanSchema = z.object({
  ratePlanCode: z.string().min(1),
  ratePlanName: z.string().min(1),
  marketCode: z.string().min(1),
  sourceCode: z.string().min(1),
  channel: z.string().min(1),
  isRefundable: z.boolean(),
  cancellationPolicy: z.string().min(1),
  commissionPct: z.number().min(0).max(100),
  rates: z.array(RatePerRoomSchema).min(1),
})

const RatePlanMasterSchema = z.object({
  ratePlans: z.object({
    hotelId: z.string().min(1),
    plans: z.array(RatePlanSchema).min(1),
  }),
})

const RoomNightDetailSchema = z.object({
  hotelId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  roomNumber: z.string().min(1),
  roomType: RoomTypeEnum,
  status: z.enum(['Occupied', 'Available']),
  isOccupied: z.boolean(),
})

const DailySummarySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  totalRooms: z.number().int().nonnegative(),
  occupiedRooms: z.number().int().nonnegative(),
  availableRooms: z.number().int().nonnegative(),
  occupancyRate: z.number().min(0).max(100),
})

const RoomAvailabilitySchema = z.object({
  roomAvailability: z.object({
    hotelId: z.string().min(1),
    totalRooms: z.number().int().positive(),
    periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dailySummary: z.array(DailySummarySchema),
    roomNightDetail: z.array(RoomNightDetailSchema),
  }),
})

const HubOSPayloadSchema = z.object({
  hubos: z.object({
    hotelId: z.string().min(1),
    rooms: z.array(HubOSRoomSchema),
    tasks: z.array(HubOSTaskSchema),
    roster: z.array(HubOSRosterEntrySchema),
  }),
})

type HubOSPayload = z.infer<typeof HubOSPayloadSchema>

// Inferred types
type HotelMaster = z.infer<typeof HotelMasterSchema>
type RatePlanMaster = z.infer<typeof RatePlanMasterSchema>
type RoomAvailability = z.infer<typeof RoomAvailabilitySchema>
type Room = z.infer<typeof RoomSchema>
type RatePlan = z.infer<typeof RatePlanSchema>

// ---------------------------------------------------------------------------
// Firestore document interfaces (what gets written — no `any`, no `object`)
// ---------------------------------------------------------------------------

interface HotelDoc {
  hotelId: string
  hotelName: string
  starRating: number
  city: string
  country: string
  currencyCode: string
  timezone: string
  totalRooms: number
  floors: number
  roomTypeSummary: HotelMaster['hotel']['roomTypeSummary']
  seededAt: admin.firestore.FieldValue
}

interface RoomDoc extends Room {
  hotelId: string
  seededAt: admin.firestore.FieldValue
}

interface RatePlanDoc extends RatePlan {
  hotelId: string
  seededAt: admin.firestore.FieldValue
}

interface AvailabilityDoc {
  hotelId: string
  date: string
  totalRooms: number
  occupiedRooms: number
  availableRooms: number
  occupancyRate: number
  seededAt: admin.firestore.FieldValue
}

interface RevenueDoc {
  hotelId: string
  reservationId: string
  confirmationId: string | undefined
  externalId: string | undefined
  reservationStatus: string
  arrivalDate: string
  departureDate: string
  nights: number
  totalAmount: number
  currencyCode: string
  roomType: string
  roomNumber: string | null
  roomClass: string
  ratePlanCode: string
  marketCode: string
  sourceCode: string
  paymentMethod: string
  guaranteeCode: string
  vipCode: string | null | undefined
  blockCode: string | null
  blockId: string | null
  createdBy: string
  seededAt: admin.firestore.FieldValue
}

interface GuestDoc {
  hotelId: string
  profileId: string
  givenName: string | undefined
  surname: string | undefined
  membershipType: string | null
  membershipLevel: string | null
  membershipNumber: string | null
  lastReservationId: string | undefined
  lastArrivalDate: string
  vipCode: string | null | undefined
  seededAt: admin.firestore.FieldValue
}

interface HubOSRoomDoc {
  hotelId: string
  roomNumber: string
  floor: number
  roomType: string
  status: string
  assignedAttendant: string | null
  guestName: string | null
  checkoutTime: string | null
  notes: string | null
  lastUpdated: string
  seededAt: admin.firestore.FieldValue
}

interface HubOSTaskDoc {
  hotelId: string
  taskId: string
  roomNumber: string | null
  area: string
  description: string
  status: string
  priority: string
  assignedTo: string | null
  reportedAt: string
  resolvedAt: string | null
  seededAt: admin.firestore.FieldValue
}

interface HubOSRosterDoc {
  hotelId: string
  department: string
  shiftStart: string
  shiftEnd: string
  scheduled: number
  actual: number
  overtimeHours: number
  staffingStatus: string
  seededAt: admin.firestore.FieldValue
}

type FirestoreDoc =
  | HotelDoc
  | RoomDoc
  | RatePlanDoc
  | AvailabilityDoc
  | RevenueDoc
  | GuestDoc
  | HubOSRoomDoc
  | HubOSTaskDoc
  | HubOSRosterDoc

type WriteOperation = {
  ref: admin.firestore.DocumentReference
  data: FirestoreDoc
}

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

if (env === 'prod' && !args.includes('--force')) {
  console.error('❌ Seeding production is blocked. Pass --force if you really mean it.')
  process.exit(1)
}

admin.initializeApp({ projectId })
const db = admin.firestore()
db.settings({ ignoreUndefinedProperties: true })
const HOTEL_ID = 'SAND01'

// ---------------------------------------------------------------------------
// 2. Load + validate through Zod — no raw `unknown` escapes past this point
// ---------------------------------------------------------------------------

function loadAndValidate<T>(filename: string, schema: z.ZodType<T>): T {
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
// 3. Batch write helper
// ---------------------------------------------------------------------------

async function batchWrite(writes: WriteOperation[]): Promise<void> {
  const BATCH_SIZE = 400
  for (let i = 0; i < writes.length; i += BATCH_SIZE) {
    const chunk = writes.slice(i, i + BATCH_SIZE)
    const batch = db.batch()
    for (const { ref, data } of chunk) {
      batch.set(ref, data, { merge: true })
    }
    await batch.commit()
    console.log(`  ✅ Committed ${chunk.length} writes (${i + chunk.length}/${writes.length})`)
  }
}

// ---------------------------------------------------------------------------
// 4. Seed functions
// ---------------------------------------------------------------------------

async function seedHotelMaster(data: HotelMaster): Promise<void> {
  console.log('\n📌 Seeding hotel master...')
  const { hotel } = data
  const doc: HotelDoc = {
    hotelId: hotel.hotelId,
    hotelName: hotel.hotelName,
    starRating: hotel.starRating,
    city: hotel.city,
    country: hotel.country,
    currencyCode: hotel.currencyCode,
    timezone: hotel.timezone,
    totalRooms: hotel.totalRooms,
    floors: hotel.floors,
    roomTypeSummary: hotel.roomTypeSummary,
    seededAt: admin.firestore.FieldValue.serverTimestamp(),
  }
  await db.collection('hotels').doc(HOTEL_ID).set(doc, { merge: true })
  console.log(`  ✅ /hotels/${HOTEL_ID}`)
}

async function seedRooms(data: HotelMaster): Promise<void> {
  console.log('\n🛏️  Seeding rooms...')
  const writes: WriteOperation[] = data.hotel.rooms.map(room => ({
    ref: db.collection('hotels').doc(HOTEL_ID).collection('rooms').doc(room.roomNumber),
    data: {
      ...room,
      hotelId: HOTEL_ID,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    } satisfies RoomDoc,
  }))
  await batchWrite(writes)
  console.log(`  ✅ ${writes.length} rooms → /hotels/${HOTEL_ID}/rooms`)
}

async function seedRatePlans(data: RatePlanMaster): Promise<void> {
  console.log('\n💰 Seeding rate plans...')
  const writes: WriteOperation[] = data.ratePlans.plans.map((plan, i) => ({
    ref: db
      .collection('hotels')
      .doc(HOTEL_ID)
      .collection('ratePlans')
      .doc(`${plan.ratePlanCode}-${plan.sourceCode}-${i}`),
    data: {
      ...plan,
      hotelId: HOTEL_ID,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    } satisfies RatePlanDoc,
  }))
  await batchWrite(writes)
  console.log(`  ✅ ${writes.length} rate plans → /hotels/${HOTEL_ID}/ratePlans`)
}

async function seedAvailability(data: RoomAvailability): Promise<void> {
  console.log('\n📅 Seeding availability...')
  const byDate = new Map<string, { occupied: number; available: number }>()
  for (const record of data.roomAvailability.roomNightDetail) {
    const entry = byDate.get(record.date) ?? { occupied: 0, available: 0 }
    if (record.isOccupied) entry.occupied += 1
    else entry.available += 1
    byDate.set(record.date, entry)
  }
  const writes: WriteOperation[] = Array.from(byDate.entries()).map(([date, counts]) => {
    const total = counts.occupied + counts.available
    const doc: AvailabilityDoc = {
      hotelId: HOTEL_ID,
      date,
      totalRooms: total,
      occupiedRooms: counts.occupied,
      availableRooms: counts.available,
      occupancyRate: total > 0 ? Math.round((counts.occupied / total) * 1000) / 10 : 0,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    return {
      ref: db.collection('hotels').doc(HOTEL_ID).collection('availability').doc(date),
      data: doc,
    }
  })
  await batchWrite(writes)
  console.log(`  ✅ ${writes.length} days → /hotels/${HOTEL_ID}/availability`)
}

async function seedReservations(data: PmsReservationsPayload): Promise<void> {
  console.log('\n📋 Seeding reservations → revenue + guests...')
  const revenueWrites: WriteOperation[] = []
  const guestWrites: WriteOperation[] = []

  for (const reservation of data.reservations.reservationInfo) {
    const reservationId = getReservationId(reservation, 'Reservation')
    const confirmationId = getReservationId(reservation, 'Confirmation')
    const externalId = getReservationId(reservation, 'External')
    const primaryGuest = getPrimaryGuest(reservation)
    const nights = getLengthOfStay(reservation)
    const rs = reservation.roomStay
    const ratePlan = rs.ratePlans[0]
    const membership = reservation.guestDetails.customer.membership[0] ?? null
    const profileId = reservation.guestDetails.customer.profileIdList[0]?.id ?? reservationId

    if (!reservationId) continue

    const revenueDoc: RevenueDoc = {
      hotelId: HOTEL_ID,
      reservationId,
      confirmationId,
      externalId,
      reservationStatus: reservation.reservationStatus,
      arrivalDate: rs.arrivalDate,
      departureDate: rs.departureDate,
      nights,
      totalAmount: rs.totalAmount.amount,
      currencyCode: rs.totalAmount.currencyCode,
      roomType: rs.roomDetails.roomType,
      roomNumber: rs.roomDetails.roomNumber,
      roomClass: rs.roomDetails.roomClass,
      ratePlanCode: ratePlan.ratePlanCode,
      marketCode: ratePlan.marketCode,
      sourceCode: ratePlan.sourceCode,
      paymentMethod: reservation.paymentMethod,
      guaranteeCode: reservation.guaranteeCode,
      vipCode: reservation.vipCode,
      blockCode: reservation.blockInfo?.blockCode ?? null,
      blockId: reservation.blockInfo?.blockId ?? null,
      createdBy: reservation.createdBy,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    }
    revenueWrites.push({
      ref: db.collection('hotels').doc(HOTEL_ID).collection('revenue').doc(reservationId),
      data: revenueDoc,
    })

    if (reservation.reservationStatus !== 'Cancelled' && profileId) {
      const guestDoc: GuestDoc = {
        hotelId: HOTEL_ID,
        profileId,
        givenName: primaryGuest?.givenName,
        surname: primaryGuest?.surname,
        membershipType: membership?.membershipType ?? null,
        membershipLevel: membership?.membershipLevel ?? null,
        membershipNumber: membership?.membershipNumber ?? null,
        lastReservationId: reservationId,
        lastArrivalDate: rs.arrivalDate,
        vipCode: reservation.vipCode,
        seededAt: admin.firestore.FieldValue.serverTimestamp(),
      }
      guestWrites.push({
        ref: db.collection('hotels').doc(HOTEL_ID).collection('guests').doc(profileId),
        data: guestDoc,
      })
    }
  }

  await batchWrite(revenueWrites)
  console.log(`  ✅ ${revenueWrites.length} revenue docs → /hotels/${HOTEL_ID}/revenue`)
  await batchWrite(guestWrites)
  console.log(`  ✅ ${guestWrites.length} guest docs → /hotels/${HOTEL_ID}/guests`)
}

// ---------------------------------------------------------------------------
// 5. Confirmation prompt
// ---------------------------------------------------------------------------

async function confirm(message: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise(resolve => {
    rl.question(`${message} (y/N): `, answer => {
      rl.close()
      resolve(answer.toLowerCase() === 'y')
    })
  })
}

async function seedHubOS(data: HubOSPayload): Promise<void> {
  console.log('\n🏨 Seeding Hub OS data...')

  const roomWrites: WriteOperation[] = data.hubos.rooms.map(room => ({
    ref: db.collection('hotels').doc(HOTEL_ID).collection('hubos-rooms').doc(room.roomNumber),
    data: {
      ...room,
      hotelId: HOTEL_ID,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    } satisfies HubOSRoomDoc,
  }))

  const taskWrites: WriteOperation[] = data.hubos.tasks.map(task => ({
    ref: db.collection('hotels').doc(HOTEL_ID).collection('hubos-tasks').doc(task.taskId),
    data: {
      ...task,
      hotelId: HOTEL_ID,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    } satisfies HubOSTaskDoc,
  }))

  const rosterWrites: WriteOperation[] = data.hubos.roster.map(entry => ({
    ref: db.collection('hotels').doc(HOTEL_ID).collection('hubos-roster').doc(entry.department),
    data: {
      ...entry,
      hotelId: HOTEL_ID,
      seededAt: admin.firestore.FieldValue.serverTimestamp(),
    } satisfies HubOSRosterDoc,
  }))

  await batchWrite(roomWrites)
  console.log(`  ✅ ${roomWrites.length} rooms → /hotels/${HOTEL_ID}/hubos-rooms`)

  await batchWrite(taskWrites)
  console.log(`  ✅ ${taskWrites.length} tasks → /hotels/${HOTEL_ID}/hubos-tasks`)

  await batchWrite(rosterWrites)
  console.log(`  ✅ ${rosterWrites.length} roster entries → /hotels/${HOTEL_ID}/hubos-roster`)
}

// ---------------------------------------------------------------------------
// 6. Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║     Hotel Trends — Firestore Seed Script     ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log(`\n  Environment : ${env}`)
  console.log(`  Project ID  : ${projectId}`)
  console.log(`  Hotel ID    : ${HOTEL_ID}`)

  console.log('\n🔍 Validating seed data files...')

  try {
    const hotelData = loadAndValidate('hotel-rooms-master.json', HotelMasterSchema)
    const ratePlanData = loadAndValidate('rate-plan-master.json', RatePlanMasterSchema)
    const availabilityData = loadAndValidate('room-availability.json', RoomAvailabilitySchema)
    const reservationData = loadAndValidate(
      'pms-reservations-mock.json',
      PmsReservationsPayloadSchema
    )

    console.log('\n  ✅ All files valid — no type errors found')

    const proceed = await confirm(`\n⚠️  Write to Firebase [${env}] project "${projectId}"?`)
    if (!proceed) {
      console.log('Aborted.')
      process.exit(0)
    }

    await seedHotelMaster(hotelData)
    await seedRooms(hotelData)
    await seedRatePlans(ratePlanData)
    await seedAvailability(availabilityData)
    await seedReservations(reservationData)
    const hubosData = loadAndValidate('hubos-mock.json', HubOSPayloadSchema)
    await seedHubOS(hubosData)

    console.log('\n╔══════════════════════════════════════════════╗')
    console.log('║           ✅ Seed complete!                  ║')
    console.log('╚══════════════════════════════════════════════╝')
    console.log(
      `\nVerify at:\nhttps://console.firebase.google.com/project/${projectId}/firestore\n`
    )
  } catch (err) {
    console.error('\n❌ Seed failed:', err)
    process.exit(1)
  }
}

main()
