// ---------------------------------------------------------------------------
// Fetches the latest 31 daily snapshots and computes KPI items for
// ADR, Occupancy, and RevPAR with % change vs 30 days ago.
// Also exposes raw healthScore, occupancy, and adr for the HealthScore widget.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { KpiItem } from '@/interface'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string

const SnapshotSchema = z.object({
  date: z.string(),
  adr: z.number(),
  occupancy: z.number(),
  revpar: z.number(),
  healthScore: z.number(),
  hotelId: z.string(),
})

type Snapshot = z.infer<typeof SnapshotSchema>

export type SnapshotKpisResult = {
  kpis: KpiItem[]
  healthScore: number
  occupancy: number
  adr: number
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

function sign(n: number) {
  return n >= 0 ? '+' : ''
}

export function useSnapshotKpis() {
  return useQuery({
    queryKey: ['snapshot-kpis', HOTEL_ID],
    queryFn: async (): Promise<SnapshotKpisResult> => {
      const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
      const q = query(col, orderBy('date', 'desc'), limit(31))
      const snap = await getDocs(q)

      const docs = snap.docs
        .map(d => SnapshotSchema.safeParse(d.data()))
        .filter((r): r is { success: true; data: Snapshot } => r.success)
        .map(r => r.data)

      if (docs.length === 0) return { kpis: [], healthScore: 0, occupancy: 0, adr: 0 }

      const latest = docs[0]
      // Find the document closest to exactly 30 days before the latest date,
      // regardless of how many documents are in the set.
      const thirtyDaysAgo = new Date(latest.date)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const prior = docs.reduce((closest, doc) => {
        const docDiff = Math.abs(new Date(doc.date).getTime() - thirtyDaysAgo.getTime())
        const closestDiff = Math.abs(new Date(closest.date).getTime() - thirtyDaysAgo.getTime())
        return docDiff < closestDiff ? doc : closest
      })

      const adrChange = pctChange(latest.adr, prior.adr)
      const occChange = pctChange(latest.occupancy, prior.occupancy)
      const revparChange = pctChange(latest.revpar, prior.revpar)

      return {
        kpis: [
          {
            label: 'ADR',
            value: `$${latest.adr.toFixed(0)}`,
            sub: `${sign(adrChange)}${adrChange.toFixed(1)}% Avg Daily Rate`,
            variant: adrChange >= 0 ? 'up' : 'down',
          },
          {
            label: 'Occupancy',
            value: `${latest.occupancy}%`,
            sub: `${sign(occChange)}${occChange.toFixed(1)}% vs ${prior.occupancy}% prior period`,
            variant: occChange >= 0 ? 'up' : 'down',
          },
          {
            label: 'RevPAR',
            value: `$${latest.revpar.toFixed(0)}`,
            sub: `${sign(revparChange)}${revparChange.toFixed(1)}% Revenue per avail. room`,
            variant: revparChange >= 0 ? 'up' : 'down',
          },
        ],
        healthScore: latest.healthScore,
        occupancy: latest.occupancy,
        adr: latest.adr,
      }
    },
    staleTime: 5 * 60 * 1000,
  })
}
