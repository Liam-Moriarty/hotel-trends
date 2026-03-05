import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Database,
  RefreshCw,
  XCircle,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

// --- Types ---
type IntegrationStatus = 'healthy' | 'warning' | 'error'

interface Integration {
  id: string
  name: string
  vendor: string
  status: IntegrationStatus
  lastSync: string
  records: string
  uptime: number
  latency: string | 'Timeout'
}

// --- Mock Data ---
const throughputData = [
  { time: '00:00', value: 1200 },
  { time: '02:00', value: 1100 },
  { time: '04:00', value: 1050 },
  { time: '06:00', value: 1400 },
  { time: '08:00', value: 2800 },
  { time: '10:00', value: 3900 },
  { time: '12:00', value: 4600 },
  { time: '14:00', value: 4900 },
  { time: '16:00', value: 5100 },
  { time: '18:00', value: 4800 },
  { time: '20:00', value: 4600 },
  { time: '22:00', value: 3200 },
  { time: '23:59', value: 1800 },
]

const coreSystems: Integration[] = [
  {
    id: 'pms',
    name: 'Property Management System (PMS)',
    vendor: 'Opera Cloud',
    status: 'healthy',
    lastSync: '2 min ago',
    records: '84,210 records',
    uptime: 99.8,
    latency: '42ms',
  },
  {
    id: 'crs',
    name: 'Central Reservation System (CRS)',
    vendor: 'SynXis',
    status: 'healthy',
    lastSync: '5 min ago',
    records: '12,450 records',
    uptime: 99.5,
    latency: '68ms',
  },
  {
    id: 'rms',
    name: 'Revenue Management System (RMS)',
    vendor: 'IDeaS G3',
    status: 'healthy',
    lastSync: '10 min ago',
    records: '2,840 records',
    uptime: 99.2,
    latency: '112ms',
  },
  {
    id: 'pos',
    name: 'Point of Sale (POS)',
    vendor: 'Agilysys',
    status: 'warning',
    lastSync: '28 min ago',
    records: '18,920 records',
    uptime: 97.1,
    latency: '340ms',
  },
]

const guestCrm: Integration[] = [
  {
    id: 'crm',
    name: 'CRM Platform',
    vendor: 'Salesforce Hospitality',
    status: 'healthy',
    lastSync: '3 min ago',
    records: '124,800 records',
    uptime: 99.9,
    latency: '55ms',
  },
  {
    id: 'loyalty',
    name: 'Loyalty Program',
    vendor: 'Amadeus Loyalty',
    status: 'healthy',
    lastSync: '8 min ago',
    records: '38,200 records',
    uptime: 98.8,
    latency: '88ms',
  },
  {
    id: 'guestcomm',
    name: 'Guest Communication',
    vendor: 'Revinate',
    status: 'healthy',
    lastSync: '1 min ago',
    records: '5,620 records',
    uptime: 99.6,
    latency: '31ms',
  },
]

const distribution: Integration[] = [
  {
    id: 'channel',
    name: 'Channel Manager',
    vendor: 'SiteMinder',
    status: 'healthy',
    lastSync: 'Real-time',
    records: '1,240 records',
    uptime: 99.4,
    latency: '28ms',
  },
  {
    id: 'ota',
    name: 'OTA Connectivity',
    vendor: 'RateTiger',
    status: 'error',
    lastSync: '2h ago',
    records: '0 records',
    uptime: 94.2,
    latency: 'Timeout',
  },
  {
    id: 'gds',
    name: 'GDS Integration',
    vendor: 'Amadeus GDS',
    status: 'healthy',
    lastSync: '15 min ago',
    records: '880 records',
    uptime: 98.9,
    latency: '145ms',
  },
]

const fbEvents: Integration[] = [
  {
    id: 'mice',
    name: 'MICE / Events Management',
    vendor: 'Delphi by Amadeus',
    status: 'healthy',
    lastSync: '12 min ago',
    records: '284 records',
    uptime: 99.0,
    latency: '92ms',
  },
  {
    id: 'fbpos',
    name: 'Food & Beverage POS',
    vendor: 'Infrasys',
    status: 'warning',
    lastSync: '45 min ago',
    records: '9,450 records',
    uptime: 96.8,
    latency: '280ms',
  },
]

const smartBuilding: Integration[] = [
  {
    id: 'camera',
    name: 'IP Camera System',
    vendor: 'Hikvision AI Cam',
    status: 'healthy',
    lastSync: 'Real-time',
    records: 'Live records',
    uptime: 98.5,
    latency: '18ms',
  },
  {
    id: 'energy',
    name: 'Energy Management',
    vendor: 'Schneider Electric EcoStruxure',
    status: 'healthy',
    lastSync: '1 min ago',
    records: '48,200 records',
    uptime: 99.7,
    latency: '24ms',
  },
  {
    id: 'cmms',
    name: 'Maintenance (CMMS)',
    vendor: 'Planon',
    status: 'healthy',
    lastSync: '5 min ago',
    records: '1,840 records',
    uptime: 99.1,
    latency: '67ms',
  },
]

