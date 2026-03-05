import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

interface KpiCardData {
  label: string
  value: string
  change: string
  positive: boolean
  neutral?: boolean
}

interface RoomRate {
  type: string
  current: number
  compAvg: number
  aiRec: number
  delta: number
  occupancy: number
  applied: boolean
}

interface HeatmapCell {
  value: number | null
}

type HeatmapRow = HeatmapCell[]

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpis: KpiCardData[] = [
  { label: 'Avg ADR', value: '$218', change: '+5.6%', positive: true },
  { label: 'RevPAR', value: '$183', change: '+3.2%', positive: true },
  { label: 'Direct Booking %', value: '40%', change: '+7pp', positive: true },
  {
    label: 'OTA Commission Cost',
    value: '$24.8K',
    change: '-$3.1K',
    positive: false,
    neutral: true,
  },
]

const initialRooms: RoomRate[] = [
  {
    type: 'Standard Twin',
    current: 189,
    compAvg: 175,
    aiRec: 199,
    delta: 10,
    occupancy: 91,
    applied: false,
  },
  {
    type: 'Deluxe King',
    current: 245,
    compAvg: 260,
    aiRec: 268,
    delta: 23,
    occupancy: 78,
    applied: false,
  },
  {
    type: 'Junior Suite',
    current: 380,
    compAvg: 395,
    aiRec: 405,
    delta: 25,
    occupancy: 65,
    applied: false,
  },
  {
    type: 'Executive Suite',
    current: 520,
    compAvg: 540,
    aiRec: 558,
    delta: 38,
    occupancy: 52,
    applied: false,
  },
  {
    type: 'Presidential Suite',
    current: 1200,
    compAvg: 1150,
    aiRec: 1250,
    delta: 50,
    occupancy: 38,
    applied: false,
  },
]

// Heatmap: 5 weeks × 7 days (Mon–Sun), null = no data
const heatmapRows: HeatmapRow[] = [
  [79, 74, 75, 94, 73, 88, null].map(v => ({ value: v })),
  [53, 79, 44, 62, 43, 43, 56].map(v => ({ value: v })),
  [54, 47, 87, 83, 49, 52, 60].map(v => ({ value: v })),
  [42, 67, 64, 73, 51, 79, 61].map(v => ({ value: v })),
  [null, null, null, null, null, null, null].map(v => ({ value: v })),
]

