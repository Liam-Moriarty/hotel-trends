import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'
import { maintenanceAlerts, churnGuests } from '@/mocks'

const loyaltyStats = [
  { label: 'Likely to Return', value: '2,841', pct: '62%', color: 'var(--status-success)' },
  { label: 'At-Risk Guests', value: '784', pct: '17%', color: 'var(--status-warning)' },
  { label: 'Likely Churned', value: '412', pct: '9%', color: 'var(--status-error)' },
]

type MaintenanceAlert = { name: string; eta: string; cost: string; pct: number; color: string }
type ChurnGuest = {
  initials: string
  name: string
  stays: string
  ltv: string
  churn: number
  color: string
}

function maintColor(pct: number) {
  if (pct >= 80) return 'var(--status-error)'
  if (pct >= 50) return 'var(--status-warning)'
  return 'var(--status-info)'
}
function etaColor(eta: string) {
  if (eta.includes('days')) return 'var(--status-error)'
  if (eta.includes('1–2')) return 'var(--status-warning)'
  return 'var(--text-secondary)'
}

function MaintenanceRow({ item }: { item: MaintenanceAlert }) {
  const ringColor = maintColor(item.pct)
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg"
      style={{
        background: 'var(--surface-container-high)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Probability ring */}
      <div className="relative w-11 h-11 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius={14}
            outerRadius={20}
            startAngle={210}
            endAngle={-30}
            data={[{ value: item.pct, fill: ringColor }]}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={2}
              background={{ fill: 'var(--surface-hover)' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] font-bold tabular-nums" style={{ color: ringColor }}>
            {item.pct}%
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {item.name}
        </p>
        <p className="text-xs" style={{ color: etaColor(item.eta) }}>
          {item.eta}
        </p>
      </div>
      {/* Cost */}
      <div className="text-right shrink-0">
        <p
          className="text-sm font-semibold tabular-nums"
          style={{ color: 'var(--status-warning)' }}
        >
          {item.cost}
        </p>
        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          est. repair
        </p>
      </div>
    </div>
  )
}

function AtRiskGuestRow({ guest }: { guest: ChurnGuest }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg"
      style={{ border: '1px solid var(--border-subtle)' }}
    >
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
        style={{ background: 'var(--surface-container-high)', color: 'var(--text-primary)' }}
      >
        {guest.initials}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
          {guest.name}
        </p>
        <p className="text-xs tabular-nums" style={{ color: 'var(--text-secondary)' }}>
          {guest.stays} · {guest.ltv}
        </p>
      </div>
      {/* Churn + action */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--status-error)' }}>
          {guest.churn}%
        </span>
        <button
          className="text-xs px-2 py-0.5 rounded-md"
          style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
        >
          Outreach
        </button>
      </div>
    </div>
  )
}

export function RiskRetentionTab() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {/* Left: Predictive Maintenance */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <p className="text-sm font-semibold mb-3 shrink-0" style={{ color: 'var(--text-primary)' }}>
          Predictive Maintenance Alerts
        </p>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {(maintenanceAlerts as MaintenanceAlert[]).map((item, i) => (
            <MaintenanceRow key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Right: Loyalty vs Churn */}
      <div
        className="flex flex-col rounded-lg p-4"
        style={{ background: 'var(--surface-container)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="mb-3 shrink-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Loyalty vs Churn Prediction
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Guest retention model — next 30 days
          </p>
        </div>
        {/* 3-stat summary */}
        <div className="grid grid-cols-3 gap-2 mb-4 shrink-0">
          {loyaltyStats.map(s => (
            <div
              key={s.label}
              className="p-3 rounded-lg text-center"
              style={{
                background: 'var(--surface-container-high)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p className="text-xl font-bold tabular-nums" style={{ color: s.color }}>
                {s.value}
              </p>
              <p
                className="text-xs font-medium tabular-nums"
                style={{ color: s.color, opacity: 0.8 }}
              >
                {s.pct}
              </p>
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {/* At-risk list */}
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-2 shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          Top at-risk high-value guests
        </p>
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
          {(churnGuests as ChurnGuest[]).map((g, i) => (
            <AtRiskGuestRow key={i} guest={g} />
          ))}
        </div>
      </div>
    </div>
  )
}
