import type { EnrichedIntegration } from './types'

export function IntegrationsStatusStrip({ integrations }: { integrations: EnrichedIntegration[] }) {
  const healthyCount = integrations.filter(i => i.status === 'healthy').length
  const warningCount = integrations.filter(i => i.status === 'warning').length
  const errorItem = integrations.find(i => i.status === 'error')

  return (
    <div className="flex items-center gap-3 shrink-0 flex-wrap">
      {/* Healthy */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-success)' }} />
        <span className="tabular-nums font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {healthyCount} Healthy
        </span>
      </div>

      {/* Warnings */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-warning)' }} />
        <span className="tabular-nums font-semibold" style={{ color: 'var(--text-secondary)' }}>
          {warningCount} Warning{warningCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Error chip — names the failing integration explicitly */}
      {errorItem && (
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{
            background: 'rgba(220, 38, 38, 0.04)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: 'var(--status-error)' }}
          />
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Error: {errorItem.name}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            · {errorItem.vendor} · {errorItem.issueType ?? errorItem.latency} · {errorItem.lastSync}
          </span>
        </div>
      )}

      {/* Pipeline */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'var(--status-success)' }} />
        <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Pipeline Healthy
        </span>
      </div>
    </div>
  )
}