const rateTrendData = [
  { date: 'Mar 2', Standard: 189, Deluxe: 245, Suite: 380 },
  { date: 'Mar 5', Standard: 192, Deluxe: 248, Suite: 385 },
  { date: 'Mar 9', Standard: 195, Deluxe: 255, Suite: 395 },
  { date: 'Mar 12', Standard: 191, Deluxe: 250, Suite: 390 },
  { date: 'Mar 16', Standard: 199, Deluxe: 268, Suite: 405 },
  { date: 'Mar 19', Standard: 199, Deluxe: 268, Suite: 405 },
  { date: 'Mar 23', Standard: 199, Deluxe: 268, Suite: 410 },
  { date: 'Mar 26', Standard: 199, Deluxe: 268, Suite: 415 },
  { date: 'Mar 30', Standard: 199, Deluxe: 268, Suite: 420 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function occupancyColor(occ: number): string {
  if (occ >= 85) return 'bg-green-500'
  if (occ >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

function heatmapBg(val: number | null): string {
  if (val === null) return 'bg-transparent text-transparent'
  if (val >= 85) return 'bg-indigo-600 text-white'
  if (val >= 70) return 'bg-indigo-500 text-white'
  if (val >= 55) return 'bg-indigo-400 text-white'
  return 'bg-slate-700 text-slate-400'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, change, positive, neutral }: KpiCardData) {
  const changeColor = neutral ? 'text-yellow-400' : positive ? 'text-blue-400' : 'text-green-400'
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${changeColor}`}>↗ {change}</p>
      </CardContent>
    </Card>
  )
}

function OccupancyBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full ${occupancyColor(pct)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground">{pct}%</span>
    </div>
  )
}

function OccupancyHeatmap() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base">Occupancy Heatmap</CardTitle>
        <CardDescription>March 2026 – by week &amp; day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {days.map((d, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium">
              {d}
            </div>
          ))}
        </div>
        {heatmapRows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-7 gap-1 mb-1">
            {row.map((cell, ci) => (
              <div
                key={ci}
                className={`rounded text-center text-xs py-1.5 font-medium ${heatmapBg(cell.value)}`}
              >
                {cell.value ?? ''}
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>Low</span>
          <div className="flex gap-1">
            <div className="w-5 h-3 rounded bg-slate-700" />
            <div className="w-5 h-3 rounded bg-indigo-400" />
            <div className="w-5 h-3 rounded bg-indigo-600" />
          </div>
          <span>High</span>
        </div>
      </CardContent>
    </Card>
  )
}

function RateTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Rate Trend by Room Type</CardTitle>
        <CardDescription>4-week forward pricing schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={rateTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={v => `$${v}`}
            />
            <Tooltip formatter={(v: number | undefined) => (v != null ? `${v}` : '')} />
            <Legend />
            <Line type="monotone" dataKey="Standard" stroke="#6366f1" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="Deluxe" stroke="#06b6d4" dot={false} strokeWidth={2} />
            <Line type="monotone" dataKey="Suite" stroke="#eab308" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [rooms, setRooms] = useState<RoomRate[]>(initialRooms)

  const applyRate = (idx: number) => {
    setRooms(prev => prev.map((r, i) => (i === idx ? { ...r, applied: true } : r)))
  }

  const applyAll = () => setRooms(prev => prev.map(r => ({ ...r, applied: true })))

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue &amp; Pricing</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Dynamic pricing engine, demand forecasting &amp; channel optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filter
          </Button>
          <Button size="sm" onClick={applyAll}>
            ⚡ Apply AI Rates
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(k => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dynamic-pricing">
        <TabsList>
          <TabsTrigger value="dynamic-pricing">Dynamic Pricing</TabsTrigger>
          <TabsTrigger value="demand-forecast">Demand Forecast</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="rate-shopping">Rate Shopping</TabsTrigger>
        </TabsList>

        <TabsContent value="dynamic-pricing" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Room Rate Table */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Room Rate Optimization</CardTitle>
                  <CardDescription>AI vs competitor vs current rate comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground text-xs uppercase tracking-wide border-b border-border">
                        <th className="text-left pb-3 font-medium">Room Type</th>
                        <th className="text-left pb-3 font-medium">Current Rate</th>
                        <th className="text-left pb-3 font-medium">Comp Set Avg</th>
                        <th className="text-left pb-3 font-medium">AI Recommended</th>
                        <th className="text-left pb-3 font-medium">Occupancy</th>
                        <th className="text-left pb-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room, i) => (
                        <tr key={room.type} className="border-b border-border last:border-0">
                          <td className="py-3 font-medium">{room.type}</td>
                          <td className="py-3 font-bold">${room.current}</td>
                          <td className="py-3 text-muted-foreground">${room.compAvg}</td>
                          <td className="py-3">
                            <span className="text-green-400 font-semibold">${room.aiRec}</span>
                            <Badge
                              variant="secondary"
                              className="ml-2 text-green-400 bg-green-400/10 text-xs"
                            >
                              +{room.delta}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <OccupancyBar pct={room.occupancy} />
                          </td>
                          <td className="py-3">
                            <Button
                              size="sm"
                              variant={room.applied ? 'secondary' : 'default'}
                              disabled={room.applied}
                              onClick={() => applyRate(i)}
                            >
                              {room.applied ? 'Applied' : 'Apply'}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Heatmap */}
            <OccupancyHeatmap />
          </div>

          {/* Rate Trend */}
          <div className="mt-4">
            <RateTrendChart />
          </div>
        </TabsContent>

        <TabsContent value="demand-forecast">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Demand Forecast — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="channels">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Channels — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rate-shopping">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Rate Shopping — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
