// ---------------------------------------------------------------------------
// Fetches daily occupancy snapshots from Firestore and builds the calendar
// grid used by the OccupancyHeatmap component.
//
// Data source:
//   - hotels/{HOTEL_ID}/snapshots  — daily snapshot docs with { date, occupancy }
//
// The grid is Mon-based (Mon=col 0 … Sun=col 6) and padded with null cells
// before the 1st and after the last day of the requested month.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { HeatmapRow } from '@/interface'
import { MOCK_OCCUPANCY_HEATMAP } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

const SnapshotSchema = z.object({
  date: z.string(),
  occupancy: z.number(),
})

type Snapshot = z.infer<typeof SnapshotSchema>

function buildHeatmapRows(year: number, month: number, snapshots: Snapshot[]): HeatmapRow[] {
  const occByDate = new Map(snapshots.map(s => [s.date, Math.round(s.occupancy)]))

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // getDay() returns 0=Sun…6=Sat; convert to Mon-based: Mon=0…Sun=6
  const firstDayMon = (new Date(year, month, 1).getDay() + 6) % 7

  const cells: (number | null)[] = Array(firstDayMon).fill(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    cells.push(occByDate.get(dateStr) ?? null)
  }

  while (cells.length % 7 !== 0) cells.push(null)

  const rows: HeatmapRow[] = []
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7).map(value => ({ value })))
  }
  return rows
}

export function useOccupancyHeatmap(year: number, month: number) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const startDate = `${year}-${pad(month + 1)}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const endDate = `${year}-${pad(month + 1)}-${pad(lastDay)}`

  return useQuery({
    queryKey: ['occupancy-heatmap', HOTEL_ID, year, month],
    queryFn: MOCK
      ? () => Promise.resolve(MOCK_OCCUPANCY_HEATMAP)
      : async (): Promise<HeatmapRow[]> => {
          const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
          const q = query(
            col,
            where('date', '>=', startDate),
            where('date', '<=', endDate),
            orderBy('date', 'asc')
          )
          const snap = await getDocs(q)
          const snapshots = snap.docs
            .map(doc => SnapshotSchema.safeParse(doc.data()))
            .filter((r): r is { success: true; data: Snapshot } => r.success)
            .map(r => r.data)

          return buildHeatmapRows(year, month, snapshots)
        },
    staleTime: 5 * 60 * 1000,
  })
}
