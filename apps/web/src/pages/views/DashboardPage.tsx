import { useSnapshotKpis } from '@/features/dashboard/hooks/useSnapshotKpis'
import { KpiCard, KpiSkeleton } from '@/components/KpiCard'
import { MainPanel } from '@/sections/dashboard/MainPanel'
import { SidebarPanel } from '@/sections/dashboard/SidebarPanel'
import type { KpiVariant } from '@/interface'

function mapDir(variant: KpiVariant): 'up' | 'down' | 'neutral' {
  if (variant === 'up') return 'up'
  if (variant === 'down') return 'down'
  return 'neutral'
}

export default function ExecutiveDashboardPage() {
  const { data, isLoading } = useSnapshotKpis()
  const kpis = data?.kpis ?? []
  const healthScore = data?.healthScore ?? 84
  const healthStatus: 'good' | 'warning' | 'critical' =
    healthScore >= 75 ? 'good' : healthScore >= 50 ? 'warning' : 'critical'

  return (
    <div
      className="flex flex-col"
      style={{ height: '100%', overflow: 'hidden', background: 'var(--surface-void)' }}
    >
      <main className="flex flex-col gap-4 p-6 flex-1 min-h-0 overflow-hidden">
        {/* Header row */}
        <div className="flex items-start justify-between shrink-0">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Hotel Intelligence Dashboard
            </h1>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Grand Azure Hotel &amp; Resort · Last updated 2 min ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-1.5 text-xs font-medium"
              style={{ color: 'var(--status-success)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--status-success)' }}
              />
              Live Data
            </div>
            <button
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-white"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Export Report
            </button>
          </div>
        </div>

        {/* Row 1 — KPI strip */}
        <div className="grid grid-cols-6 gap-4 shrink-0">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <KpiSkeleton key={i} />)
          ) : (
            <>
              {kpis.slice(0, 5).map(k => (
                <KpiCard
                  key={k.label}
                  label={k.label}
                  value={k.value}
                  trend={{ value: k.sub, dir: mapDir(k.variant) }}
                />
              ))}
              {/* Health Score card (6th) */}
              <KpiCard
                label="Health Score"
                value={String(healthScore)}
                variant="health"
                healthStatus={healthStatus}
              />
            </>
          )}
        </div>

        {/* Row 2 — Main + Sidebar panels */}
        <div className="flex gap-4 flex-1 min-h-0 max-h-[70%]">
          <MainPanel />
          <SidebarPanel />
        </div>
      </main>
    </div>
  )
}
