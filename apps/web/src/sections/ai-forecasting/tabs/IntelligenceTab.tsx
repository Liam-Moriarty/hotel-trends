import { Activity, Sparkles, AlertTriangle, ChevronRight } from 'lucide-react'
import { anomalies, recommendations } from '@/mocks'

const SEVERITY = {
  success: {
    border: 'var(--status-success)',
    badge: 'var(--status-success)',
    badgeBg: 'var(--status-success-bg)',
  },
  warning: {
    border: 'var(--status-warning)',
    badge: 'var(--status-warning)',
    badgeBg: 'var(--status-warning-bg)',
  },
  error: {
    border: 'var(--status-error)',
    badge: 'var(--status-error)',
    badgeBg: 'var(--status-error-bg)',
  },
  info: {
    border: 'var(--status-info)',
    badge: 'var(--status-info)',
    badgeBg: 'var(--status-info-bg)',
  },
}

const PRIORITY_COLORS = {
  HIGH: { color: 'var(--status-error)', bg: 'var(--status-error-bg)' },
  MEDIUM: { color: 'var(--status-warning)', bg: 'var(--status-warning-bg)' },
  LOW: { color: 'var(--text-muted)', bg: 'var(--surface-container-high)' },
}

function AnomalyRow({ anomaly }: { anomaly: (typeof anomalies)[0] }) {
  const sev = anomaly.resolved ? 'success' : anomaly.title.includes('Review') ? 'error' : 'warning'
  const s = SEVERITY[sev]
  return (
    <div
      className="relative rounded-lg p-3 overflow-hidden"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg"
        style={{ background: s.border }}
      />
      <div className="pl-2">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={11} style={{ color: s.badge }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {anomaly.title}
            </span>
          </div>
          <span className="text-xs font-bold tabular-nums shrink-0" style={{ color: s.badge }}>
            {anomaly.delta}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {anomaly.time}
          </p>
          {anomaly.resolved && (
            <span
              className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full"
              style={{ background: 'var(--status-success-bg)', color: 'var(--status-success)' }}
            >
              ✓ Resolved
            </span>
          )}
        </div>
        {anomaly.desc && (
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
            {anomaly.desc}
          </p>
        )}
      </div>
    </div>
  )
}

function RecommendationRow({ rec }: { rec: (typeof recommendations)[0] }) {
  const pc = PRIORITY_COLORS[rec.priority as keyof typeof PRIORITY_COLORS] ?? PRIORITY_COLORS.LOW
  const impactColor = rec.impact.startsWith('+') ? 'var(--status-success)' : 'var(--status-error)'

  return (
    <div
      className="flex flex-col gap-1 py-3"
      style={{ borderBottom: '1px solid var(--border-subtle)' }}
    >
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium flex-1" style={{ color: 'var(--text-primary)' }}>
          {rec.title}
        </p>
        <span
          className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-full shrink-0"
          style={{ background: pc.bg, color: pc.color }}
        >
          {rec.priority}
        </span>
        <ChevronRight size={14} style={{ color: 'var(--text-ghost)' }} className="shrink-0" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium tabular-nums" style={{ color: impactColor }}>
          {rec.impact}
        </span>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          · {rec.category}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-0.5">
        <div className="flex-1 h-0.5 rounded-full" style={{ background: 'var(--surface-hover)' }}>
          <div
            className="h-0.5 rounded-full"
            style={{ width: `${rec.conf}%`, background: 'var(--accent-cool)' }}
          />
        </div>
        <span className="text-[10px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
          {rec.conf}% conf.
        </span>
      </div>
    </div>
  )
}

export function IntelligenceTab() {
  const activeCount = anomalies.filter(a => !a.resolved).length

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left: Anomaly Detection */}
      <div
        className="flex flex-col rounded-lg p-4 overflow-hidden"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <Activity size={14} style={{ color: 'var(--accent-violet)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Anomaly Detection
            </p>
          </div>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
            style={{ background: 'var(--status-warning-bg)', color: 'var(--status-warning)' }}
          >
            {activeCount} Active
          </span>
        </div>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {anomalies.map(a => (
            <AnomalyRow key={a.id} anomaly={a} />
          ))}
        </div>
      </div>

      {/* Right: AI Recommendations */}
      <div
        className="flex flex-col rounded-lg p-4 overflow-hidden"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 mb-3 shrink-0">
          <Sparkles size={14} style={{ color: 'var(--accent-violet)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            AI Recommendation Engine
          </p>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          {recommendations.map(r => (
            <RecommendationRow key={r.id} rec={r} />
          ))}
        </div>
      </div>
    </div>
  )
}
