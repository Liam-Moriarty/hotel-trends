import { useState } from 'react'
import { DynamicPricingTab } from './tabs/DynamicPricingTab'

type Tab = 'dynamic' | 'demand' | 'channels' | 'shopping'

const TABS: { value: Tab; label: string }[] = [
  { value: 'dynamic', label: 'Dynamic Pricing' },
  { value: 'demand', label: 'Demand Forecast' },
  { value: 'channels', label: 'Channels' },
  { value: 'shopping', label: 'Rate Shopping' },
]

// ── Placeholder tab ────────────────────────────────────────────────────────────

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {label} — coming in Phase 1.
      </p>
    </div>
  )
}

// ── Panel ──────────────────────────────────────────────────────────────────────

export function RevenuePricingPanel({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('dynamic')

  return (
    <div
      className={`flex flex-col rounded-xl ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Tab bar */}
      <div
        className="flex items-end px-5 pt-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {TABS.map(tab => {
          const isActive = tab.value === activeTab
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className="px-4 pb-3 pt-0 text-sm transition-colors"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400,
                borderBottom: isActive ? '2px solid var(--accent-cool)' : '2px solid transparent',
                marginBottom: -1,
                background: 'transparent',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'dynamic' && <DynamicPricingTab />}
        {activeTab === 'demand' && <PlaceholderTab label="Demand Forecast" />}
        {activeTab === 'channels' && <PlaceholderTab label="Channels" />}
        {activeTab === 'shopping' && <PlaceholderTab label="Rate Shopping" />}
      </div>
    </div>
  )
}
