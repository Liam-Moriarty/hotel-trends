import { useState } from 'react'
import { OverviewTab } from './tabs/OverviewTab'
import { RevenueTab } from './tabs/RevenueTab'
import { OperationsTab } from './tabs/OperationsTab'
import { AiForecastTab } from './tabs/AiForecastTab'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'operations', label: 'Operations' },
  { id: 'ai', label: 'AI & Forecast' },
]

export function MainPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div
      className="flex-1 min-w-0 flex flex-col rounded-xl h-full"
      style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
    >
      {/* Tab bar */}
      <div
        className="px-5 pt-4 flex items-center gap-0 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 pb-3 pt-0 text-sm transition-colors border-b-2"
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
      <div className="flex-1 min-h-0 p-5 overflow-y-auto">
        {activeTab === 'overview' && <OverviewTab onViewAiTab={() => setActiveTab('ai')} />}
        {activeTab === 'revenue' && <RevenueTab />}
        {activeTab === 'operations' && <OperationsTab />}
        {activeTab === 'ai' && <AiForecastTab />}
      </div>
    </div>
  )
}
