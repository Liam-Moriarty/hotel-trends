import {
  X,
  RefreshCw,
  Settings,
  PowerOff,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react'
import type { EnrichedIntegration } from '../types'
import { CATEGORY_LABELS } from '../types'

const SYNC_LOG_OFFSETS = [2, 7, 12] // mock "X min ago" values

export function IntegrationDetailModal({
  integration: i,
  onClose,
}: {
  integration: EnrichedIntegration
  onClose: () => void
}) {
  const statusIcon =
    i.status === 'healthy' ? (
      <CheckCircle2 size={18} style={{ color: 'var(--status-success)' }} />
    ) : i.status === 'warning' ? (
      <AlertTriangle size={18} style={{ color: 'var(--status-warning)' }} />
    ) : (
      <XCircle size={18} style={{ color: 'var(--status-error)' }} />
    )

  // Derive a plausible "records/sync" for the log from the records string
  const baseRecords = parseInt(i.records.replace(/,/g, ''), 10)
  const recordsDisplay = isNaN(baseRecords) ? i.records : baseRecords.toLocaleString()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <div
        className="w-[520px] rounded-xl overflow-hidden"
        style={{
          background: 'var(--surface-glass)',
          backdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 20px 50px rgba(10,10,30,0.18)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-start justify-between"
          style={{ borderBottom: '1px solid var(--border-subtle)' }}
        >
          <div className="flex items-start gap-3">
            {statusIcon}
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {i.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {i.vendor} · {CATEGORY_LABELS[i.category]}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Stats */}
        <div className="px-5 py-4 grid grid-cols-3 gap-3">
          {[
            { label: 'UPTIME 7D', value: `${i.uptime}%` },
            { label: 'LATENCY', value: i.latency },
            { label: 'LAST RECORDS', value: recordsDisplay },
          ].map(stat => (
            <div
              key={stat.label}
              className="p-3 rounded-lg"
              style={{
                background: 'var(--surface-container-high)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-lg font-bold tabular-nums mt-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent sync log */}
        <div className="px-5 pb-4">
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
            Recent sync log
          </p>
          <div className="flex flex-col gap-1.5">
            {SYNC_LOG_OFFSETS.map(offset => (
              <div key={offset} className="flex items-center gap-2 text-xs">
                <CheckCircle2 size={12} style={{ color: 'var(--status-success)' }} />
                <span className="tabular-nums" style={{ color: 'var(--text-muted)' }}>
                  {offset} min ago
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  — {recordsDisplay} records synced
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action footer */}
        <div
          className="px-5 py-3 flex items-center gap-2 justify-between"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{
              background: 'var(--status-error-bg)',
              color: 'var(--status-error)',
              border: '1px solid rgba(220, 38, 38, 0.20)',
            }}
          >
            <PowerOff size={12} />
            Disable
          </button>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{
                background: 'var(--surface-container-high)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Settings size={12} />
              Edit Config
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <RefreshCw size={12} />
              Force Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
