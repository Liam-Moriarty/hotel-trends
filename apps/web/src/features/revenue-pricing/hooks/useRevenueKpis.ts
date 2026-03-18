// ---------------------------------------------------------------------------
// Fetches the latest 31 daily snapshots and computes the 4 KPI items for
// the Revenue & Pricing page:
//   - Avg ADR          (% change vs 30 days prior)
//   - RevPAR           (% change vs 30 days prior)
//   - Direct Booking % (pp change vs 30 days prior)
//   - OTA Commission Cost ($ change vs 30 days prior)
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
  revpar: z.number(),
  directBookingPct: z.number().optional().default(0),
  otaCommissionCost: z.number().optional().default(0),
})

type Snapshot = z.infer<typeof SnapshotSchema>

function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

function sign(n: number) {
  return n >= 0 ? '+' : ''
}

function formatKChange(n: number): string {
  const abs = Math.abs(n)
  const formatted = abs >= 1000 ? `${(abs / 1000).toFixed(1)}K` : `${abs.toFixed(0)}`
  return `${n >= 0 ? '+' : '-'}$${formatted}`
}

export function useRevenueKpis() {
  return useQuery({
    queryKey: ['revenue-kpis', HOTEL_ID],
    queryFn: async (): Promise<KpiItem[]> => {
      const col = collection(db, `hotels/${HOTEL_ID}/snapshots`)
      const q = query(col, orderBy('date', 'desc'), limit(31))
      const snap = await getDocs(q)

      const docs = snap.docs
        .map(d => SnapshotSchema.safeParse(d.data()))
        .filter((r): r is { success: true; data: Snapshot } => r.success)
        .map(r => r.data)

      if (docs.length === 0) return []

      const latest = docs[0]
      const thirtyDaysAgo = new Date(latest.date)
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const prior = docs.reduce((closest, doc) => {
        const docDiff = Math.abs(new Date(doc.date).getTime() - thirtyDaysAgo.getTime())
        const closestDiff = Math.abs(new Date(closest.date).getTime() - thirtyDaysAgo.getTime())
        return docDiff < closestDiff ? doc : closest
      })

      const adrChange = pctChange(latest.adr, prior.adr)
      const revparChange = pctChange(latest.revpar, prior.revpar)
      const directBookingChange = latest.directBookingPct - prior.directBookingPct
      const otaCostChange = latest.otaCommissionCost - prior.otaCommissionCost

      return [
        {
          label: 'Avg ADR',
          value: `$${latest.adr.toFixed(0)}`,
          sub: `${sign(adrChange)}${adrChange.toFixed(1)}%`,
          variant: adrChange >= 0 ? 'up' : 'down',
        },
        {
          label: 'RevPAR',
          value: `$${latest.revpar.toFixed(0)}`,
          sub: `${sign(revparChange)}${revparChange.toFixed(1)}%`,
          variant: revparChange >= 0 ? 'up' : 'down',
        },
        {
          label: 'Direct Booking %',
          value: `${latest.directBookingPct}%`,
          sub: `${sign(directBookingChange)}${directBookingChange.toFixed(0)}pp`,
          variant: directBookingChange >= 0 ? 'up' : 'down',
        },
        {
          label: 'OTA Commission Cost',
          value:
            latest.otaCommissionCost >= 1000
              ? `$${(latest.otaCommissionCost / 1000).toFixed(1)}K`
              : `$${latest.otaCommissionCost.toFixed(0)}`,
          sub: `${formatKChange(otaCostChange)} vs prior`,
          // Lower cost = good (up/green), higher cost = bad (down/red)
          variant: otaCostChange <= 0 ? 'up' : 'down',
        },
      ]
    },
    staleTime: 5 * 60 * 1000,
  })
}
