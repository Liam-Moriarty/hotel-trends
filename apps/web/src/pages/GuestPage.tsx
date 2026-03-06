import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const platforms = [
  { name: 'Google', initial: 'G', reviews: '1,842 reviews', score: 4.6, outOf: 5 },
  { name: 'TripAdvisor', initial: 'T', reviews: '956 reviews', score: 4.4, outOf: 5 },
  { name: 'Booking.com', initial: 'B', reviews: '2,341 reviews', score: 8.7, outOf: 10 },
  { name: 'Expedia', initial: 'E', reviews: '621 reviews', score: 8.3, outOf: 10 },
] as const

const sentimentTrend = [
  { month: 'Oct', score: 7.9 },
  { month: 'Nov', score: 8.1 },
  { month: 'Dec', score: 8.4 },
  { month: 'Jan', score: 8.2 },
  { month: 'Feb', score: 8.6 },
  { month: 'Mar', score: 8.9 },
]

const breakdown = [
  { label: 'Positive', value: 68, color: '#22c55e' },
  { label: 'Mixed', value: 22, color: '#f59e0b' },
  { label: 'Negative', value: 10, color: '#ef4444' },
]

const touchpoints = [
  { label: 'Check-in', score: 8.7, color: '#22c55e' },
  { label: 'Room Quality', score: 8.9, color: '#22c55e' },
  { label: 'F&B', score: 7.1, color: '#f59e0b' },
  { label: 'Spa & Wellness', score: 8.5, color: '#22c55e' },
  { label: 'Housekeeping', score: 8.3, color: '#22c55e' },
  { label: 'Check-out', score: 7.8, color: '#818cf8' },
  { label: 'Concierge', score: 7.0, color: '#f59e0b' },
]

const reviews = [
  {
    initial: 'Y',
    name: 'Yuki T.',
    platform: 'via Booking.com',
    stars: 5,
    text: 'Perfect anniversary stay. Staff remembered our special occasion — champagne was a lovely surprise!',
    tags: ['Staff', 'Anniversary'],
    time: '6h ago',
    positive: true,
  },
  {
    initial: 'C',
    name: 'Carlos M.',
    platform: 'via Google',
    stars: 3,
    text: 'Good location but F&B prices are excessive. Breakfast quality has dropped compared to last year.',
    tags: ['F&B', 'Value'],
    time: '8h ago',
    positive: false,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ score, outOf }: { score: number; outOf: number }) {
  const normalised = outOf === 10 ? score / 2 : score
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={i <= Math.round(normalised) ? 'text-yellow-400' : 'text-muted-foreground'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

function DonutChart({ data }: { data: typeof breakdown }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  let cumulative = 0
  const radius = 60
  const cx = 80
  const cy = 80
  const strokeWidth = 20

  const segments = data.map(d => {
    const pct = d.value / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const endAngle = (cumulative + pct) * 2 * Math.PI - Math.PI / 2
    cumulative += pct

    const x1 = cx + radius * Math.cos(startAngle)
    const y1 = cy + radius * Math.sin(startAngle)
    const x2 = cx + radius * Math.cos(endAngle)
    const y2 = cy + radius * Math.sin(endAngle)
    const largeArc = pct > 0.5 ? 1 : 0

    return {
      ...d,
      d: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    }
  })

  return (
    <svg viewBox="0 0 160 160" className="w-36 h-36">
      {segments.map(s => (
        <path
          key={s.label}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GuestPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Guest Experience</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Real-time sentiment, CRM profiles &amp; service recovery
          </p>
        </div>
        <Button variant="destructive" size="sm" className="flex items-center gap-2">
          <Bell className="w-4 h-4" />1 Negative Alert
        </Button>
      </div>

      {/* Platform Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map(p => (
          <Card key={p.name}>
            <CardContent className="pt-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center font-bold text-sm">
                  {p.initial}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.reviews}</p>
                </div>
              </div>
              <p className="text-3xl font-bold">{p.score}</p>
              <StarRating score={p.score} outOf={p.outOf} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sentiment Score Trend + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sentiment Score Trend</CardTitle>
            <p className="text-xs text-muted-foreground">
              Aggregate NLP sentiment score (0–10) over 6 months
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[6, 10]}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sentiment Breakdown</CardTitle>
            <p className="text-xs text-muted-foreground">All channels · Last 30 days</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <DonutChart data={breakdown} />
            <div className="w-full space-y-1.5">
              {breakdown.map(b => (
                <div key={b.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ background: b.color }}
                    />
                    <span className="text-muted-foreground">{b.label}</span>
                  </div>
                  <span className="font-semibold" style={{ color: b.color }}>
                    {b.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Touchpoint Breakdown + Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment by Touchpoint</CardTitle>
            <p className="text-xs text-muted-foreground">Score out of 10</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {touchpoints.map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-28 shrink-0 text-right">
                  {t.label}
                </span>
                <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(t.score / 10) * 100}%`,
                      background: t.color,
                    }}
                  />
                </div>
                <span className="text-sm font-medium w-6 text-right">{t.score}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs text-muted-foreground pt-1 pl-32">
              <span>0</span>
              <span>3</span>
              <span>6</span>
              <span>10</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {reviews.map((r, i) => (
              <div key={i} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {r.initial}
                    </div>
                    <div>
                      <span className="text-sm font-semibold">{r.name}</span>
                      <span className="text-xs text-muted-foreground ml-1">{r.platform}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-yellow-400 text-sm">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={idx < r.stars ? 'text-yellow-400' : 'text-muted-foreground'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {r.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{r.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
