// ---------------------------------------------------------------------------
// Fetches food waste docs for a date range.
// Returns data shaped exactly as FoodWasteDataPoint[] for the BarChart.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@repo/firebase-config'
import { HubOsFoodWasteSchema } from '@repo/shared'
import type { HubOsFoodWaste } from '@repo/shared'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

export function useHubOsFoodWaste(fromDate: string, toDate: string) {
  return useQuery({
    queryKey: ['hubos-food-waste', HOTEL_ID, fromDate, toDate],
    queryFn: async () => {
      const col = collection(db, `hotels/${HOTEL_ID}/hubos-food-waste`)
      const q = query(
        col,
        where('date', '>=', fromDate),
        where('date', '<=', toDate),
        orderBy('date', 'asc')
      )
      const snap = await getDocs(q)

      return snap.docs
        .map(d => HubOsFoodWasteSchema.safeParse(d.data()))
        .filter((r): r is { success: true; data: HubOsFoodWaste } => r.success)
        .map(r => r.data)
    },
    staleTime: 5 * 60 * 1000,
  })
}
