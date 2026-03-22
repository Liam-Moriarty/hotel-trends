import { useState } from 'react'
import { DemandSignalsTab } from './tabs/DemandSignalsTab'
import { MarketIntelligenceTab } from './tabs/MarketIntelligenceTab'
import { MacroPolicyTab } from './tabs/MacroPolicyTab'

type Tab = 'demand' | 'market' | 'macro'

const TABS: { value: Tab; label: string }[] = [
  { value: 'demand', label: 'Demand Signals' },
  { value: 'market', label: 'Market Intelligence' },
  { value: 'macro', label: 'Macro & Policy' },
]

export function ExternalIntelligencePanel({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('demand')

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
      <div className="flex-1 min-h-0 p-5 overflow-hidden">
        {activeTab === 'demand' && <DemandSignalsTab />}
        {activeTab === 'market' && <MarketIntelligenceTab />}
        {activeTab === 'macro' && <MacroPolicyTab />}
      </div>
    </div>
  )
}
