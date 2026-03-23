import { Globe } from 'lucide-react'

export function ExternalIntelligenceHeader() {
  return (
    <div className="flex items-start justify-between shrink-0">
      <div>
        <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          External Intelligence
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Weather, events, flights, competitor activity & macro signals
        </p>
      </div>

      <div
        className="flex items-center gap-1.5 text-xs font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        <Globe size={13} style={{ color: 'var(--text-muted)' }} />
        Live External Feeds Active
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse ml-0.5"
          style={{ background: 'var(--status-success)' }}
        />
      </div>
    </div>
  )
}
