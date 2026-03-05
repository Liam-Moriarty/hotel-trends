import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { DollarSign, TrendingUp, Target, BookOpen } from 'lucide-react'

// --- Mock Data ---
const kpiCards = [
  {
    title: 'Total Ad Spend (MTD)',
    value: '$37.8K',
    change: '+12%',
    positive: false,
    icon: DollarSign,
  },
  {
    title: 'Total Ad Revenue',
    value: '$136.7K',
    change: '+24%',
    positive: true,
    icon: TrendingUp,
  },
  {
    title: 'Blended ROAS',
    value: '3.6x',
    change: '+0.4x',
    positive: true,
    icon: Target,
  },
  {
    title: 'Direct Booking Conv.',
    value: '1.95%',
    change: '+0.3pp',
    positive: true,
    icon: BookOpen,
  },
]

const adsPerformanceData = [
  { week: 'W1', googleSpend: 4200, metaSpend: 2100, googleRevenue: 15800, metaRevenue: 7200 },
  { week: 'W2', googleSpend: 5100, metaSpend: 2800, googleRevenue: 18200, metaRevenue: 9100 },
  { week: 'W3', googleSpend: 4700, metaSpend: 2400, googleRevenue: 17100, metaRevenue: 8400 },
  { week: 'W4', googleSpend: 4400, metaSpend: 2500, googleRevenue: 16600, metaRevenue: 8800 },
]

const funnelSteps = [
  { label: 'Website Visits', value: 48200, dropOff: '62% drop-off', color: 'bg-violet-600' },
  { label: 'Room Page Views', value: 18400, dropOff: '63% drop-off', color: 'bg-violet-500' },
  { label: 'Rate Check / Search', value: 6800, dropOff: '68% drop-off', color: 'bg-violet-400' },
  { label: 'Booking Started', value: 2200, dropOff: '57% drop-off', color: 'bg-violet-300' },
  { label: 'Booking Completed', value: 940, dropOff: null, color: 'bg-green-400' },
]

const roasChannels = [
  {
    name: 'Email Direct',
    roas: 8.7,
    spend: '$0.8k',
    pct: 100,
    color: 'bg-green-500',
    status: null,
  },
  {
    name: 'Google Search',
    roas: 4.4,
    spend: '$18.4k',
    pct: 50,
    color: 'bg-green-500',
    status: null,
  },
  { name: 'Meta Feed', roas: 3.2, spend: '$9.8k', pct: 36, color: 'bg-green-500', status: null },
  {
    name: 'Google Display',
    roas: 2.1,
    spend: '$5.2k',
    pct: 24,
    color: 'bg-red-500',
    status: 'Below target',
  },
  {
    name: 'Meta Stories',
    roas: 1.8,
    spend: '$3.6k',
    pct: 20,
    color: 'bg-red-500',
    status: 'Below target',
  },
]

const wastedSpend = [
  { label: 'Google Display', amount: '-$1,840' },
  { label: 'Meta Broad Targeting', amount: '-$1,240' },
  { label: 'Generic Keywords', amount: '-$960' },
]

const attributionData = [
  { channel: 'Google Ads', value: 31 },
  { channel: 'Meta Ads', value: 22 },
  { channel: 'Email', value: 20 },
  { channel: 'Direct', value: 28 },
  { channel: 'OTA Referral', value: 14 },
]

const attributionColors: Record<string, string> = {
  'Google Ads': '#6366f1',
  'Meta Ads': '#3b82f6',
  Email: '#22c55e',
  Direct: '#f59e0b',
  'OTA Referral': '#ef4444',
}

const emailCampaigns = [
  {
    name: 'Pre-Arrival Upgrade Offer',
    revenue: '$28.4k rev',
    sent: 3420,
    opens: '48%',
    clicks: '14%',
    bookings: 82,
  },
  {
    name: 'Spring Staycation Package',
    revenue: '$41.2k rev',
    sent: 8200,
    opens: '36%',
    clicks: '9%',
    bookings: 94,
  },
]

type AttributionMode = 'First Touch' | 'Last Touch' | 'Linear'

