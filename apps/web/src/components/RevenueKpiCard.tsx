import type { KpiCardData } from '@/interface'
import { Card, CardContent } from '@/components/ui/card'

export function RevenueKpiCard({ label, value, change, positive, neutral }: KpiCardData) {
  const changeColor = neutral ? 'text-yellow-400' : positive ? 'text-blue-400' : 'text-green-400'
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${changeColor}`}>↗ {change}</p>
      </CardContent>
    </Card>
  )
}
