import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend,
} from 'recharts'
import {
  occupancyData,
  labourData,
  anomalies,
  recommendations,
  clusterData,
  clusterColors,
  maintenanceAlerts,
  churnGuests,
} from '@/mocks'
import { Activity, Brain, AlertTriangle, ChevronRight, Cpu } from 'lucide-react'

// Donut ring SVG helper
function RingIndicator({ pct, color, size = 40 }: { pct: number; color: string; size?: number }) {
  const r = 16,
    cx = 20,
    cy = 20
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#334155" strokeWidth={4} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontWeight="bold"
        fill="white"
      >
        {pct}%
      </text>
    </svg>
  )
}

// Scatter grouped by cluster
function ClusterScatter() {
  const groups = ['Business Solo', 'Leisure Family', 'Luxury Couple', 'Conference Group']
  return (
    <ResponsiveContainer width="100%" height={220}>
      <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="x"
          name="Avg Stay"
          unit=" nights"
          tick={{ fontSize: 10 }}
          stroke="#64748b"
        />
        <YAxis dataKey="y" name="Spend/Night" tick={{ fontSize: 10 }} stroke="#64748b" />
        <ZAxis dataKey="z" range={[60, 120]} />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
          contentStyle={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 8,
            fontSize: 11,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        {groups.map(g => (
          <Scatter
            key={g}
            name={g}
            data={clusterData.filter(d => d.name === g)}
            fill={clusterColors[g]}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default function AiPage() {
  const [priceWeight, setPriceWeight] = useState(60)
  const [occPriority, setOccPriority] = useState(50)
  const [costTarget, setCostTarget] = useState(40)

  const optScore = Math.round((priceWeight + occPriority + costTarget) / 3)
  const balanced =
    Math.abs(priceWeight - occPriority) < 15 && Math.abs(occPriority - costTarget) < 15

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI &amp; Forecasting</h1>
          <p className="text-sm text-muted-foreground">
            Machine learning insights, predictive analytics &amp; optimization engine
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 text-sm">
          <Cpu className="h-3.5 w-3.5 text-green-500" />
          Vertex AI · Models Active
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </Badge>
      </div>

      {/* Row 1: Occupancy Forecast + Labour Demand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Occupancy Forecast</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">With 90% confidence interval</p>
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">MAPE: 3.2%</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={occupancyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis
                  domain={[60, 100]}
                  tickFormatter={v => `${v}%`}
                  tick={{ fontSize: 11 }}
                  stroke="#64748b"
                />
                <Tooltip
                  formatter={(v: number | undefined) => [`${v ?? ''}%`, 'Occupancy']}
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="occ"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Labor Demand Forecast</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Staff hours + overtime projection
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={labourData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#64748b" />
                <YAxis domain={[0, 180]} tick={{ fontSize: 11 }} stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="hours" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Anomaly Detection + AI Recommendation Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-red-400" />
                <CardTitle className="text-base">Anomaly Detection</CardTitle>
              </div>
              <Badge variant="destructive">
                {anomalies.filter(a => !a.resolved).length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {anomalies.map(a => (
              <div
                key={a.id}
                className={`flex items-start gap-3 rounded-lg p-3 ${a.bg} border border-border/40`}
              >
                <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${a.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{a.title}</span>
                    <span className={`text-sm font-semibold ${a.color}`}>{a.delta}</span>
                    {a.resolved && (
                      <Badge
                        variant="outline"
                        className="text-green-400 border-green-500/40 text-xs py-0"
                      >
                        ✓ Resolved
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <CardTitle className="text-base">AI Recommendation Engine</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map(r => (
              <div
                key={r.id}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3 hover:bg-accent/50 transition-colors cursor-pointer group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{r.title}</span>
                    <Badge className={`${r.priorityColor} text-white text-xs py-0`}>
                      {r.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-semibold ${r.impactColor}`}>{r.impact}</span>
                    <span className="text-xs text-muted-foreground">· {r.category}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        style={{ width: `${r.conf}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{r.conf}% conf.</span>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Optimization Engine + Guest Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Optimization Engine</CardTitle>
            <p className="text-xs text-muted-foreground">
              Balance price, occupancy &amp; cost targets
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Price Optimization Weight</span>
                <span className="font-semibold text-purple-400">{priceWeight}%</span>
              </div>
              <Slider
                value={priceWeight}
                onValueChange={setPriceWeight}
                min={0}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-purple-500"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Occupancy Priority</span>
                <span className="font-semibold text-green-400">{occPriority}%</span>
              </div>
              <Slider
                value={occPriority}
                onValueChange={setOccPriority}
                min={0}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-green-500"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>Cost Reduction Target</span>
                <span className="font-semibold text-yellow-400">{costTarget}%</span>
              </div>
              <Slider
                value={costTarget}
                onValueChange={setCostTarget}
                min={0}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-yellow-500"
              />
            </div>
            <div className="rounded-lg border border-border/60 p-4 mt-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Optimization Score
              </p>
              <p className="text-4xl font-bold text-purple-400 mt-1">{optScore}</p>
              <p className={`text-sm mt-1 ${balanced ? 'text-green-400' : 'text-yellow-400'}`}>
                {balanced ? 'Weights balanced' : 'Adjust weights for balance'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Guest Cluster Visualization</CardTitle>
            <p className="text-xs text-muted-foreground">
              ML-segmented guest personas — Length of stay vs spend per night
            </p>
          </CardHeader>
          <CardContent>
            <ClusterScatter />
          </CardContent>
        </Card>
      </div>

      {/* Row 4: Predictive Maintenance + Loyalty vs Churn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Predictive Maintenance Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenanceAlerts.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg border border-border/60 p-3"
              >
                <RingIndicator pct={m.pct} color={m.color} size={44} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.eta}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-sm text-yellow-400">{m.cost}</p>
                  <p className="text-xs text-muted-foreground">est. repair</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Loyalty vs Churn Prediction</CardTitle>
            <p className="text-xs text-muted-foreground">Guest retention model — next 30 days</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Likely to Return', value: '2,841', pct: '62%', color: 'text-green-400' },
                { label: 'At-Risk Guests', value: '784', pct: '17%', color: 'text-yellow-400' },
                { label: 'Likely Churned', value: '412', pct: '9%', color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="rounded-lg border border-border/60 p-3 text-center">
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className={`text-sm font-medium ${s.color}`}>{s.pct}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Top at-risk high-value guests:</p>
              <div className="space-y-2">
                {churnGuests.map((g, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg border border-border/60 p-2.5"
                  >
                    <div
                      className={`h-8 w-8 rounded-full ${g.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {g.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{g.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {g.stays} · {g.ltv}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-yellow-400 shrink-0">
                      {g.churn}% churn
                    </span>
                    <Button size="sm" variant="outline" className="text-xs h-7 px-2 shrink-0">
                      Outreach
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
