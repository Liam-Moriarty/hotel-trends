// ---------------------------------------------------------------------------
// Fetches the latest 31 daily snapshots and computes KPI items for
// Total Revenue, Gross Operating Profit, ADR, Occupancy, and RevPAR
// with % change vs 30 days ago.
// Also exposes raw healthScore, occupancy, and adr for the HealthScore widget.
// ---------------------------------------------------------------------------
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { z } from 'zod'
import { db } from '@repo/firebase-config'
import type { KpiItem } from '@/interface'
import { MOCK_SNAPSHOT_KPIS } from '@/mocks/firestore-hooks.mock'

const HOTEL_ID = import.meta.env.VITE_HOTEL_ID as string
const MOCK = import.meta.env.VITE_MOCK_DATA === 'true'

const SnapshotSchema = z.object({
  date: z.string(),
  adr: z.number(),
  occupancy: z.number(),
  revpar: z.number(),
  healthScore: z.number(),
  hotelId: z.string(),
  revenue: z.number().optional().default(0),
  grossOperatingProfit: z.number().optional().default(0),
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

function formatK(n: number): string {
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`
}

export function useSnapshotKpis() {
  return useQuery({
    queryKey: ['snapshot-kpis', HOTEL_ID],
    queryFn: MOCK
      ? () => Promise.resolve(MOCK_SNAPSHOT_KPIS)
      : async (): Promise<SnapshotKpisResult> => {
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

          const revenueChange = pctChange(latest.revenue, prior.revenue)
          const gopChange = pctChange(latest.grossOperatingProfit, prior.grossOperatingProfit)
          const adrChange = pctChange(latest.adr, prior.adr)
          const occChange = pctChange(latest.occupancy, prior.occupancy)
          const revparChange = pctChange(latest.revpar, prior.revpar)

          const gopMargin =
            latest.revenue > 0
              ? ` · GOP margin ${((latest.grossOperatingProfit / latest.revenue) * 100).toFixed(1)}%`
              : ''

          return {
            kpis: [
              {
                label: 'Total Revenue',
                value: formatK(latest.revenue),
                sub: `${sign(revenueChange)}${revenueChange.toFixed(1)}% vs last period`,
                variant: revenueChange >= 0 ? 'up' : 'down',
              },
              {
                label: 'Gross Operating Profit',
                value: formatK(latest.grossOperatingProfit),
                sub: `${sign(gopChange)}${gopChange.toFixed(1)}%${gopMargin}`,
                variant: gopChange >= 0 ? 'up' : 'down',
              },
              {
                label: 'ADR',
                value: `$${latest.adr.toFixed(0)}`,
                sub: `${sign(adrChange)}${adrChange.toFixed(1)}% Avg Daily Rate`,
                variant: adrChange >= 0 ? 'up' : 'down',
              },
              {
                label: 'Occupancy',
                value: `${latest.occupancy}%`,
                sub: `${sign(occChange)}${occChange.toFixed(1)}% vs ${prior.occupancy}% prior month`,
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
