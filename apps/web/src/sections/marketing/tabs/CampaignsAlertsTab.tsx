import { AlertTriangle, Sparkles } from 'lucide-react'
import { emailCampaigns, wastedSpend } from '@/mocks'

// ── Enriched wasted-spend mock (until API provides full detail) ──────────────
const WASTED_ALERTS = [
  {
    id: 1,
    channel: 'Google Display',
    wasteAmount: '$2,100',
    issueType: 'Low CTR · Google Display',
    recommendation: 'Pause or reallocate to higher-performing channels',
    action: 'Pause Spend →',
    severity: 'high' as const,
  },
  {
    id: 2,
    channel: 'Meta Stories',
    wasteAmount: '$890',
    issueType: 'High CPC · Meta Stories',
    recommendation: 'Adjust audience targeting for better match rates',
    action: 'Adjust Targeting →',
    severity: 'medium' as const,
  },
]

// Suppress the unused import warning — wastedSpend is available for backend swap
void wastedSpend

// ── Sub-components ───────────────────────────────────────────────────────────

function CampaignStat({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status?: 'success' | 'neutral'
}) {
  const color = status === 'success' ? 'var(--status-success)' : 'var(--text-primary)'
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-1 rounded-md"
      style={{ background: 'var(--surface-container-high)' }}
    >
      <span
        className="text-[10px] font-bold uppercase tracking-wider"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
      <span className="text-xs font-semibold tabular-nums" style={{ color }}>
        {value}
      </span>
    </div>
  )
}

function CampaignRow({ campaign }: { campaign: (typeof emailCampaigns)[number] }) {
  return (
    <div
      className="py-3 px-2 cursor-pointer rounded-md transition-colors"
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {campaign.name}
        </span>
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--status-success)' }}>
          {campaign.revenue}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: campaign.sent.toLocaleString(), label: 'SENT' },
          { value: campaign.opens, label: 'OPENS' },
          { value: campaign.clicks, label: 'CLICKS' },
          { value: campaign.bookings.toString(), label: 'BOOKINGS' },
        ].map(stat => (
          <div
            key={stat.label}
            className="p-2 rounded-md text-center"
            style={{ background: 'var(--surface-container-high)' }}
          >
            <p className="text-sm font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
              {stat.value}
            </p>
            <p
              className="text-[10px] font-bold uppercase tracking-wider mt-0.5"
              style={{ color: 'var(--text-muted)' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WastedSpendAlertRow({ alert }: { alert: (typeof WASTED_ALERTS)[number] }) {
  const accentColor = alert.severity === 'high' ? 'var(--status-error)' : 'var(--status-warning)'

  return (
    <div
      className="relative flex flex-col gap-1 p-3 rounded-lg cursor-pointer overflow-hidden"
      style={{
        background: 'var(--surface-container)',
        border: '1px solid var(--border-subtle)',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface-container)')}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 rounded-l-lg"
        style={{ width: 3, background: accentColor }}
      />
      <div className="pl-2">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {alert.channel}
          </span>
          <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--status-error)' }}>
            {alert.wasteAmount} identified waste
          </span>
        </div>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {alert.issueType}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Sparkles size={10} style={{ color: 'var(--accent-violet)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--accent-violet)' }}>
              {alert.recommendation}
            </span>
          </div>
          <button
            className="text-xs"
            style={{ color: 'var(--accent-cool)' }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.textDecoration = 'underline')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.textDecoration = 'none')
            }
          >
            {alert.action}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Email Campaign Card ───────────────────────────────────────────────────────

function EmailCampaignCard() {
  const totalRev = '$69.4K'
  const avgOpen = '42%'

  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
        Email Campaign Performance
      </p>

      <div className="flex items-center gap-2 mb-3 shrink-0 flex-wrap">
        <CampaignStat label="ACTIVE" value={emailCampaigns.length.toString()} />
        <CampaignStat label="TOTAL REV" value={totalRev} status="success" />
        <CampaignStat label="AVG OPEN" value={avgOpen} status="success" />
      </div>

      <div
        className="flex flex-col flex-1 overflow-y-auto"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        {emailCampaigns.map((c, i) => (
          <div key={c.name} style={i > 0 ? { borderTop: '1px solid var(--border-subtle)' } : {}}>
            <CampaignRow campaign={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Wasted Spend Card ─────────────────────────────────────────────────────────

function WastedSpendCard() {
  return (
    <div
      className="flex flex-col p-4 h-full overflow-hidden rounded-lg"
      style={{ border: '1px solid var(--border-subtle)', background: 'var(--surface-container)' }}
    >
      <div className="flex items-center gap-2 mb-3 shrink-0">
        <AlertTriangle size={14} style={{ color: 'var(--status-error)' }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Wasted Ad Spend Alerts
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            AI-detected inefficient spend
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {WASTED_ALERTS.map(alert => (
          <WastedSpendAlertRow key={alert.id} alert={alert} />
        ))}
      </div>

      {/* Total waste summary */}
      <div
        className="mt-3 p-3 rounded-lg shrink-0"
        style={{
          background: 'var(--surface-container-high)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Identified Waste This Week
        </p>
        <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--status-error)' }}>
          $2,990
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--status-warning)' }}>
          ↑ vs last week $1,840
        </p>
      </div>

      {/* CTA */}
      <button
        className="mt-3 w-full py-2 rounded-full text-sm font-semibold text-white shrink-0"
        style={{ background: 'var(--accent-gradient)' }}
      >
        Review All Alerts
      </button>
    </div>
  )
}

// ── Tab export ────────────────────────────────────────────────────────────────

export function CampaignsAlertsTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <EmailCampaignCard />
      <WastedSpendCard />
    </div>
  )
}
