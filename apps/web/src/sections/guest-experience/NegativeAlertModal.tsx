import { X, Bell, Sparkles } from 'lucide-react'

const AFFECTED_GUESTS = [
  { name: 'R. Martinez', room: '408', checkedIn: 'Mar 22' },
  { name: 'T. Chen', room: '312', checkedIn: 'Mar 21' },
  { name: 'A. Park', room: '506', checkedIn: 'Mar 22' },
]

export function NegativeAlertModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <div
        className="relative w-[480px] rounded-2xl p-6"
        style={{
          background: 'var(--surface-glass)',
          backdropFilter: 'blur(28px) saturate(180%)',
          border: '1px solid var(--border-default)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.24)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Bell size={15} style={{ color: 'var(--status-error)' }} />
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Negative Sentiment Alert
            </p>
          </div>
          <button
            onClick={onClose}
            className="transition-colors"
            style={{ color: 'var(--text-ghost)' }}
          >
            <X size={16} />
          </button>
        </div>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          Triggered: Last 2 hours
        </p>

        {/* Alert summary */}
        <div
          className="p-3 rounded-lg mb-4"
          style={{
            background: 'var(--status-error-bg)',
            border: '1px solid rgba(220, 38, 38, 0.20)',
          }}
        >
          <p className="text-sm font-semibold" style={{ color: 'var(--status-error)' }}>
            3 new 1-star reviews in 2h on Google
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
            Common theme: "Wi-Fi issues during conference"
          </p>
        </div>

        {/* Affected guests */}
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-muted)' }}
        >
          Affected Guests
        </p>
        <div
          className="rounded-lg overflow-hidden mb-4"
          style={{ border: '1px solid var(--border-subtle)' }}
        >
          {AFFECTED_GUESTS.map((g, idx) => (
            <div
              key={g.name}
              className="flex items-center justify-between px-3 py-2 text-xs"
              style={{
                background: 'var(--surface-container-high)',
                borderBottom:
                  idx < AFFECTED_GUESTS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                {g.name}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>rm {g.room}</span>
              <span style={{ color: 'var(--text-muted)' }}>Checked in {g.checkedIn}</span>
            </div>
          ))}
        </div>

        {/* AI Recommendation */}
        <div
          className="flex items-start gap-2 p-3 rounded-lg mb-5"
          style={{
            background: 'var(--surface-container-high)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <Sparkles
            size={13}
            style={{ color: 'var(--accent-violet)', marginTop: 1, flexShrink: 0 }}
          />
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              AI Recommendation:
            </span>{' '}
            Contact guests with Wi-Fi support or room upgrade offer within 1hr
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:brightness-95"
            style={{
              background: 'var(--surface-container-high)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            onClick={onClose}
          >
            Dismiss
          </button>
          <button
            className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors hover:brightness-95"
            style={{
              background: 'var(--status-warning-bg)',
              borderColor: 'rgba(245, 158, 11, 0.25)',
              color: 'var(--status-warning)',
            }}
          >
            Notify IT
          </button>
          <button
            className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:brightness-95"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cool), var(--accent-violet))',
              color: 'white',
            }}
          >
            Send Recovery Offer
          </button>
        </div>
      </div>
    </div>
  )
}
