import { Database, Zap, Clock, CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'
import { KpiPill } from '@/components/KpiPill'

function HealthCountPill({
  healthy,
  warnings,
  errors,
}: {
  healthy: number
  warnings: number
  errors: number
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center gap-1">
        <CheckCircle2 size={11} style={{ color: 'var(--status-success)' }} />
        <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--status-success)' }}>
          {healthy}
        </span>
      </div>
      <div className="w-px h-3" style={{ background: 'var(--border-subtle)' }} />
      <div className="flex items-center gap-1">
        <AlertTriangle size={11} style={{ color: 'var(--status-warning)' }} />
        <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--status-warning)' }}>
          {warnings}
        </span>
      </div>
      <div className="w-px h-3" style={{ background: 'var(--border-subtle)' }} />
      <div className="flex items-center gap-1">
        <XCircle size={11} style={{ color: 'var(--status-error)' }} />
        <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--status-error)' }}>
          {errors}
        </span>
      </div>
    </div>
  )
}

export function DataIntegrationsHeader({
  healthy,
  warnings,
  errors,
}: {
  healthy: number
  warnings: number
  errors: number
}) {
  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Data & Integrations
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Cloud data lake, API health monitoring & pipeline status
        </p>
      </div>

      <div className="flex items-center gap-2">
        <KpiPill icon={<Database size={12} />} label="STORAGE" value="2.4 TB" />
        <KpiPill icon={<Zap size={12} />} label="API CALLS/HR" value="48.4K" />
        <KpiPill
          icon={<Clock size={12} />}
          label="FRESHNESS"
          value="< 5 min"
          trendSemantic="success"
        />
        <HealthCountPill healthy={healthy} warnings={warnings} errors={errors} />
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white ml-2"
          style={{ background: 'var(--accent-gradient)' }}
        >
          <RefreshCw size={12} />
          Sync All
        </button>
      </div>
    </div>
  )
}
