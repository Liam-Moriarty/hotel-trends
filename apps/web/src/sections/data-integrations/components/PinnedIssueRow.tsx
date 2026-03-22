import { XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import type { EnrichedIntegration } from '../types'
import { CATEGORY_LABELS } from '../types'

export function PinnedIssueRow({
  integration: i,
  onSelect,
}: {
  integration: EnrichedIntegration
  onSelect?: () => void
}) {
  const isError = i.status === 'error'
  const accentColor = isError ? 'var(--status-error)' : 'var(--status-warning)'
  const badgeBg = isError ? 'var(--status-error-bg)' : 'var(--status-warning-bg)'
  const badgeBorder = isError ? 'rgba(220, 38, 38, 0.25)' : 'rgba(217, 119, 6, 0.25)'
  const actionLabel = i.actionLabel ?? (isError ? 'Diagnose' : 'Investigate')

  return (
    <div
      className="relative flex items-center gap-3 p-3 rounded-lg overflow-hidden cursor-pointer"
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      onClick={onSelect}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 rounded-l-lg"
        style={{ width: 3, background: accentColor }}
      />

      {/* Status icon (indent for accent bar) */}
      <div style={{ paddingLeft: 4 }}>
        {isError ? (
          <XCircle size={16} style={{ color: accentColor }} />
        ) : (
          <AlertTriangle size={16} style={{ color: accentColor }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {i.name}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {i.vendor}
          </span>
          <span
            className="ml-auto text-[10px] px-1.5 py-0.5 rounded"
            style={{ background: 'var(--surface-container-high)', color: 'var(--text-muted)' }}
          >
            {CATEGORY_LABELS[i.category]}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="text-xs tabular-nums" style={{ color: accentColor }}>
            {i.lastSync}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            · {i.records}
          </span>
          <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
            · {i.uptime}% uptime
          </span>
          {i.issueType && (
            <span className="text-xs font-bold" style={{ color: accentColor }}>
              · {i.issueType}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          className="px-2.5 py-1 rounded text-[11px] font-semibold"
          style={{ background: badgeBg, color: accentColor, border: `1px solid ${badgeBorder}` }}
          onClick={e => e.stopPropagation()}
        >
          {actionLabel}
        </button>
        <button
          className="p-1.5 rounded"
          style={{ color: 'var(--text-muted)' }}
          onClick={e => e.stopPropagation()}
        >
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  )
}
