import type { KpiItem, KpiVariant } from '@/interface'
import { Card, CardContent } from '@/components/ui/card'

interface Props extends KpiItem {
  className?: string
}

const changeColor: Record<KpiVariant, string> = {
  up: 'text-green-600',
  down: 'text-destructive',
  info: 'text-blue-400',
  neutral: 'text-yellow-400',
}

const arrow: Record<KpiVariant, string> = {
  up: '↑',
  down: '↘',
  info: '↗',
  neutral: '↗',
}

export function KpiCard({ label, value, sub, variant, className }: Props) {
  return (
    <Card className={className}>
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
        <p className={`text-xs font-medium ${changeColor[variant]}`}>
          {arrow[variant]} {sub}
        </p>
      </CardContent>
    </Card>
  )
}
