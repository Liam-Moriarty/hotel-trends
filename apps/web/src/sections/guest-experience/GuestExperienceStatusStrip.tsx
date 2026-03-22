import { AlertTriangle, TrendingDown, Wifi, CheckCircle2 } from 'lucide-react'

type ChipStatus = 'success' | 'warning' | 'error' | 'info'

const DOT_COLORS: Record<ChipStatus, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  info: 'var(--status-info)',
}

const STATUS_CHIPS: { icon: React.ReactNode; label: string; detail: string; status: ChipStatus }[] =
  [
    {
      icon: <AlertTriangle size={12} />,
      label: '57% Negative This Month',
      detail: 'All channels',
      status: 'error',
    },
    {
      icon: <TrendingDown size={12} />,
      label: 'Sentiment Declining',
      detail: 'vs prev. 30 days',
      status: 'warning',
    },
    {
      icon: <Wifi size={12} />,
      label: 'Wi-Fi Score: 5.5',
      detail: 'Critical touchpoint',
      status: 'error',
    },
    {
      icon: <CheckCircle2 size={12} />,
      label: 'Service Recovery Active',
      detail: '1 case open',
      status: 'info',
    },
  ]

export function GuestExperienceStatusStrip() {
  return (
    <div className="flex items-center gap-3 shrink-0">
      {STATUS_CHIPS.map((chip, i) => {
        const isError = chip.status === 'error'
        const dotColor = DOT_COLORS[chip.status]
        return (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: 'var(--surface-container)',
              border: `1px solid ${isError ? 'rgba(220, 38, 38, 0.20)' : 'var(--border-subtle)'}`,
              color: isError ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            <span style={{ color: dotColor }}>{chip.icon}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0${isError ? ' animate-pulse' : ''}`}
              style={{ background: dotColor }}
            />
            <span className="font-medium">{chip.label}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ color: 'var(--text-muted)' }}>{chip.detail}</span>
          </div>
        )
      })}
    </div>
  )
}
