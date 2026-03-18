// ---------------------------------------------------------------------------
// Fetches the forward rate trend data from Firestore to power the
// Rate Trend by Room Type chart on the Revenue & Pricing page.
//
// Data source:
//   - hotels/{HOTEL_ID}/rateTrends — one doc per date with rates per room type
//
// Each document:
//   { date: "YYYY-MM-DD", STD: number, DLX: number, JNR: number, STE: number, PSTE: number }
//
// Returned array is sorted ascending by date, with `date` formatted as
// a short label (e.g. "Mar 18") for use as the chart XAxis dataKey.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { RateTrendDataPoint } from '@/interface'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

const RateTrendDocSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  STD: z.number(),
  DLX: z.number(),
  JNR: z.number(),
  STE: z.number(),
  PSTE: z.number(),
})

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function useRateTrend() {
  return useQuery({
    queryKey: ['rate-trend', HOTEL_ID],
    queryFn: async (): Promise<RateTrendDataPoint[]> => {
      const col = collection(db, `hotels/${HOTEL_ID}/rateTrends`)
      const q = query(col, orderBy('date', 'asc'), limit(28))
      const snap = await getDocs(q)

      return snap.docs
        .map(d => RateTrendDocSchema.safeParse(d.data()))
        .filter((r): r is { success: true; data: z.infer<typeof RateTrendDocSchema> } => r.success)
        .map(r => ({ ...r.data, date: formatDate(r.data.date) }))
    },
    staleTime: 5 * 60 * 1000,
  })
}
