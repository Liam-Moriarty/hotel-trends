import { DollarSign, TrendingUp, Target, MousePointerClick } from 'lucide-react'
import { KpiPill } from '@/components/KpiPill'

export function MarketingHeader() {
  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Marketing &amp; Distribution
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Paid media, campaigns, channel ROI &amp; booking attribution
        </p>
      </div>

      <div className="flex items-center gap-2">
        <KpiPill
          icon={<DollarSign size={12} />}
          label="AD SPEND MTD"
          value="$37.8K"
          trend="+12%"
          trendDir="up"
          trendSemantic="warning"
        />
        <KpiPill
          icon={<TrendingUp size={12} />}
          label="AD REVENUE"
          value="$136.7K"
          trend="+24%"
          trendDir="up"
          trendSemantic="success"
        />
        <KpiPill
          icon={<Target size={12} />}
          label="BLENDED ROAS"
          value="3.6x"
          trend="+0.4x"
          trendDir="up"
          trendSemantic="success"
        />
        <KpiPill
          icon={<MousePointerClick size={12} />}
          label="DIRECT BOOKING CONV."
          value="1.95%"
          trend="+0.3pp"
          trendDir="up"
          trendSemantic="success"
        />
      </div>
    </div>
  )
}