export default function MarketingPage() {
  const [attributionMode, setAttributionMode] = useState<AttributionMode>('Linear')
  const maxAttr = Math.max(...attributionData.map(d => d.value))

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map(kpi => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-sm mt-1 ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.positive ? '↑' : '↓'} {kpi.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Row 2: Ads Chart + Funnel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Ads Performance Chart */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Google & Meta Ads Performance</CardTitle>
            <CardDescription>Weekly spend vs revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={adsPerformanceData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `$${v / 1000}k`} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="googleSpend"
                  name="Google Spend"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="metaSpend" name="Meta Spend" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="googleRevenue"
                  name="Google Revenue"
                  fill="#93c5fd"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="metaRevenue"
                  name="Meta Revenue"
                  fill="#bfdbfe"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Website Booking Funnel</CardTitle>
            <CardDescription>This month conversion flow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {funnelSteps.map((step, i) => {
              const maxVal = funnelSteps[0].value
              const pct = Math.round((step.value / maxVal) * 100)
              return (
                <div key={step.label}>
                  <div className="flex items-center justify-between">
                    <div
                      className={`${step.color} text-white text-xs font-medium px-3 py-1.5 rounded flex items-center justify-between`}
                      style={{ width: `${pct}%`, minWidth: '60%' }}
                    >
                      <span>{step.label}</span>
                    </div>
                    <span className="text-sm font-semibold ml-2 whitespace-nowrap">
                      {step.value.toLocaleString()}
                    </span>
                  </div>
                  {step.dropOff && (
                    <p className="text-xs text-red-400 ml-1 mt-0.5">▼ {step.dropOff}</p>
                  )}
                  {!step.dropOff && i === funnelSteps.length - 1 && (
                    <p className="text-xs text-green-400 ml-1 mt-0.5">Overall conv. rate: 1.95%</p>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: ROAS + Attribution & Email */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ROAS by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>ROAS by Channel</CardTitle>
            <CardDescription>Return on ad spend · Benchmark 3.0x</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roasChannels.map(ch => (
              <div key={ch.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{ch.name}</span>
                  <div className="flex items-center gap-2">
                    {ch.status && (
                      <Badge variant="destructive" className="text-xs">
                        {ch.status}
                      </Badge>
                    )}
                    <span
                      className={`font-bold ${ch.roas >= 3 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {ch.roas}x
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className={`${ch.color} h-2 rounded-full`}
                      style={{ width: `${ch.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-16 text-right">
                    {ch.spend} spend
                  </span>
                </div>
              </div>
            ))}

            {/* Wasted Spend */}
            <div className="mt-4 rounded-md border border-yellow-600/40 bg-yellow-950/20 p-3 space-y-1">
              <p className="text-sm font-semibold flex items-center gap-1">
                ⚠️ Wasted Ad Spend Alerts
              </p>
              {wastedSpend.map(w => (
                <div key={w.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{w.label}</span>
                  <span className="text-red-500 font-medium">{w.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attribution + Email Campaigns */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attribution Analysis</CardTitle>
                  <CardDescription>Channel contribution % to bookings</CardDescription>
                </div>
                <div className="flex gap-1">
                  {(['First Touch', 'Last Touch', 'Linear'] as AttributionMode[]).map(mode => (
                    <Button
                      key={mode}
                      variant={attributionMode === mode ? 'default' : 'ghost'}
                      size="sm"
                      className="text-xs h-7 px-2"
                      onClick={() => setAttributionMode(mode)}
                    >
                      {mode}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {attributionData.map(d => (
                <div key={d.channel} className="flex items-center gap-3">
                  <span className="text-sm w-24 text-right text-muted-foreground shrink-0">
                    {d.channel}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-4">
                    <div
                      className="h-4 rounded-full"
                      style={{
                        width: `${(d.value / maxAttr) * 100}%`,
                        backgroundColor: attributionColors[d.channel],
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8">{d.value}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Email Campaign Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emailCampaigns.map(c => (
                <div key={c.name} className="rounded-md border p-3 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className="text-sm font-bold text-green-500">{c.revenue}</span>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>
                      {c.sent.toLocaleString()} <span className="block">Sent</span>
                    </span>
                    <span>
                      {c.opens} <span className="block">Opens</span>
                    </span>
                    <span>
                      {c.clicks} <span className="block">Clicks</span>
                    </span>
                    <span>
                      {c.bookings} <span className="block">Bookings</span>
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
