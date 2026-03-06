/* eslint-disable @typescript-eslint/no-unused-vars */
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  CheckSquare,
  Clock,
  Zap,
  Wrench,
  Package,
  AlertTriangle,
  Lightbulb,
  ChefHat,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

// ─── Types ───────────────────────────────────────────────────────────────────

type RosterStatus = 'ok' | 'understaffed' | 'overtime'

interface RosterDept {
  name: string
  shift: string
  staffed: number
  required: number
  status: RosterStatus
  overtime?: string
}

interface RoomTask {
  room: string
  status: 'Clean' | 'In Progress' | 'Inspecting' | 'Dirty' | 'Blocked'
}

interface InventoryItem {
  name: string
  units: number
  max: number
  status: 'OK' | 'LOW' | 'CRITICAL'
}

interface Supplier {
  name: string
  current: string
  save: string
  tip: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const rosterData: RosterDept[] = [
  { name: 'Front Desk', shift: '6am–2pm', staffed: 4, required: 4, status: 'ok' },
  {
    name: 'Housekeeping',
    shift: '7am–3pm',
    staffed: 14,
    required: 18,
    status: 'understaffed',
    overtime: '+2h OT',
  },
  {
    name: 'F&B Restaurant',
    shift: '6am–2pm',
    staffed: 8,
    required: 8,
    status: 'ok',
    overtime: '+1h OT',
  },
  { name: 'F&B Bar', shift: '2pm–10pm', staffed: 5, required: 6, status: 'understaffed' },
  { name: 'Spa & Wellness', shift: '9am–7pm', staffed: 6, required: 6, status: 'ok' },
  { name: 'Maintenance', shift: '8am–4pm', staffed: 3, required: 3, status: 'ok' },
  {
    name: 'Concierge',
    shift: '7am–11pm',
    staffed: 3,
    required: 4,
    status: 'understaffed',
    overtime: '+1h OT',
  },
]

const roomTasks: RoomTask[] = [
  { room: '101', status: 'Clean' },
  { room: '102', status: 'In Progress' },
  { room: '103', status: 'Dirty' },
  { room: '201', status: 'Clean' },
  { room: '202', status: 'Inspecting' },
  { room: '203', status: 'Dirty' },
  { room: '301', status: 'Clean' },
  { room: '302', status: 'In Progress' },
  { room: '401', status: 'Blocked' },
  { room: '402', status: 'Dirty' },
  { room: '501', status: 'Clean' },
  { room: '502', status: 'In Progress' },
]

const energyData = [
  { time: '00:00', actual: 28, target: 27 },
  { time: '04:00', actual: 22, target: 23 },
  { time: '08:00', actual: 55, target: 50 },
  { time: '12:00', actual: 88, target: 82 },
  { time: '16:00', actual: 95, target: 88 },
  { time: '20:00', actual: 78, target: 72 },
  { time: '23:00', actual: 60, target: 56 },
]

const foodWasteData = [
  { day: 'Mon', kg: 11 },
  { day: 'Tue', kg: 9 },
  { day: 'Wed', kg: 14 },
  { day: 'Thu', kg: 7 },
  { day: 'Fri', kg: 10 },
  { day: 'Sat', kg: 16 },
  { day: 'Sun', kg: 13 },
]

const inventoryItems: InventoryItem[] = [
  { name: 'Bed Linens (sets)', units: 280, max: 320, status: 'OK' },
  { name: 'Towel Sets', units: 180, max: 320, status: 'LOW' },
  { name: 'Minibar Beverages', units: 95, max: 320, status: 'CRITICAL' },
  { name: 'Toiletry Kits', units: 340, max: 400, status: 'OK' },
  { name: 'Cleaning Supplies', units: 120, max: 160, status: 'OK' },
  { name: 'F&B Breakfast Items', units: 55, max: 320, status: 'CRITICAL' },
]

const suppliers: Supplier[] = [
  {
    name: 'LinenCo International',
    current: '$84K/yr',
    save: 'Save $12K',
    tip: 'Renegotiate - 3yr volume deal',
  },
  {
    name: 'FoodPro Distributors',
    current: '$124K/yr',
    save: 'Save $18K',
    tip: 'Switch to regional supplier',
  },
  { name: 'CleanStar Products', current: '$36K/yr', save: 'Save $6K', tip: 'Consolidate SKUs' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoomStatusDot({ status }: { status: RoomTask['status'] }) {
  const colors: Record<RoomTask['status'], string> = {
    Clean: 'bg-green-500',
    'In Progress': 'bg-blue-500',
    Inspecting: 'bg-cyan-400',
    Dirty: 'bg-yellow-500',
    Blocked: 'bg-red-500',
  }
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]}`} />
}

function RoomStatusText({ status }: { status: RoomTask['status'] }) {
  const colors: Record<RoomTask['status'], string> = {
    Clean: 'text-green-500',
    'In Progress': 'text-blue-400',
    Inspecting: 'text-cyan-400',
    Dirty: 'text-yellow-500',
    Blocked: 'text-red-500',
  }
  return <span className={`text-xs font-medium ${colors[status]}`}>{status}</span>
}

function InventoryBar({ status, pct }: { status: InventoryItem['status']; pct: number }) {
  const color = status === 'OK' ? 'bg-green-500' : status === 'LOW' ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function WasteFillColor(kg: number) {
  return kg >= 12 ? '#ef4444' : '#f59e0b'
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OperationsPage() {
  const understaffedCount = rosterData.filter(d => d.status === 'understaffed').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Operations</h1>
          <p className="text-muted-foreground text-sm">
            Labor, housekeeping, energy, procurement &amp; maintenance
          </p>
        </div>
        <Badge variant="destructive" className="flex items-center gap-1.5 text-sm px-3 py-1.5">
          <AlertTriangle className="w-4 h-4" />
          {understaffedCount} Understaffed Depts
        </Badge>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">Rooms Ready</p>
              <CheckSquare className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold mt-2">184/220</p>
            <Progress value={(184 / 220) * 100} className="mt-3 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">Staff On Shift</p>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold mt-2">43/47</p>
            <Progress value={(43 / 47) * 100} className="mt-3 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">Energy vs Budget</p>
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold mt-2">+8%</p>
            <Progress value={58} className="mt-3 h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <p className="text-sm text-muted-foreground">Maintenance Open</p>
              <Wrench className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold mt-2">4 Tasks</p>
            <Progress value={40} className="mt-3 h-1.5 [&>div]:bg-red-500" />
          </CardContent>
        </Card>
      </div>

      {/* Labor Roster + Housekeeping Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Labor Roster Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {rosterData.map(dept => (
              <div
                key={dept.name}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{dept.name}</span>
                    {dept.status === 'understaffed' && (
                      <Badge
                        variant="outline"
                        className="text-yellow-500 border-yellow-500 text-xs px-1.5 py-0"
                      >
                        UNDERSTAFFED
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{dept.shift}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold text-sm ${dept.staffed < dept.required ? 'text-yellow-500' : 'text-green-500'}`}
                  >
                    {dept.staffed}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {dept.required}</span>
                  {dept.overtime && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0">
                      {dept.overtime}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Housekeeping Task Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
              {(
                ['Clean', 'In Progress', 'Inspecting', 'Dirty', 'Blocked'] as RoomTask['status'][]
              ).map(s => (
                <span key={s} className="flex items-center gap-1">
                  <RoomStatusDot status={s} /> {s}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {roomTasks.map(t => (
                <div key={t.room} className="rounded-md border p-2 text-center">
                  <p
                    className={`text-sm font-bold ${
                      t.status === 'Clean'
                        ? 'text-green-500'
                        : t.status === 'In Progress'
                          ? 'text-blue-400'
                          : t.status === 'Inspecting'
                            ? 'text-cyan-400'
                            : t.status === 'Dirty'
                              ? 'text-yellow-500'
                              : 'text-red-500'
                    }`}
                  >
                    {t.room}
                  </p>
                  <RoomStatusText status={t.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy + Food Waste */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Energy Usage vs Optimal</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  kWh by hour — AI-optimized target
                </p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-yellow-500 border-yellow-500"
              >
                <Zap className="w-3 h-3" /> +8% over budget
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={energyData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `${v}kWh`} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number | undefined, n: string | undefined) => [
                    `${v} kWh`,
                    n === 'actual' ? 'Actual' : 'Target',
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#22c55e"
                  fill="url(#energyGrad)"
                  strokeWidth={2}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#facc15"
                  fill="none"
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Food Waste Analytics</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">kg per day vs target (8kg)</p>
              </div>
              <Badge
                variant="outline"
                className="flex items-center gap-1 text-red-500 border-red-500"
              >
                <ChefHat className="w-3 h-3" /> Avg +44% over target
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={foodWasteData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `${v}kg`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number | undefined) => [`${v} kg`, 'Waste']} />
                <ReferenceLine
                  y={8}
                  stroke="#22c55e"
                  strokeDasharray="4 3"
                  label={{ value: 'Target', fill: '#22c55e', fontSize: 11 }}
                />
                {foodWasteData.map((_, i) => null)}
                <Bar dataKey="kg" radius={[4, 4, 0, 0]}>
                  {foodWasteData.map((entry, i) => (
                    <rect key={i} fill={WasteFillColor(entry.kg)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Procurement + Supplier Renegotiation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Procurement &amp; Inventory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {inventoryItems.map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-md border p-3 gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <InventoryBar status={item.status} pct={(item.units / item.max) * 100} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {item.units} units
                    </span>
                  </div>
                </div>
                <Badge
                  variant={
                    item.status === 'OK'
                      ? 'outline'
                      : item.status === 'LOW'
                        ? 'outline'
                        : 'destructive'
                  }
                  className={`text-xs whitespace-nowrap ${
                    item.status === 'OK'
                      ? 'text-green-500 border-green-500'
                      : item.status === 'LOW'
                        ? 'text-yellow-500 border-yellow-500'
                        : ''
                  }`}
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Renegotiation Insights</CardTitle>
            <p className="text-xs text-muted-foreground">
              AI-identified cost reduction opportunities
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {suppliers.map(s => (
              <div key={s.name} className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{s.name}</p>
                  <span className="text-green-500 font-semibold text-sm">{s.save}</span>
                </div>
                <p className="text-xs text-muted-foreground">Current: {s.current}</p>
                <div className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span className="text-xs text-green-400">{s.tip}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
