import { RefreshCw } from 'lucide-react'
import type { LocalEvent, FlightArrival } from '@/interface'
import { externalEvents, externalFlights } from '@/mocks'

// ── Impact helpers ────────────────────────────────────────────────────────────

function getImpactStyle(impact: string) {
  switch (impact) {
    case 'Very High':
      return { bg: 'var(--status-error-bg)', color: 'var(--status-error)' }
    case 'High':
      return { bg: 'var(--status-warning-bg)', color: 'var(--status-warning)' }
    case 'Medium':
      return { bg: 'var(--surface-active)', color: 'var(--text-secondary)' }
    default:
      return { bg: 'var(--surface-container-high)', color: 'var(--text-muted)' }
  }
}

// ── Flight status helpers ─────────────────────────────────────────────────────

function getFlightStatusStyle(status: string) {
  if (status === 'On Time') return { color: 'var(--status-success)', dot: 'var(--status-success)' }
  if (status.startsWith('Delayed'))
    return { color: 'var(--status-warning)', dot: 'var(--status-warning)' }
  if (status === 'Cancelled') return { color: 'var(--status-error)', dot: 'var(--status-error)' }
  return { color: 'var(--text-primary)', dot: 'var(--text-muted)' }
}

// ── EventRow ──────────────────────────────────────────────────────────────────

function EventRow({ event: e }: { event: LocalEvent }) {
  const impact = getImpactStyle(e.impact)

  return (
    <div
      className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-[var(--surface-hover)]"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Date block */}
      <div className="w-9 shrink-0 text-center">
        <p
          className="text-[9px] font-bold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          {e.month}
        </p>
        <p className="text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          {e.dateRange}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
          {e.name}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
          {e.venue}
          {e.tags.includes('attendance') ? '' : ''}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {/* Category tags */}
          {e.tags.map(tag => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{
                background: 'var(--surface-active)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
          {/* Impact pill */}
          <span
            className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase"
            style={{ background: impact.bg, color: impact.color }}
          >
            {e.impact}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── LocalEventsCard ───────────────────────────────────────────────────────────

function LocalEventsCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Local Events Calendar
      </p>
      <div className="flex flex-col flex-1 overflow-y-auto gap-2">
        {externalEvents.map((e, idx) => (
          <EventRow key={idx} event={e} />
        ))}
      </div>
    </div>
  )
}

// ── FlightRow ─────────────────────────────────────────────────────────────────

function FlightRow({ flight: f }: { flight: FlightArrival }) {
  const statusStyle = getFlightStatusStyle(f.status)
  const isCancelled = f.status === 'Cancelled'
  const isOnTime = f.status === 'On Time'

  return (
    <div className="relative flex items-center gap-3 py-2.5 px-2 rounded-md cursor-pointer transition-colors hover:bg-[var(--surface-hover)] overflow-hidden">
      {/* Left accent bar for cancelled */}
      {isCancelled && (
        <div
          className="absolute left-0 top-0 bottom-0 rounded-l-md"
          style={{ width: 3, background: 'var(--status-error)' }}
        />
      )}

      {/* Time */}
      <span
        className="text-sm font-bold tabular-nums w-10 shrink-0"
        style={{
          color: isCancelled ? 'var(--status-error)' : 'var(--text-primary)',
          paddingLeft: isCancelled ? 6 : 0,
        }}
      >
        {f.time}
      </span>

      {/* Flight info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {f.origin}
        </p>
        <p className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
          {f.flight} · {f.pax} pax
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1 shrink-0">
        <span
          className={`w-1.5 h-1.5 rounded-full ${isOnTime ? 'animate-pulse' : ''}`}
          style={{ background: statusStyle.dot }}
        />
        <span className="text-[11px] font-bold" style={{ color: statusStyle.color }}>
          {f.status}
        </span>
      </div>
    </div>
  )
}

// ── FlightTrackerCard ─────────────────────────────────────────────────────────

function FlightTrackerCard() {
  return (
    <div
      className="flex flex-col p-4 h-full rounded-lg overflow-hidden"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Flight Arrival Tracker
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Today · International
          </p>
        </div>
        <button className="transition-colors" style={{ color: 'var(--text-ghost)' }}>
          <RefreshCw size={13} />
        </button>
      </div>

      <div
        className="flex flex-col flex-1 overflow-y-auto"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {externalFlights.map((f, idx) => (
          <div
            key={idx}
            style={{
              borderBottom:
                idx < externalFlights.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}
          >
            <FlightRow flight={f} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function DemandSignalsTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <LocalEventsCard />
      <FlightTrackerCard />
    </div>
  )
}
