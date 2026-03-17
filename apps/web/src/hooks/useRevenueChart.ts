// ---------------------------------------------------------------------------
// Fetches the last 7 daily snapshots and returns chart-ready data for
// RevenueChart. Each snapshot must have two fields (added to Firestore):
//   - revenue          : number  — actual revenue collected that day
//   - revenueForecasted: number  — forecasted revenue for that day
// Falls back to 0 if either field is missing (backward-compatible).
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { RevenueDataPoint } from '@/interface'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Only the fields this hook cares about — other snapshot fields are ignored.
const RevenueSnapshotSchema = z.object({
  date: z.string(),
  revenue: z.number().default(0),
  revenueForecasted: z.number().default(0),
})

export function useRevenueChart() {
  return useQuery({
    queryKey: ['revenue-chart', HOTEL_ID],
    queryFn: async (): Promise<RevenueDataPoint[]> => {
      const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
      // Fetch the 7 most-recent snapshots (one per day).
      const q = query(col, orderBy('date', 'desc'), limit(7))
      const snap = await getDocs(q)

      const docs = snap.docs
        .map(d => RevenueSnapshotSchema.safeParse(d.data()))
        .filter(
          (r): r is { success: true; data: z.infer<typeof RevenueSnapshotSchema> } => r.success
        )
        .map(r => r.data)
        .reverse() // oldest → newest so the chart reads left-to-right

      return docs.map(doc => ({
        day: DAY_LABELS[new Date(doc.date).getDay()],
        actual: doc.revenue,
        forecast: doc.revenueForecasted,
      }))
    },
    staleTime: 5 * 60 * 1000,
  })
}
