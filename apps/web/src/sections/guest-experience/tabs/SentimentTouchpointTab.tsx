import { AlertTriangle, XCircle } from 'lucide-react'
import { MOCK_HUBOS_TOUCHPOINTS } from '@/mocks/hubos-guest-sentiments.mock'

const touchpoints = MOCK_HUBOS_TOUCHPOINTS.map(tp => ({
  id: tp.department,
  label: tp.label,
  score: tp.score,
}))

// ── Score color helpers ───────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 8.0) return 'var(--status-success)'
  if (score >= 6.5) return 'var(--status-warning)'
  return 'var(--status-error)'
}

// ── TouchpointRow ─────────────────────────────────────────────────────────────

function TouchpointRow({
  touchpoint,
}: {
  touchpoint: { id: string; label: string; score: number }
}) {
  const isCritical = touchpoint.score < 6.5
  const isBelowTarget = touchpoint.score < 8.0
  const fillColor = getScoreColor(touchpoint.score)
  const fillPct = (touchpoint.score / 10) * 100

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span className="text-sm w-28 shrink-0" style={{ color: 'var(--text-secondary)' }}>
        {touchpoint.label}
      </span>

      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--surface-hover)' }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-[600ms] ease-out"
          style={{ width: `${fillPct}%`, background: fillColor }}
        />
      </div>

      <div className="w-14 flex items-center justify-end gap-1 shrink-0">
        <span className="text-sm font-bold tabular-nums" style={{ color: fillColor }}>
          {touchpoint.score.toFixed(1)}
        </span>
        {isCritical ? (
          <XCircle size={10} style={{ color: 'var(--status-error)', flexShrink: 0 }} />
        ) : isBelowTarget ? (
          <AlertTriangle size={10} style={{ color: 'var(--status-warning)', flexShrink: 0 }} />
        ) : null}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function SentimentTouchpointTab() {
  const sorted = [...touchpoints].sort((a, b) => a.score - b.score)
  const belowTarget = touchpoints.filter(tp => tp.score < 8.0)
  const critical = [...touchpoints]
    .filter(tp => tp.score < 6.5)
    .sort((a, b) => a.score - b.score)[0]

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex-1 overflow-y-auto flex flex-col gap-1">
        {sorted.map(tp => (
          <TouchpointRow key={tp.id} touchpoint={tp} />
        ))}
      </div>

      <div
        className="shrink-0 pt-3 flex items-center gap-4"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          Target: 8.0
        </span>
        <span className="text-[10px] font-semibold" style={{ color: 'var(--status-warning)' }}>
          {belowTarget.length} below target
        </span>
        {critical && (
          <span className="text-[10px] font-bold" style={{ color: 'var(--status-error)' }}>
            Critical: {critical.label} ({critical.score.toFixed(1)})
          </span>
        )}
      </div>
    </div>
  )
}
