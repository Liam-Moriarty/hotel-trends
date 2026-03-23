// ---------------------------------------------------------------------------
// Fetches room rate data from Firestore to power the Room Rate Optimization
// table on the Revenue & Pricing page.
//
// Data sources:
//   - hotels/{HOTEL_ID}/ratePlans  — hotel's own Direct (DIR) rate per room type
//   - hotels/{HOTEL_ID}/compSet    — competitor hotels and their rates per room type
//   - hotels/{HOTEL_ID}/snapshots  — latest hotel-wide occupancy
//
// Derived fields:
//   - current   : Hotel's own Direct (DIR) rate plan rate per room type
//   - compAvg   : True average of competitor rates across all compSet hotels
//   - aiRec     : compAvg adjusted by occupancy factor (pricing heuristic)
//   - delta     : aiRec - current
//   - occupancy : Hotel-wide occupancy from latest daily snapshot
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { RoomRate } from '@/interface'
import { MOCK_ROOM_RATES } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

const RatePlanSchema = z.object({
  ratePlanCode: z.string(),
  rates: z.array(
    z.object({
      roomType: z.string(),
      ratePerNight: z.number(),
    })
  ),
})

const CompSetDocSchema = z.object({
  rates: z.record(z.string(), z.number()),
})

const SnapshotSchema = z.object({
  date: z.string(),
  occupancy: z.number(),
})

const ROOM_TYPE_LABELS: Record<string, string> = {
  STD: 'Standard',
  DLX: 'Deluxe',
  JNR: 'Junior Suite',
  STE: 'Suite',
  PSTE: 'Presidential Suite',
}

const ROOM_TYPE_ORDER = ['STD', 'DLX', 'JNR', 'STE', 'PSTE']

export function useRoomRates() {
  return useQuery({
    queryKey: ['room-rates', HOTEL_ID],
    queryFn: MOCK
      ? () => Promise.resolve(MOCK_ROOM_RATES)
      : async (): Promise<RoomRate[]> => {
          const [ratePlansSnap, compSetSnap, snapshotSnap] = await Promise.all([
            getDocs(collection(db, `hotels/${HOTEL_ID}/ratePlans`)),
            getDocs(collection(db, `hotels/${HOTEL_ID}/compSet`)),
            getDocs(
              query(
                collection(db, `hotels/${HOTEL_ID}/snapshots`),
                orderBy('date', 'desc'),
                limit(1)
              )
            ),
          ])

          const ratePlans = ratePlansSnap.docs
            .map(d => RatePlanSchema.safeParse(d.data()))
            .filter((r): r is { success: true; data: z.infer<typeof RatePlanSchema> } => r.success)
            .map(r => r.data)

          const competitors = compSetSnap.docs
            .map(d => CompSetDocSchema.safeParse(d.data()))
            .filter(
              (r): r is { success: true; data: z.infer<typeof CompSetDocSchema> } => r.success
            )
            .map(r => r.data)

          const snapshots = snapshotSnap.docs
            .map(d => SnapshotSchema.safeParse(d.data()))
            .filter((r): r is { success: true; data: z.infer<typeof SnapshotSchema> } => r.success)
            .map(r => r.data)

          const hotelOccupancy = snapshots[0]?.occupancy ?? 75
          const occupancyFactor = hotelOccupancy > 80 ? 1.06 : hotelOccupancy > 60 ? 1.03 : 0.98

          const directPlan = ratePlans.find(p => p.ratePlanCode === 'DIR')
          if (!directPlan) throw new Error('Direct rate plan (DIR) not found in Firestore.')
          if (competitors.length === 0)
            throw new Error('Comp set is empty. Run the seed script to populate competitor rates.')

          return ROOM_TYPE_ORDER.map(roomType => {
            const current = directPlan.rates.find(r => r.roomType === roomType)?.ratePerNight ?? 0

            const competitorRates = competitors
              .map(c => c.rates[roomType])
              .filter((r): r is number => typeof r === 'number')

            const compAvg =
              competitorRates.length > 0
                ? Math.round(
                    competitorRates.reduce((sum, r) => sum + r, 0) / competitorRates.length
                  )
                : (() => {
                    throw new Error(`No competitor rates found for room type ${roomType}.`)
                  })()

            const aiRec = Math.round(compAvg * occupancyFactor)
            const delta = aiRec - current

            return {
              type: ROOM_TYPE_LABELS[roomType] ?? roomType,
              current,
              compAvg,
              aiRec,
              delta,
              occupancy: Math.round(hotelOccupancy),
              applied: false,
            }
          })
        },
    staleTime: 5 * 60 * 1000,
  })
}
