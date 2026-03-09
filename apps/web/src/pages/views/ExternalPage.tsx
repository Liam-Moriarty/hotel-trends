import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Globe,
  Cloud,
  CalendarDays,
  PlaneLanding,
  Zap,
  TrendingUp,
  TrendingDown,
  MapPin,
} from 'lucide-react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

// --- Mock Data ---

const weatherDays = [
  { day: 'Thu', icon: '☀️', high: 22, low: 14 },
  { day: 'Fri', icon: '⛅', high: 24, low: 15 },
  { day: 'Sat', icon: '🌧️', high: 19, low: 12 },
  { day: 'Sun', icon: '🌧️', high: 17, low: 11 },
  { day: 'Mon', icon: '☀️', high: 21, low: 13 },
  { day: 'Tue', icon: '☀️', high: 25, low: 16 },
  { day: 'Wed', icon: '⛅', high: 23, low: 15 },
]

const occupancyData = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 74 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 85 },
]

const events = [
  {
    dateRange: '8–10',
    month: 'Mar',
    name: 'Tech Summit 2026',
    venue: 'City Convention Centre · 8,200 expected',
    tags: ['Conference'],
    impact: 'Very High',
    impactColor: 'destructive' as const,
  },
  {
    dateRange: '14–16',
    month: 'Mar',
    name: 'Spring Food Festival',
    venue: 'Waterfront Park · 25,000 expected',
    tags: ['Festival'],
    impact: 'High',
    impactColor: 'default' as const,
  },
  {
    dateRange: '22',
    month: 'Mar',
    name: 'International Marathon',
    venue: 'City Downtown · 12,000 expected',
    tags: ['Sports'],
    impact: 'Medium',
    impactColor: 'secondary' as const,
  },
  {
    dateRange: '25–30',
    month: 'Mar',
    name: 'Art & Culture Week',
    venue: 'Museum District · 18,000 expected',
    tags: ['Culture'],
    impact: 'High',
    impactColor: 'default' as const,
  },
  {
    dateRange: '3',
    month: 'Apr',
    name: 'Business Awards Gala',
    venue: 'Grand Ballroom · 1,200 expected',
    tags: ['Corporate'],
    impact: 'Low',
    impactColor: 'outline' as const,
  },
]

const flights = [
  {
    time: '06:30',
    origin: 'New York (JFK)',
    flight: 'AA 4821',
    pax: 180,
    status: 'On Time',
    statusColor: 'text-green-600',
  },
  {
    time: '08:15',
    origin: 'London (LHR)',
    flight: 'BA 0284',
    pax: 240,
    status: 'On Time',
    statusColor: 'text-green-600',
  },
  {
    time: '09:40',
    origin: 'Frankfurt (FRA)',
    flight: 'LH 0452',
    pax: 195,
    status: 'Delayed 45m',
    statusColor: 'text-yellow-600',
  },
  {
    time: '11:00',
    origin: 'Dubai (DXB)',
    flight: 'EK 0211',
    pax: 380,
    status: 'On Time',
    statusColor: 'text-green-600',
  },
  {
    time: '13:25',
    origin: 'Singapore (SIN)',
    flight: 'SQ 0316',
    pax: 290,
    status: 'On Time',
    statusColor: 'text-green-600',
  },
  {
    time: '15:50',
    origin: 'Paris (CDG)',
    flight: 'AF 1684',
    pax: 168,
    status: 'Cancelled',
    statusColor: 'text-red-600',
  },
]

const competitors = [
  {
    name: 'The Grand Palace',
    promo: 'Stay 3, Pay 2',
    period: 'Mar 8–15',
    impact: 'HIGH IMPACT',
    impactColor: 'destructive' as const,
  },
  {
    name: 'Azure Bay Resort',
    promo: 'Free Breakfast',
    period: 'Ongoing',
    impact: 'MEDIUM IMPACT',
    impactColor: 'default' as const,
  },
  {
    name: 'Skyline Hotel',
    promo: 'Corp Rate -20%',
    period: 'Mar 1–31',
    impact: 'HIGH IMPACT',
    impactColor: 'destructive' as const,
  },
  {
    name: 'Ocean View Suites',
    promo: 'Spa Package $99',
    period: 'Weekends',
    impact: 'LOW IMPACT',
    impactColor: 'outline' as const,
  },
]

const macroIndicators = [
  { label: 'Tourism GDP Contribution', value: '+3.2%', change: '+0.4%', up: true },
  { label: 'Consumer Confidence Index', value: '108.4', change: '+2.1', up: true },
  { label: 'Business Travel Spend', value: '$284B', change: '+8.1% YoY', up: true },
  { label: 'Forex Rate (USD/EUR)', value: '0.921', change: '-0.8%', up: false },
  { label: 'Inflation Rate', value: '2.8%', change: '-0.3pp', up: false },
  { label: 'Hotel ADR Index', value: '+5.6%', change: '+1.2pp', up: true },
]

