import { useState } from 'react'
import { marketingFunnelSteps, attributionData } from '@/mocks'

// ── Attribution model data ────────────────────────────────────────────────────

type AttributionModel = 'First Touch' | 'Last Touch' | 'Linear'

const ATTRIBUTION_MODELS: Record<
  AttributionModel,
  { channel: string; value: number; color: string }[]
> = {
  'First Touch': [
    { channel: 'Google Ads', value: 38, color: 'var(--accent-cool)' },
    { channel: 'Direct', value: 22, color: 'var(--status-warning)' },
    { channel: 'Email', value: 15, color: 'var(--status-success)' },
    { channel: 'Meta Ads', value: 18, color: 'var(--accent-violet)' },
    { channel: 'OTA Referral', value: 7, color: 'var(--status-error)' },
  ],
  'Last Touch': [
    { channel: 'Google Ads', value: 28, color: 'var(--accent-cool)' },
    { channel: 'Direct', value: 35, color: 'var(--status-warning)' },
    { channel: 'Email', value: 18, color: 'var(--status-success)' },
    { channel: 'Meta Ads', value: 14, color: 'var(--accent-violet)' },
    { channel: 'OTA Referral', value: 5, color: 'var(--status-error)' },
  ],
  Linear: attributionData.map(d => ({
    channel: d.channel,
    value: d.value,
    color:
      d.channel === 'Google Ads'
        ? 'var(--accent-cool)'
        : d.channel === 'Direct'
          ? 'var(--status-warning)'
          : d.channel === 'Email'
            ? 'var(--status-success)'
            : d.channel === 'Meta Ads'
              ? 'var(--accent-violet)'
              : 'var(--status-error)',
  })),
}

// Bar colors per funnel step index
const FUNNEL_COLORS = [
  'var(--accent-violet)',
  'var(--accent-cool)',
  'var(--accent-cool)',
  'var(--accent-cool)',
  'var(--status-success)',
]
const FUNNEL_OPACITIES = [1, 1, 0.8, 0.6, 1]

// ── Booking Funnel Card ───────────────────────────────────────────────────────

function BookingFunnelCard() {
  const maxValue = marketingFunnelSteps[0]?.value ?? 1

  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="mb-4 shrink-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Website Booking Funnel
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          This month conversion flow
        </p>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
        {marketingFunnelSteps.map((step, i) => (
          <div key={step.label}>
            {/* Step row */}
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-medium w-36 shrink-0"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.label}
              </span>
              <div
                className="flex-1 h-6 rounded-sm overflow-hidden"
                style={{ background: 'var(--surface-hover)' }}
              >
                <div
                  className="h-full rounded-sm"
                  style={{
                    width: `${(step.value / maxValue) * 100}%`,
                    background: FUNNEL_COLORS[i] ?? 'var(--accent-cool)',
                    opacity: FUNNEL_OPACITIES[i] ?? 1,
                  }}
                />
              </div>
              <span
                className="text-sm font-bold tabular-nums w-14 text-right shrink-0"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.value.toLocaleString()}
              </span>
            </div>

            {/* Drop-off indicator */}
            {step.dropOff && (
              <p
                className="text-[10px] ml-[9.5rem] my-0.5"
                style={{ color: 'var(--status-error)' }}
              >
                ▼ {step.dropOff}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 shrink-0" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Overall conv. rate:{' '}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color: 'var(--status-success)' }}>
          1.95%
        </span>
      </div>
    </div>
  )
}

// ── Attribution Analysis Card ─────────────────────────────────────────────────

function AttributionModelToggle({
  activeModel,
  onChange,
}: {
  activeModel: AttributionModel
  onChange: (m: AttributionModel) => void
}) {
  const models: AttributionModel[] = ['First Touch', 'Last Touch', 'Linear']
  return (
    <div
      className="flex items-center rounded-lg p-0.5"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {models.map(model => {
        const isActive = activeModel === model
        return (
          <button
            key={model}
            onClick={() => onChange(model)}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-all"
            style={{
              background: isActive ? 'var(--surface-container)' : 'transparent',
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              fontWeight: isActive ? 600 : 400,
              border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
              boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            {model}
          </button>
        )
      })}
    </div>
  )
}

function AttributionAnalysisCard() {
  const [model, setModel] = useState<AttributionModel>('Linear')
  const channels = ATTRIBUTION_MODELS[model]
  const maxValue = Math.max(...channels.map(c => c.value))

  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Attribution Analysis
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Channel contribution % to bookings
          </p>
        </div>
        <AttributionModelToggle activeModel={model} onChange={setModel} />
      </div>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {channels.map(ch => (
          <div key={ch.channel} className="flex flex-col gap-1 py-1">
            <div className="flex items-center gap-3">
              <span className="text-sm w-24 shrink-0" style={{ color: 'var(--text-primary)' }}>
                {ch.channel}
              </span>
              <div
                className="flex-1 mx-1 h-2 rounded-full"
                style={{ background: 'var(--surface-hover)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(ch.value / maxValue) * 100}%`,
                    background: ch.color,
                    transition: 'width 300ms ease-out',
                  }}
                />
              </div>
              <span
                className="text-xs font-bold tabular-nums w-8 text-right shrink-0"
                style={{ color: 'var(--text-primary)' }}
              >
                {ch.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function ConversionAttributionTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <BookingFunnelCard />
      <AttributionAnalysisCard />
    </div>
  )
}
