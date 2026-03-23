import type { TooltipProps } from 'recharts'
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

export function GlassTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="px-3 py-2 rounded-lg text-xs"
      style={{
        background: 'var(--surface-glass)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border-default)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }}
    >
      <p className="mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      {payload.map(p => (
        <div key={String(p.dataKey)} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: String(p.color) }} />
          <span className="font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {p.value}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{p.name}</span>
        </div>
      ))}
    </div>
  )
}
