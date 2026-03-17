import { kpis } from '@/mocks'
import { KpiCard, KpiSkeleton } from '@/components/KpiCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import HealthScore from '@/sections/dashboard/HealthScore'
import DeptPerformance from '@/sections/dashboard/DeptPerformance'
import RevenueChart from '@/sections/dashboard/RevenueChart'
import InsightsPanel from '@/sections/dashboard/InsightsPanel'
import ScenarioSimulator from '@/sections/dashboard/ScenarioSimulator'
import RevparForecast from '@/sections/dashboard/RevparForecast'
import CapExPanel from '@/sections/dashboard/CapExPanel'
import { useSnapshotKpis } from '@/hooks/useSnapshotKpis'

export default function ExecutiveDashboardPage() {
  const { data: snapshotKpis, isLoading } = useSnapshotKpis()

  const displayKpis = kpis.map(k => snapshotKpis?.find(r => r.label === k.label) ?? k)
  console.log(snapshotKpis)
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight mb-1">Hotel Intelligence Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Grand Azure Hotel &amp; Resort · Last updated 2 min ago
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-green-600 border-border bg-background px-3 py-1.5 rounded-md text-xs font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Live Data
          </Badge>
          <Button size="sm">Export Report</Button>
        </div>
      </div>

      {/* Row 1 — Health Score + KPIs */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <HealthScore />

        {isLoading
          ? kpis.map(k => <KpiSkeleton key={k.label} />)
          : displayKpis.map(k => <KpiCard key={k.label} {...k} className="flex-1 min-w-[140px]" />)}
      </div>

      {/* Row 2 — Revenue Chart + Department Performance */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <RevenueChart />
        <DeptPerformance />
      </div>

      {/* Row 3 — AI Insights + Scenario Simulator */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <InsightsPanel />
        <ScenarioSimulator />
      </div>

      {/* Row 4 — RevPAR Forecast + CapEx */}
      <div className="flex gap-3 flex-wrap">
        <RevparForecast />
        <CapExPanel />
      </div>
    </div>
  )
}
