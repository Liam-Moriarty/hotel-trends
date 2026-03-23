import { useState } from 'react'
import { ForecastsTab } from './tabs/ForecastsTab'
import { IntelligenceTab } from './tabs/IntelligenceTab'
import { OptimizationTab } from './tabs/OptimizationTab'
import { RiskRetentionTab } from './tabs/RiskRetentionTab'

const TABS = [
  { id: 'forecasts', label: 'Forecasts' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'optimization', label: 'Optimization' },
  { id: 'risk', label: 'Risk & Retention' },
]

export function AiForecastingPanel({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('forecasts')

  return (
    <div
      className={`flex flex-col rounded-xl ${className}`}
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      {/* Tab bar */}
      <div
        className="px-5 pt-4 flex items-center shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 pb-3 pt-0 text-sm font-medium transition-colors border-b-2"
            style={{
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
              borderBottomColor: activeTab === tab.id ? 'var(--accent-cool)' : 'transparent',
              fontWeight: activeTab === tab.id ? 600 : 400,
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              marginBottom: '-1px',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 p-5 overflow-hidden">
        {activeTab === 'forecasts' && <ForecastsTab />}
        {activeTab === 'intelligence' && <IntelligenceTab />}
        {activeTab === 'optimization' && <OptimizationTab />}
        {activeTab === 'risk' && <RiskRetentionTab />}
      </div>
    </div>
  )
}