const visaAlerts = [
  {
    country: 'India',
    tag: 'eVisa Expanded',
    tagColor: 'default' as const,
    desc: '30-day eVisa now available. Expected +12% Indian traveler volume.',
  },
  {
    country: 'China',
    tag: 'Group Travel Policy',
    tagColor: 'secondary' as const,
    desc: 'New group tour regulations effective Apr 1. MICE groups may be affected.',
  },
  {
    country: 'GCC Countries',
    tag: 'Visa on Arrival',
    tagColor: 'default' as const,
    desc: 'New visa-on-arrival for 6 Gulf nations. Luxury segment opportunity.',
  },
]

const publicHolidays = [
  { name: "International Women's Day", date: 'Mar 8' },
  { name: 'Spring Equinox', date: 'Mar 20' },
  { name: 'Good Friday', date: 'Apr 4' },
]

// --- Component ---

export default function ExternalPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">External Intelligence</h1>
          <p className="text-muted-foreground text-sm">
            Weather, events, flights, competitor activity & macro signals
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5">
          <Globe className="h-3.5 w-3.5" />
          Live External Feeds Active
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
        </Badge>
      </div>

      {/* Row 1: Weather + Citywide Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7-Day Weather Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Cloud className="h-4 w-4" />
              7-Day Weather Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-4xl font-bold">22°C</p>
                <p className="text-muted-foreground text-sm">Today · Sunny · City Center</p>
              </div>
              <Badge variant="outline">Good for Travel</Badge>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {weatherDays.map(d => (
                <div key={d.day} className="flex flex-col items-center gap-1">
                  <p className="text-xs text-muted-foreground">{d.day}</p>
                  <span className="text-xl">{d.icon}</span>
                  <p className="text-xs font-medium">{d.high}°</p>
                  <p className="text-xs text-muted-foreground">{d.low}°</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border p-3 space-y-1">
              <p className="text-sm font-medium flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                AI Weather Package Alert
              </p>
              <p className="text-xs text-muted-foreground">
                Rain forecast Sat–Sun. Recommend promoting indoor packages (Spa, Cinema, F&B).
                Expected +18% upsell conversion.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Citywide Occupancy Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Citywide Occupancy Trends</CardTitle>
            <p className="text-sm text-muted-foreground">Hotel performance vs city average</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={occupancyData}>
                <defs>
                  <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={v => `${v}%`} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  fill="url(#occGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xl font-bold text-blue-600">8.4%</p>
                <p className="text-xs text-muted-foreground">Market Share</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xl font-bold text-green-600">112.3</p>
                <p className="text-xs text-muted-foreground">RevPAR Index</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <p className="text-xl font-bold text-blue-600">+6.2pp</p>
                <p className="text-xs text-muted-foreground">OCC Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Events + Flights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Events Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4" />
              Local Events Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="text-center min-w-[40px]">
                  <p className="text-xs text-muted-foreground">{e.month}</p>
                  <p className="text-sm font-bold">{e.dateRange}</p>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.venue}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {e.tags.map(t => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                    <Badge variant={e.impactColor} className="text-xs">
                      {e.impact}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Flight Arrival Tracker */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <PlaneLanding className="h-4 w-4" />
                Flight Arrival Tracker
              </CardTitle>
              <span className="text-xs text-muted-foreground">Today · International</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {flights.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold">{f.time}</p>
                  <p className="text-sm">{f.origin}</p>
                  <p className="text-xs text-muted-foreground">
                    {f.flight} · {f.pax} pax
                  </p>
                </div>
                <span className={`text-xs font-semibold ${f.statusColor}`}>{f.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Competitor Promotions + Macro Indicators + Visa Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor Promotions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Competitor Promotions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {competitors.map((c, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{c.name}</p>
                  <Badge variant={c.impactColor} className="text-xs">
                    {c.impact}
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 font-medium">{c.promo}</p>
                <p className="text-xs text-muted-foreground">{c.period}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Macroeconomic Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Macroeconomic Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {macroIndicators.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between py-1">
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <div className="text-right">
                    <p className="text-sm font-bold">{m.value}</p>
                    <p
                      className={`text-xs flex items-center justify-end gap-0.5 ${m.up ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {m.up ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {m.change}
                    </p>
                  </div>
                </div>
                {i < macroIndicators.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Visa & Policy Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Visa & Policy Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visaAlerts.map((v, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <MapPin className="h-3.5 w-3.5 text-green-600" />
                  <p className="text-sm font-semibold">{v.country}</p>
                  <Badge variant={v.tagColor} className="text-xs">
                    {v.tag}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-semibold flex items-center gap-2">
                🌐 Public Holidays — Next 30 days
              </p>
              {publicHolidays.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{h.name}</p>
                  <p className="text-xs font-medium">{h.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
