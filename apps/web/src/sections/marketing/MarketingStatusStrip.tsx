import { Target, Megaphone, AlertTriangle, MousePointerClick } from 'lucide-react'

type ChipStatus = 'success' | 'warning' | 'error' | 'info'

const DOT_COLORS: Record<ChipStatus, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  info: 'var(--status-info)',
}

const STATUS_CHIPS: {
  icon: React.ReactNode
  label: string
  detail: string
  status: ChipStatus
}[] = [
  {
    icon: <Target size={12} />,
    label: 'ROAS 3.6x',
    detail: 'vs 3.0x benchmark',
    status: 'success',
  },
  {
    icon: <Megaphone size={12} />,
    label: '2 Campaigns Live',
    detail: 'Active now',
    status: 'info',
  },
  {
    icon: <AlertTriangle size={12} />,
    label: 'Wasted Spend Alert',
    detail: 'Requires review',
    status: 'error',
  },
  {
    icon: <MousePointerClick size={12} />,
    label: 'Conv. 1.95%',
    detail: 'Direct booking rate',
    status: 'success',
  },
]

export function MarketingStatusStrip() {
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
