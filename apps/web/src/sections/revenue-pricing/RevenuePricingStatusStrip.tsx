import { useState } from 'react'
import { TrendingUp, Sparkles, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { ApplyAiRatesModal } from './ApplyAiRatesModal'

type ChipStatus = 'success' | 'warning' | 'error' | 'info'

const DOT_COLORS: Record<ChipStatus, string> = {
  success: 'var(--status-success)',
  warning: 'var(--status-warning)',
  error: 'var(--status-error)',
  info: 'var(--status-info)',
}

const SIGNAL_CHIPS: { icon: React.ReactNode; label: string; status: ChipStatus }[] = [
  { icon: <TrendingUp size={12} />, label: 'ADR +5.1% vs 30d', status: 'success' },
  { icon: <TrendingUp size={12} />, label: 'RevPAR +9.3% vs 30d', status: 'success' },
  { icon: <Sparkles size={12} />, label: '5 AI Recommendations Pending', status: 'info' },
]

export function RevenuePricingStatusStrip() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between shrink-0">
        {/* Left: live signal chips */}
        <div className="flex items-center gap-3">
          {SIGNAL_CHIPS.map((chip, i) => {
            const dotColor = DOT_COLORS[chip.status]
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                style={{
                  background: 'var(--surface-container)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ color: dotColor }}>{chip.icon}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: dotColor }}
                />
                <span className="font-medium">{chip.label}</span>
              </div>
            )
          })}
        </div>

        {/* Right: page actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
            style={{
              background: 'var(--surface-container)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <SlidersHorizontal size={12} />
            Filter
            <ChevronDown size={10} />
          </button>

          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:brightness-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cool), var(--accent-violet))',
              color: 'white',
            }}
            onClick={() => setModalOpen(true)}
          >
            <Sparkles size={12} />
            Apply AI Rates
          </button>
        </div>
      </div>

      {modalOpen && <ApplyAiRatesModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
