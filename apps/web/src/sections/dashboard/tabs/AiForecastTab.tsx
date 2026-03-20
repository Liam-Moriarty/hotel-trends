import { insights } from '@/mocks'
import { Sparkles } from 'lucide-react'

type InsightVariant = 'destructive' | 'warning' | 'success' | 'secondary'

const VARIANT_COLOR: Record<InsightVariant, string> = {
  destructive: 'var(--status-error)',
  warning: 'var(--status-warning)',
  success: 'var(--status-success)',
  secondary: 'var(--status-info)',
}

const VARIANT_BG: Record<InsightVariant, string> = {
  destructive: 'var(--status-error-bg)',
  warning: 'var(--status-warning-bg)',
  success: 'var(--status-success-bg)',
  secondary: 'var(--status-info-bg)',
}

export function AiForecastTab() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: 'var(--accent-violet)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            AI Insights Panel
          </p>
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold"
          style={{
            background: 'var(--accent-violet-muted)',
            color: 'var(--accent-violet)',
            border: '1px solid var(--border-ai)',
          }}
        >
          <Sparkles size={10} />
          GPT-4o
        </div>
      </div>
      <p className="text-xs shrink-0" style={{ color: 'var(--text-muted)', marginTop: '-12px' }}>
        4 automated recommendations · Updated 2 min ago
      </p>

      {/* 2×2 grid of insight cards */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {insights.map(insight => {
          const variant = insight.variant as InsightVariant
          const color = VARIANT_COLOR[variant]
          const bg = VARIANT_BG[variant]
          return (
            <div
              key={insight.title}
              className="relative p-4 rounded-lg flex flex-col gap-1.5 overflow-hidden"
              style={{
                background: 'var(--surface-container)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Left accent border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg"
                style={{ background: color }}
              />
              {/* Badge */}
              <span
                className="inline-flex items-center self-start gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style={{ background: bg, color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                {insight.badge}
              </span>
              <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                {insight.title}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {insight.body}
              </p>
              <button
                className="text-[11px] font-medium mt-auto self-start hover:underline"
                style={{ color: 'var(--accent-cool)' }}
              >
                {insight.cta}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
