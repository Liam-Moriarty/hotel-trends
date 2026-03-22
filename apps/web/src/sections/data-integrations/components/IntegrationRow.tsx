import { RefreshCw } from 'lucide-react'
import type { EnrichedIntegration } from '../types'

function formatRecords(records: string): string {
  if (records.toLowerCase().includes('live')) return 'Live'
  const num = parseInt(records.replace(/,/g, ''), 10)
  if (isNaN(num)) return records
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K rec`
  return `${num} rec`
}

function getLatencyColor(latency: string): string {
  if (latency === 'Timeout') return 'var(--status-error)'
  const ms = parseInt(latency, 10)
  if (isNaN(ms)) return 'var(--text-primary)'
  if (ms <= 100) return 'var(--status-success)'
  if (ms <= 200) return 'var(--text-primary)'
  return 'var(--status-warning)'
}

function getUptimeColor(uptime: number): string {
  if (uptime >= 99) return 'var(--status-success)'
  if (uptime >= 97) return 'var(--status-warning)'
  return 'var(--status-error)'
}

function getLastSyncColor(lastSync: string): string {
  if (lastSync === 'Real-time') return 'var(--status-success)'
  const hourMatch = lastSync.match(/(\d+)h/)
  if (hourMatch) return 'var(--status-warning)'
  const minMatch = lastSync.match(/(\d+)\s*min/)
  if (minMatch) {
    const min = parseInt(minMatch[1], 10)
    if (min < 5) return 'var(--status-success)'
    if (min <= 30) return 'var(--text-muted)'
    return 'var(--status-warning)'
  }
  return 'var(--text-muted)'
}

export function IntegrationRow({
  integration: i,
  onSelect,
}: {
  integration: EnrichedIntegration
  onSelect?: () => void
}) {
  const syncColor = getLastSyncColor(i.lastSync)
  const uptimeColor = getUptimeColor(i.uptime)
  const latencyColor = getLatencyColor(i.latency)
  const isLatencyBold = i.latency === 'Timeout'

  return (
    <div
      className="flex items-center gap-3 h-9 px-2 rounded-md cursor-pointer hover:bg-[var(--surface-hover)] transition-colors"
      onClick={onSelect}
    >
      {/* Status dot */}
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: 'var(--status-success)' }}
      />

      {/* Name — vendor */}
      <span
        className="flex-1 text-sm font-medium truncate"
        style={{ color: 'var(--text-primary)' }}
      >
        {i.name}
        <span className="font-normal ml-1" style={{ color: 'var(--text-muted)' }}>
          — {i.vendor}
        </span>
      </span>

      {/* Right stats */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Last sync */}
        <span className="text-xs tabular-nums w-16 text-right" style={{ color: syncColor }}>
          {i.lastSync}
        </span>

        {/* Records */}
        <span
          className="text-xs tabular-nums w-20 text-right"
          style={{ color: 'var(--text-muted)' }}
        >
          {formatRecords(i.records)}
        </span>

        {/* Uptime bar + % */}
        <div className="flex items-center gap-1.5 w-24">
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ width: 48, background: 'var(--surface-hover)' }}
          >
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.min(i.uptime, 100)}%`, background: uptimeColor }}
            />
          </div>
          <span className="text-xs tabular-nums w-9 text-right" style={{ color: uptimeColor }}>
            {i.uptime}%
          </span>
        </div>

        {/* Latency */}
        <span
          className="text-xs tabular-nums w-12 text-right"
          style={{
            color: latencyColor,
            fontWeight: isLatencyBold ? 700 : 500,
          }}
        >
          {i.latency}
        </span>

        {/* Sync button */}
        <button
          className="p-1 rounded transition-transform hover:rotate-180 text-[var(--text-ghost)] hover:text-[var(--text-secondary)]"
          onClick={e => e.stopPropagation()}
        >
          <RefreshCw size={12} />
        </button>
      </div>
    </div>
  )
}
