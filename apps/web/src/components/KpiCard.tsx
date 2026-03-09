import type { Kpi } from '@/interface'
import { Card, CardContent } from '@/components/ui/card'

export function KpiCard({ label, value, sub, up }: Kpi) {
  return (
    <Card className="flex-1 min-w-[140px]">
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
        <p className={`text-xs font-medium ${up ? 'text-green-600' : 'text-destructive'}`}>
          {up ? '↑' : '↘'} {sub}
        </p>
      </CardContent>
    </Card>
  )
}
