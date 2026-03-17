// ---------------------------------------------------------------------------
// Fetches the latest daily snapshot and returns department performance scores
// for DeptPerformance. Requires a `deptScores` object on the snapshot doc:
//   { Rooms, F&B, Spa, Events, Ops } — each a number 0–100.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { Department } from '@/interface'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

// Only the fields this hook cares about — other snapshot fields are ignored.
const DeptSnapshotSchema = z.object({
  deptScores: z.object({
    Rooms: z.number().min(0).max(100),
    'F&B': z.number().min(0).max(100),
    Spa: z.number().min(0).max(100),
    Events: z.number().min(0).max(100),
    Ops: z.number().min(0).max(100),
  }),
})

export function useDeptPerformance() {
  return useQuery({
    queryKey: ['dept-performance', HOTEL_ID],
    queryFn: async (): Promise<Department[]> => {
      const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
      // Only need the single most-recent snapshot.
      const q = query(col, orderBy('date', 'desc'), limit(1))
      const snap = await getDocs(q)

      if (snap.empty) return []

      const result = DeptSnapshotSchema.safeParse(snap.docs[0].data())
      if (!result.success) return []

      // Convert the deptScores object into a Department[] array.
      return Object.entries(result.data.deptScores).map(([name, score]) => ({
        name,
        score,
      }))
    },
    staleTime: 5 * 60 * 1000,
  })
}
