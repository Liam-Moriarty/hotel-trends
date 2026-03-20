//---------------------------------------------------------------------------
// Fetches hourly energy readings for a given date.
// Returns data shaped exactly as EnergyDataPoint[] for the AreaChart.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOsEnergyReadingSchema } from '@repo/shared'
import type { HubOsEnergyReading } from '@repo/shared'
import { MOCK_ENERGY } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

export function useHubOsEnergy(date: string) {
  return useQuery({
    queryKey: ['hubos-energy', HOTEL_ID, date],
    queryFn: MOCK
      ? () => Promise.resolve(MOCK_ENERGY)
      : async () => {
          const col = collection(db, `hotels/${HOTEL_ID}/hubos-energy`)
          const q = query(col, where('date', '==', date))
          const snap = await getDocs(q)

          const parsed = snap.docs
            .map(d => HubOsEnergyReadingSchema.safeParse(d.data()))
            .filter((r): r is { success: true; data: HubOsEnergyReading } => r.success)
            .map(r => r.data)

          // Sort by time ascending so AreaChart renders left→right correctly
          return parsed.sort((a, b) => a.time.localeCompare(b.time))
        },
    staleTime: 5 * 60 * 1000,
  })
}
