import { MarketingKpiCard } from '@/components/MarketingKpiCard'
import type { MarketingKpi } from '@/interface'

interface MarketingKpiCardsProps {
  kpis: MarketingKpi[]
}

export function MarketingKpiCards({ kpis }: MarketingKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map(kpi => (
        <MarketingKpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  )
}
