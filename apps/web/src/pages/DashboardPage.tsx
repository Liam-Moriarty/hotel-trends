import { capex, depts, insights, kpis, revenueData, revparData } from '@/mocks'
import { useState } from 'react'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import type { InsightVariant, Kpi } from '@/interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'

const BASE_REVPAR = 183

const dotColors: Record<InsightVariant, string> = {
  destructive: 'bg-destructive',
  warning: 'bg-yellow-500',
  success: 'bg-green-500',
  secondary: 'bg-muted-foreground',
}

const ctaClasses: Record<InsightVariant, string> = {
  destructive: 'border-destructive/40 text-destructive hover:bg-destructive/10',
  warning: 'border-yellow-500/40 text-yellow-600 hover:bg-yellow-500/10',
  success: 'border-green-500/40 text-green-600 hover:bg-green-500/10',
  secondary: 'border-border text-foreground hover:bg-accent',
}

// ── Sub-components ───────────────────────────────────────────────────────────

function HealthScore() {
  const score = 78
  const r = 52,
    cx = 70,
    cy = 70
  const circ = 2 * Math.PI * r
  const sweep = 270
  const dashLen = (sweep / 360) * circ
  const filled = (score / 100) * dashLen

  return (
    <Card className="min-w-[200px]">
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
          Daily Health Score
        </p>
        <div className="flex justify-center">
          <svg width={140} height={100} viewBox="0 0 140 100">
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={8}
              strokeDasharray={`${dashLen} ${circ}`}
              strokeDashoffset={-circ * (90 / 360)}
              strokeLinecap="round"
              transform="rotate(135 70 70)"
            />
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={8}
              strokeDasharray={`${filled} ${circ}`}
              strokeDashoffset={-circ * (90 / 360)}
              strokeLinecap="round"
              transform="rotate(135 70 70)"
            />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize={28}
              fontWeight={700}
            >
              {score}
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fill="hsl(var(--primary))"
              fontSize={11}
              fontWeight={600}
            >
              GOOD
            </text>
          </svg>
        </div>
        <div className="flex justify-around mt-2">
          {[
            ['84%', 'OCC'],
            ['$218', 'RATE'],
            ['4.6', 'CSAT'],
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="text-sm font-bold text-foreground">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function KpiCard({ label, value, sub, up }: Kpi) {
  return (
    <Card className="flex-1 min-w-[140px]">
      <CardContent className="p-5">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <p className="text-2xl font-bold tracking-tight mb-1">{value}</p>
        <p className={`text-xs font-medium ${up ? 'text-green-600' : 'text-destructive'}`}>
          {up ? '↑' : '↘'} {sub}
        </p>
      </CardContent>
    </Card>
  )
}

function DeptPerformance() {
  const avg = (depts.reduce((s, d) => s + d.score, 0) / depts.length).toFixed(1)
  return (
    <Card className="flex-1">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">Department Performance</CardTitle>
        <CardDescription>Performance index (0–100)</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="flex flex-col gap-3.5">
          {depts.map(d => (
            <div key={d.name}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-muted-foreground">{d.name}</span>
                <span className="text-sm font-semibold text-foreground">{d.score}</span>
              </div>
              <Progress value={d.score} />
            </div>
          ))}
        </div>
        <Separator className="mt-4 mb-3" />
        <div className="flex justify-between">
          <span className="text-xs text-muted-foreground">Overall Avg</span>
          <span className="text-sm font-semibold">{avg} / 100</span>
        </div>
      </CardContent>
    </Card>
  )
}

function RevenueChart() {
  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">Revenue &amp; Occupancy</CardTitle>
        <CardDescription>This week vs forecast</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(v: number | string | undefined) => {
                if (typeof v === 'number') return [`$${(v / 1000).toFixed(1)}k`]
                return ['']
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(v: string) => (
                <span style={{ color: 'hsl(var(--muted-foreground))', fontSize: 11 }}>
                  {v === 'actual' ? 'Actual Revenue' : 'Forecast'}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              fill="url(#aGrad)"
              strokeWidth={2}
              dot={false}
              name="actual"
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--muted-foreground))"
              fill="url(#fGrad)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 3"
              name="forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function InsightsPanel() {
  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-base">🤖</span>
            <CardTitle className="text-sm">AI Insights Panel</CardTitle>
          </div>
          <Badge variant="secondary" className="rounded-full text-[11px]">
            ✦ GPT-4o
          </Badge>
        </div>
        <CardDescription>4 automated recommendations • Updated 2 min ago</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {insights.map(i => (
            <div key={i.title} className="rounded-md border bg-background p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-2 h-2 rounded-full ${dotColors[i.variant]}`} />
                <Badge
                  variant={i.variant}
                  className="text-[10px] tracking-widest uppercase rounded"
                >
                  {i.badge}
                </Badge>
              </div>
              <p className="text-sm font-semibold mb-1.5">{i.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{i.body}</p>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs bg-transparent ${ctaClasses[i.variant]}`}
              >
                {i.cta}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ScenarioSimulator() {
  const [occ, setOcc] = useState(84)
  const [adr, setAdr] = useState(0)
  const [cpr, setCpr] = useState(62)

  const projected = Math.round(BASE_REVPAR * (occ / 84) * (1 + adr / 218) - (cpr - 62) * 0.3)
  const diff = projected - BASE_REVPAR

  return (
    <Card className="flex-1 min-w-[260px]">
      <CardContent className="p-5">
        <p className="font-semibold text-sm mb-5">⊙ Scenario Simulator</p>
        {[
          {
            label: 'Occupancy Rate',
            val: occ,
            set: setOcc,
            min: 40,
            max: 100,
            fmt: (v: number) => `${v}%`,
            step: 1,
          },
          {
            label: 'ADR Adjustment',
            val: adr,
            set: setAdr,
            min: -50,
            max: 100,
            fmt: (v: number) => `$${v}`,
            step: 1,
          },
          {
            label: 'Cost per Room',
            val: cpr,
            set: setCpr,
            min: 30,
            max: 150,
            fmt: (v: number) => `$${v}`,
            step: 1,
          },
        ].map(s => (
          <div key={s.label} className="mb-5">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <span className="text-sm font-semibold">{s.fmt(s.val)}</span>
            </div>
            <Slider value={s.val} onValueChange={s.set} min={s.min} max={s.max} step={s.step} />
          </div>
        ))}
        <div className="rounded-md border bg-muted/40 p-4 mb-3">
          <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1.5">
            Projected RevPAR
          </p>
          <p className="text-3xl font-bold tracking-tight mb-1">${projected}</p>
          <p className={`text-xs font-medium ${diff >= 0 ? 'text-green-600' : 'text-destructive'}`}>
            {diff >= 0 ? '▲' : '▼'} {Math.abs(diff)} vs current baseline
          </p>
        </div>
        <Button className="w-full">Run Full Scenario</Button>
      </CardContent>
    </Card>
  )
}

function RevparForecast() {
  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">RevPAR Forecast</CardTitle>
            <CardDescription>Actual vs AI-predicted trend (H1 2026)</CardDescription>
          </div>
          <Badge variant="secondary" className="rounded-full text-[11px]">
            ✦ Confidence 91%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revparData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v}`}
              domain={[170, 270]}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(v: number | string | undefined) => {
                if (typeof v === 'number') return [`$${v}`]
                return ['']
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              dot={{ r: 4, fill: 'hsl(var(--primary))' }}
              connectNulls={false}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              dot={false}
              strokeDasharray="6 3"
              connectNulls={false}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

function CapExPanel() {
  return (
    <Card className="flex-1">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-sm">CapEx Prioritization</CardTitle>
        <CardDescription>AI-ranked investment priorities</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="flex flex-col gap-4">
          {capex.map((c, i) => (
            <div key={c.name}>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-muted-foreground text-[11px] font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm flex-1">{c.name}</span>
                <span className="text-xs font-semibold text-green-600">{c.roi}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Progress value={c.bar} className="flex-1" />
                <span className="text-xs text-muted-foreground w-6">{c.score}</span>
                <span className="text-xs text-muted-foreground w-9 text-right">{c.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ExecutiveDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight mb-1">Hotel Intelligence Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Grand Azure Hotel &amp; Resort · Last updated 2 min ago
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-green-600 border-border bg-background px-3 py-1.5 rounded-md text-xs font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Live Data
          </Badge>
          <Button size="sm">Export Report</Button>
        </div>
      </div>

      {/* Row 1 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <HealthScore />
        {kpis.map(k => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <RevenueChart />
        <DeptPerformance />
      </div>

      {/* Row 3 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <InsightsPanel />
        <ScenarioSimulator />
      </div>

      {/* Row 4 */}
      <div className="flex gap-3 flex-wrap">
        <RevparForecast />
        <CapExPanel />
      </div>
    </div>
  )
}
