import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MarketingKpi } from '@/interface'

interface MarketingKpiCardProps extends MarketingKpi {
  className?: string
}

export function MarketingKpiCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  className,
}: MarketingKpiCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        <p
          className="text-xs font-medium mt-1"
          style={{ color: positive ? 'var(--status-success)' : 'var(--status-error)' }}
        >
          {positive ? '↑' : '↓'} {change}
        </p>
      </CardContent>
    </Card>
  )
}
