import { DollarSign, TrendingUp, MousePointerClick, Percent } from 'lucide-react'
import { KpiPill } from '@/components/KpiPill'
import { useRevenueKpis } from '@/features/revenue-pricing/hooks/useRevenueKpis'

// Pill config: icon, label, trendSemantic logic per KPI index
// index 0 = ADR, 1 = RevPAR, 2 = Direct Booking %, 3 = OTA Commission Cost

const PILL_CONFIG = [
  { icon: <DollarSign size={12} />, label: 'AVG ADR' },
  { icon: <TrendingUp size={12} />, label: 'REVPAR' },
  { icon: <MousePointerClick size={12} />, label: 'DIRECT BOOKING' },
  { icon: <Percent size={12} />, label: 'OTA COMMISSION' },
] as const

// OTA Commission: variant "up" means cost went DOWN — semantically good
function getTrendSemantic(
  idx: number,
  variant: 'up' | 'down'
): 'success' | 'warning' | 'error' | 'neutral' {
  if (idx === 3) return variant === 'up' ? 'success' : 'warning' // OTA cost down = good
  return variant === 'up' ? 'success' : 'warning'
}

export function RevenuePricingHeader() {
  const { data: kpis, isLoading } = useRevenueKpis()

  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Revenue &amp; Pricing
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Dynamic pricing engine, demand forecasting &amp; channel optimization
        </p>
      </div>

      <div className="flex items-center gap-2">
        {isLoading
          ? PILL_CONFIG.map((cfg, i) => (
              <div
                key={i}
                className="h-9 w-24 rounded-lg animate-pulse"
                style={{ background: 'var(--surface-container)' }}
              />
            ))
          : (kpis ?? []).map((kpi, i) => {
              const cfg = PILL_CONFIG[i]
              if (!cfg) return null
              const trendSemantic = getTrendSemantic(i, kpi.variant as 'up' | 'down')
              return (
                <KpiPill
                  key={i}
                  icon={cfg.icon}
                  label={cfg.label}
                  value={kpi.value}
                  trend={kpi.sub}
                  trendDir={kpi.variant === 'up' ? 'up' : 'down'}
                  trendSemantic={trendSemantic}
                />
              )
            })}
      </div>
    </div>
  )
}