// --- Helper Components ---
const StatusIcon = ({ status }: { status: IntegrationStatus }) => {
  if (status === 'healthy') return <CheckCircle2 className="h-4 w-4 text-green-500" />
  if (status === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  return <XCircle className="h-4 w-4 text-red-500" />
}

const UptimeBar = ({ uptime, status }: { uptime: number; status: IntegrationStatus }) => {
  const color =
    status === 'healthy' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${uptime}%` }} />
      </div>
      <span className="text-sm text-muted-foreground">{uptime}%</span>
    </div>
  )
}

const LatencyBadge = ({ latency, status }: { latency: string; status: IntegrationStatus }) => {
  if (latency === 'Timeout')
    return <span className="text-sm font-semibold text-red-500">Timeout</span>
  const color =
    status === 'healthy'
      ? 'text-green-500'
      : status === 'warning'
        ? 'text-yellow-500'
        : 'text-red-500'
  return <span className={`text-sm font-semibold ${color}`}>{latency}</span>
}

const ActionButton = ({ status }: { status: IntegrationStatus }) => {
  if (status === 'warning')
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
      >
        Investigate
      </Button>
    )
  if (status === 'error')
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-red-500 border-red-500 hover:bg-red-500/10"
      >
        Diagnose
      </Button>
    )
  return null
}

const IntegrationRow = ({ item }: { item: Integration }) => (
  <div className="flex items-center justify-between py-3 border-b last:border-0">
    <div className="flex items-center gap-3 min-w-0">
      <StatusIcon status={item.status} />
      <div>
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.vendor}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 shrink-0">
      <div className="text-right hidden md:block">
        <p
          className={`text-sm font-medium ${item.status === 'error' ? 'text-red-500' : item.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}
        >
          {item.lastSync}
        </p>
        <p className="text-xs text-muted-foreground">{item.records}</p>
      </div>
      <div className="hidden lg:flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Uptime</span>
        <UptimeBar uptime={item.uptime} status={item.status} />
      </div>
      <div className="text-right hidden sm:block">
        <span className="text-xs text-muted-foreground block">Latency</span>
        <LatencyBadge latency={item.latency} status={item.status} />
      </div>
      <div className="flex items-center gap-2">
        <ActionButton status={item.status} />
        <Button size="icon" variant="outline" className="h-8 w-8">
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  </div>
)

const IntegrationGroup = ({ title, items }: { title: string; items: Integration[] }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent className="pt-0">
      {items.map(item => (
        <IntegrationRow key={item.id} item={item} />
      ))}
    </CardContent>
  </Card>
)

// --- Main Page ---
export default function DataPage() {
  const healthyCount = [
    ...coreSystems,
    ...guestCrm,
    ...distribution,
    ...fbEvents,
    ...smartBuilding,
  ].filter(i => i.status === 'healthy').length
  const warningCount = [
    ...coreSystems,
    ...guestCrm,
    ...distribution,
    ...fbEvents,
    ...smartBuilding,
  ].filter(i => i.status === 'warning').length
  const errorCount = [
    ...coreSystems,
    ...guestCrm,
    ...distribution,
    ...fbEvents,
    ...smartBuilding,
  ].filter(i => i.status === 'error').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data & Integrations</h1>
          <p className="text-muted-foreground text-sm">
            Cloud data lake, API health monitoring & pipeline status
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync All
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Cloud Data Lake</span>
            </div>
            <p className="text-3xl font-bold">2.4 TB</p>
            <p className="text-sm text-muted-foreground mb-3">Total data ingested</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Records Today</span>
                <span className="font-medium">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">API Calls/hr</span>
                <span className="font-medium">48.4K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Freshness</span>
                <span className="font-medium">&lt; 5 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
            <p className="text-5xl font-bold text-green-500">{healthyCount}</p>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm">Healthy</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
            <p className="text-5xl font-bold text-yellow-500">{warningCount}</p>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Warnings</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
            <p className="text-5xl font-bold text-red-500">{errorCount}</p>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Errors</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Throughput Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Pipeline Throughput</CardTitle>
              <p className="text-sm text-muted-foreground">
                Records/hour processed across all integrations — Today
              </p>
            </div>
            <Badge variant="outline" className="text-green-500 border-green-500">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Pipeline Healthy
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={throughputData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis
                tickFormatter={v => `${v / 1000}k`}
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                formatter={(v: number) => [`${v.toLocaleString()} records/hr`, 'Throughput']}
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#throughputGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Integration Groups */}
      <IntegrationGroup title="Core Systems" items={coreSystems} />
      <IntegrationGroup title="Guest & CRM" items={guestCrm} />
      <IntegrationGroup title="Distribution" items={distribution} />
      <IntegrationGroup title="F&B & Events" items={fbEvents} />
      <IntegrationGroup title="Smart Building" items={smartBuilding} />

      {/* Data Architecture Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Data Architecture Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Central data lake ingestion flow</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            {/* Source Systems */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-center text-blue-500">Source Systems</p>
              {['PMS', 'CRS', 'POS', 'MICE'].map(s => (
                <div
                  key={s}
                  className="bg-muted rounded px-3 py-1.5 text-sm text-center text-muted-foreground"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Arrow + Cloud Data Lake */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-center text-cyan-500">Cloud Data Lake</p>
              {['Raw Zone', 'Transform', 'Curated'].map(s => (
                <div
                  key={s}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1.5 text-sm text-center text-cyan-500"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* AI & Analytics */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-center text-emerald-500">AI & Analytics</p>
              {['Forecasting', 'ML Models', 'Dashboards'].map(s => (
                <div
                  key={s}
                  className="bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-1.5 text-sm text-center text-emerald-500"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Distribution */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-center text-yellow-500">Distribution</p>
              {['Reports', 'Alerts', 'APIs'].map(s => (
                <div
                  key={s}
                  className="bg-yellow-500/10 border border-yellow-500/30 rounded px-3 py-1.5 text-sm text-center text-yellow-500"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
