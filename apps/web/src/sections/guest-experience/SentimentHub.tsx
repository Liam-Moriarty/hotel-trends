import { useState } from 'react'
import { SentimentTrendTab } from './tabs/SentimentTrendTab'
import { SentimentBreakdownTab } from './tabs/SentimentBreakdownTab'
import { SentimentTouchpointTab } from './tabs/SentimentTouchpointTab'

type Tab = 'trend' | 'breakdown' | 'touchpoint'

const TABS: { value: Tab; label: string }[] = [
  { value: 'trend', label: 'Sentiment Trend' },
  { value: 'breakdown', label: 'Breakdown' },
  { value: 'touchpoint', label: 'By Touchpoint' },
]

export function SentimentHub({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<Tab>('trend')

  return (
    <div
      className={`flex flex-col rounded-xl ${className ?? ''}`}
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      {/* Tab bar */}
      <div
        className="flex items-end justify-between px-5 pt-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex">
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
        <span className="text-[10px] pb-3" style={{ color: 'var(--text-muted)' }}>
          Last 6 weeks · All channels
        </span>
      </div>

      {/* Tab content */}
      <div className="flex-1 min-h-0 p-5 overflow-hidden">
        {activeTab === 'trend' && <SentimentTrendTab />}
        {activeTab === 'breakdown' && <SentimentBreakdownTab />}
        {activeTab === 'touchpoint' && <SentimentTouchpointTab />}
      </div>
    </div>
  )
}
