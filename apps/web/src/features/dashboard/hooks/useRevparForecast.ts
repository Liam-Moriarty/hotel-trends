// ---------------------------------------------------------------------------
// Fetches all snapshots and builds a monthly RevPAR chart for H1 2026.
//
// Logic per month:
//   - Past / current month  → actual = avg(revpar),           forecast = null
//   - Future month          → actual = null,                  forecast = avg(revparForecasted)
//
// Requires `revparForecasted` on every snapshot doc (0 for past months).
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { RevparDataPoint } from '@/interface'
import { MOCK_REVPAR_FORECAST } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// Only the fields this hook needs — other snapshot fields are ignored.
const RevparSnapshotSchema = z.object({
  date: z.string(),
  revpar: z.number(),
  revparForecasted: z.number().default(0),
})

export function useRevparForecast() {
  return useQuery({
    queryKey: ['revpar-forecast', HOTEL_ID],
    queryFn: MOCK
      ? () => Promise.resolve(MOCK_REVPAR_FORECAST)
      : async (): Promise<RevparDataPoint[]> => {
          const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
          const q = query(col, orderBy('date', 'asc'))
          const snap = await getDocs(q)

          const docs = snap.docs
            .map(d => RevparSnapshotSchema.safeParse(d.data()))
            .filter(
              (r): r is { success: true; data: z.infer<typeof RevparSnapshotSchema> } => r.success
            )
            .map(r => r.data)

          if (docs.length === 0) return []

          // Group snapshots by "YYYY-MM" key
          const grouped = new Map<string, z.infer<typeof RevparSnapshotSchema>[]>()
          for (const doc of docs) {
            const key = doc.date.slice(0, 7) // e.g. "2026-03"
            if (!grouped.has(key)) grouped.set(key, [])
            grouped.get(key)!.push(doc)
          }

          // Determine current month key to split actual vs forecast
          const today = new Date()
          const currentMonthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`

          return Array.from(grouped.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([monthKey, entries]) => {
              const monthIndex = Number(monthKey.split('-')[1]) - 1
              const monthLabel = MONTH_LABELS[monthIndex]
              const isPastOrCurrent = monthKey <= currentMonthKey

              if (isPastOrCurrent) {
                // Use avg of actual daily revpar
                const avg = entries.reduce((s, d) => s + d.revpar, 0) / entries.length
                return { month: monthLabel, actual: Math.round(avg * 10) / 10, forecast: null }
              } else {
                // Use avg of forecasted daily revpar
                const avg = entries.reduce((s, d) => s + d.revparForecasted, 0) / entries.length
                return { month: monthLabel, actual: null, forecast: Math.round(avg * 10) / 10 }
              }
            })
        },
    staleTime: 5 * 60 * 1000,
  })
}
