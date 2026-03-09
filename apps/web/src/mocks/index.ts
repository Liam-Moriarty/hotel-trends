import type {
  Anomaly,
  AdsPerformanceDataPoint,
  AttributionDataPoint,
  AuthUser,
  CapexItem,
  ChurnGuest,
  ClusterPoint,
  CompetitorPromo,
  Department,
  EmailCampaign,
  FlightArrival,
  FunnelStep,
  GuestPlatform,
  GuestReview,
  HeatmapRow,
  Insight,
  Integration,
  KpiItem,
  LabourDataPoint,
  LocalEvent,
  MacroIndicator,
  MaintenanceAlert,
  MarketingKpi,
  OccupancyData,
  OccupancyDataPoint,
  PublicHoliday,
  Recommendation,
  RevenueDataPoint,
  RevparDataPoint,
  RoasChannel,
  RoomRate,
  SentimentBreakdown,
  SentimentDataPoint,
  ThroughputDataPoint,
  TouchpointScore,
  VisaAlert,
  WastedSpendItem,
  WeatherDay,
} from '@/interface'
import { DollarSign, TrendingUp, Target, BookOpen } from 'lucide-react'

// ── Auth Page Data ───────────────────────────────────────────────────────────

export const MOCK_USERS: AuthUser[] = [
  {
    email: 'james.wilson@grandazure.com',
    name: 'James Wilson',
    role: 'Revenue Manager',
    initials: 'JW',
  },
  {
    email: 'sarah.chen@grandazure.com',
    name: 'Sarah Chen',
    role: 'General Manager',
    initials: 'SC',
  },
  {
    email: 'mike.tran@grandazure.com',
    name: 'Mike Tran',
    role: 'Operations Manager',
    initials: 'MT',
  },
]

// ── Dashboard Page Data ───────────────────────────────────────────────────────────

export const revenueData: RevenueDataPoint[] = [
  { day: 'Mon', actual: 41000, forecast: 44000 },
  { day: 'Tue', actual: 44500, forecast: 46000 },
  { day: 'Wed', actual: 47000, forecast: 48000 },
  { day: 'Thu', actual: 52000, forecast: 53000 },
  { day: 'Fri', actual: 61000, forecast: 62000 },
  { day: 'Sat', actual: 67000, forecast: 65000 },
  { day: 'Sun', actual: 59000, forecast: 60000 },
]

export const revparData: RevparDataPoint[] = [
  { month: 'Jan', actual: 188, forecast: null },
  { month: 'Feb', actual: 197, forecast: null },
  { month: 'Mar', actual: 204, forecast: null },
  { month: 'Apr', actual: 207, forecast: null },
  { month: 'May', actual: null, forecast: 210 },
  { month: 'Jun', actual: null, forecast: 215 },
  { month: 'Jul', actual: null, forecast: 219 },
  { month: 'Aug', actual: null, forecast: 222 },
]

export const kpis: KpiItem[] = [
  { label: 'Total Revenue', value: '$482K', sub: '+8.4% vs last month', variant: 'up' },
  {
    label: 'Gross Operating Profit',
    value: '$142K',
    sub: '+12.1% · GOP margin 29.5%',
    variant: 'up',
  },
  { label: 'ADR', value: '$218', sub: '+5.6% Avg Daily Rate', variant: 'up' },
  { label: 'Occupancy', value: '84.2%', sub: '−2.1% vs 86.3% prior month', variant: 'down' },
  { label: 'RevPAR', value: '$183', sub: '+3.2% Revenue per avail. room', variant: 'up' },
]

export const depts: Department[] = [
  { name: 'Rooms', score: 87 },
  { name: 'F&B', score: 74 },
  { name: 'Spa', score: 91 },
  { name: 'Events', score: 68 },
  { name: 'Ops', score: 82 },
]

export const insights: Insight[] = [
  {
    badge: 'Urgent',
    variant: 'destructive',
    title: 'Rate Gap Alert',
    body: 'Comp set raised rates by 14% for this weekend. Recommend +$22 ADR adjustment for deluxe rooms.',
    cta: 'Apply Pricing →',
  },
  {
    badge: 'Warning',
    variant: 'warning',
    title: 'Demand Surge Detected',
    body: 'Local tech conference Mar 10–12 driving +340% search volume. 68 rooms still available.',
    cta: 'Create Package →',
  },
  {
    badge: 'Info',
    variant: 'secondary',
    title: 'Upsell Opportunity',
    body: '42 check-ins tomorrow eligible for room upgrades. Predicted 31% acceptance rate.',
    cta: 'Send Offers →',
  },
  {
    badge: 'Success',
    variant: 'success',
    title: 'Energy Savings',
    body: 'AI-adjusted HVAC schedule saved $1,240 this week. Occupancy-aware mode performing +18%.',
    cta: 'View Details →',
  },
]

export const capex: CapexItem[] = [
  { name: 'HVAC Upgrade', roi: '340% ROI', score: 94, amount: '$120k', bar: 94 },
  { name: 'PMS Migration', roi: '280% ROI', score: 88, amount: '$85k', bar: 88 },
  { name: 'Spa Renovation', roi: '190% ROI', score: 71, amount: '$220k', bar: 71 },
  { name: 'Kitchen Equip', roi: '150% ROI', score: 65, amount: '$95k', bar: 65 },
  { name: 'EV Charging', roi: '110% ROI', score: 58, amount: '$45k', bar: 58 },
]

// ── Revenue Page Data ───────────────────────────────────────────────────────────

export const kpiCardData: KpiItem[] = [
  { label: 'Avg ADR', value: '$218', sub: '+5.6%', variant: 'info' },
  { label: 'RevPAR', value: '$183', sub: '+3.2%', variant: 'info' },
  { label: 'Direct Booking %', value: '40%', sub: '+7pp', variant: 'info' },
  { label: 'OTA Commission Cost', value: '$24.8K', sub: '-$3.1K', variant: 'neutral' },
]

export const initialRooms: RoomRate[] = [
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

export const heatmapRows: HeatmapRow[] = [
  [79, 74, 75, 94, 73, 88, null].map(v => ({ value: v })),
  [53, 79, 44, 62, 43, 43, 56].map(v => ({ value: v })),
  [54, 47, 87, 83, 49, 52, 60].map(v => ({ value: v })),
  [42, 67, 64, 73, 51, 79, 61].map(v => ({ value: v })),
  [null, null, null, null, null, null, null].map(v => ({ value: v })),
]

export const rateTrendData = [
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

// ── AI Page Data ───────────────────────────────────────────────────────────

export const occupancyData: OccupancyDataPoint[] = [
  { date: 'Mar 1', occ: 72 },
  { date: 'Mar 3', occ: 75 },
  { date: 'Mar 5', occ: 74 },
  { date: 'Mar 7', occ: 88 },
  { date: 'Mar 9', occ: 92 },
  { date: 'Mar 11', occ: 96 },
  { date: 'Mar 13', occ: 94 },
  { date: 'Mar 15', occ: 89 },
]

export const labourData: LabourDataPoint[] = [
  { week: 'W1', hours: 142 },
  { week: 'W2', hours: 158 },
  { week: 'W3', hours: 151 },
  { week: 'W4', hours: 163 },
  { week: 'W5', hours: 0 },
  { week: 'W6', hours: 0 },
]

export const anomalies: Anomaly[] = [
  {
    id: 1,
    title: 'Revenue Spike',
    delta: '+34%',
    desc: 'Unusual direct booking volume — local concert driving demand',
    time: 'Mar 4, 14:22',
    color: 'text-blue-400',
    bg: 'bg-blue-900/30',
    icon: 'triangle',
    resolved: false,
  },
  {
    id: 2,
    title: 'Labor Overtime',
    delta: '+22hrs',
    desc: 'F&B team projected 22 overtime hours this week vs normal 8',
    time: 'Mar 4, 09:15',
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/20',
    icon: 'warning',
    resolved: false,
  },
  {
    id: 3,
    title: 'Review Velocity',
    delta: '3 neg',
    desc: '3 negative TripAdvisor reviews in 4 hours — possible incident',
    time: 'Mar 3, 23:41',
    color: 'text-red-400',
    bg: 'bg-red-900/20',
    icon: 'triangle',
    resolved: true,
  },
  {
    id: 4,
    title: 'Energy Anomaly',
    delta: '+18%',
    desc: 'HVAC energy spike floor 4 — possible thermostat malfunction',
    time: 'Mar 3, 18:00',
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/20',
    icon: 'warning',
    resolved: false,
  },
]

export const recommendations: Recommendation[] = [
  {
    id: 1,
    title: 'Adjust Deluxe King Rate',
    priority: 'HIGH',
    priorityColor: 'bg-red-500',
    impact: '+$8,400 revenue',
    impactColor: 'text-green-400',
    category: 'Pricing',
    conf: 94,
  },
  {
    id: 2,
    title: 'Redeploy 4 Staff to F&B',
    priority: 'HIGH',
    priorityColor: 'bg-red-500',
    impact: '-$2,100 overtime cost',
    impactColor: 'text-green-400',
    category: 'Operations',
    conf: 87,
  },
  {
    id: 3,
    title: 'Launch Weekend Spa Package',
    priority: 'MEDIUM',
    priorityColor: 'bg-yellow-500',
    impact: '+$5,200 upsell',
    impactColor: 'text-green-400',
    category: 'Marketing',
    conf: 82,
  },
  {
    id: 4,
    title: 'Pre-check-in Email Campaign',
    priority: 'MEDIUM',
    priorityColor: 'bg-yellow-500',
    impact: '+$3,100 ancillary rev',
    impactColor: 'text-green-400',
    category: 'Guest',
    conf: 78,
  },
  {
    id: 5,
    title: 'Renegotiate Expedia Commission',
    priority: 'LOW',
    priorityColor: 'bg-blue-500',
    impact: '-$18K annual cost',
    impactColor: 'text-green-400',
    category: 'Revenue',
    conf: 71,
  },
]

export const clusterData: ClusterPoint[] = [
  { name: 'Business Solo', x: 2.1, y: 4.2, z: 30 },
  { name: 'Business Solo', x: 2.3, y: 3.6, z: 25 },
  { name: 'Business Solo', x: 1.8, y: 5.1, z: 28 },
  { name: 'Leisure Family', x: 4.5, y: 8.4, z: 40 },
  { name: 'Leisure Family', x: 5.2, y: 8.9, z: 38 },
  { name: 'Leisure Family', x: 6.1, y: 8.1, z: 35 },
  { name: 'Luxury Couple', x: 2.1, y: 2.4, z: 20 },
  { name: 'Luxury Couple', x: 2.3, y: 2.8, z: 22 },
  { name: 'Luxury Couple', x: 1.8, y: 2.2, z: 18 },
  { name: 'Conference Group', x: 2.3, y: 6.4, z: 45 },
  { name: 'Conference Group', x: 4.5, y: 3.4, z: 42 },
]

export const clusterColors: Record<string, string> = {
  'Business Solo': '#8b5cf6',
  'Leisure Family': '#22c55e',
  'Luxury Couple': '#f59e0b',
  'Conference Group': '#06b6d4',
}

export const maintenanceAlerts: MaintenanceAlert[] = [
  { name: 'Boiler Unit B2', eta: 'Failure in 3–5 days', cost: '$4,200', pct: 92, color: '#ef4444' },
  {
    name: 'Elevator #3 Motor',
    eta: 'Failure in 1–2 weeks',
    cost: '$8,900',
    pct: 76,
    color: '#f59e0b',
  },
  {
    name: 'Pool Pump System',
    eta: 'Failure in 3–4 weeks',
    cost: '$2,100',
    pct: 61,
    color: '#f59e0b',
  },
  {
    name: 'HVAC Floor 6 Zone',
    eta: 'Failure in 6–8 weeks',
    cost: '$1,800',
    pct: 45,
    color: '#8b5cf6',
  },
]

export const churnGuests: ChurnGuest[] = [
  {
    initials: 'S',
    name: 'Sarah M.',
    stays: '12 stays',
    ltv: 'LTV $8,400',
    churn: 78,
    color: 'bg-orange-500',
  },
  {
    initials: 'R',
    name: 'Robert K.',
    stays: '8 stays',
    ltv: 'LTV $5,200',
    churn: 65,
    color: 'bg-blue-500',
  },
  {
    initials: 'C',
    name: 'Chen Wei',
    stays: '15 stays',
    ltv: 'LTV $11,300',
    churn: 61,
    color: 'bg-teal-500',
  },
]

// ── Guest Experience Page Data ────────────────────────────────────────────────

export const guestPlatforms: GuestPlatform[] = [
  { name: 'Google', initial: 'G', reviews: '1,842 reviews', score: 4.6, outOf: 5 },
  { name: 'TripAdvisor', initial: 'T', reviews: '956 reviews', score: 4.4, outOf: 5 },
  { name: 'Booking.com', initial: 'B', reviews: '2,341 reviews', score: 8.7, outOf: 10 },
  { name: 'Expedia', initial: 'E', reviews: '621 reviews', score: 8.3, outOf: 10 },
]

export const guestSentimentTrend: SentimentDataPoint[] = [
  { month: 'Oct', score: 7.9 },
  { month: 'Nov', score: 8.1 },
  { month: 'Dec', score: 8.4 },
  { month: 'Jan', score: 8.2 },
  { month: 'Feb', score: 8.6 },
  { month: 'Mar', score: 8.9 },
]

export const guestSentimentBreakdown: SentimentBreakdown[] = [
  { label: 'Positive', value: 68, color: '#22c55e' },
  { label: 'Mixed', value: 22, color: '#f59e0b' },
  { label: 'Negative', value: 10, color: '#ef4444' },
]

export const guestTouchpoints: TouchpointScore[] = [
  { label: 'Check-in', score: 8.7, color: '#22c55e' },
  { label: 'Room Quality', score: 8.9, color: '#22c55e' },
  { label: 'F&B', score: 7.1, color: '#f59e0b' },
  { label: 'Spa & Wellness', score: 8.5, color: '#22c55e' },
  { label: 'Housekeeping', score: 8.3, color: '#22c55e' },
  { label: 'Check-out', score: 7.8, color: '#818cf8' },
  { label: 'Concierge', score: 7.0, color: '#f59e0b' },
]

export const guestReviews: GuestReview[] = [
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

// ── Marketing Page Data ────────────────────────────────────────────────────────

export const marketingKpis: MarketingKpi[] = [
  {
    title: 'Total Ad Spend (MTD)',
    value: '$37.8K',
    change: '+12%',
    positive: false,
    icon: DollarSign,
  },
  { title: 'Total Ad Revenue', value: '$136.7K', change: '+24%', positive: true, icon: TrendingUp },
  { title: 'Blended ROAS', value: '3.6x', change: '+0.4x', positive: true, icon: Target },
  {
    title: 'Direct Booking Conv.',
    value: '1.95%',
    change: '+0.3pp',
    positive: true,
    icon: BookOpen,
  },
]

export const adsPerformanceData: AdsPerformanceDataPoint[] = [
  { week: 'W1', googleSpend: 4200, metaSpend: 2100, googleRevenue: 15800, metaRevenue: 7200 },
  { week: 'W2', googleSpend: 5100, metaSpend: 2800, googleRevenue: 18200, metaRevenue: 9100 },
  { week: 'W3', googleSpend: 4700, metaSpend: 2400, googleRevenue: 17100, metaRevenue: 8400 },
  { week: 'W4', googleSpend: 4400, metaSpend: 2500, googleRevenue: 16600, metaRevenue: 8800 },
]

export const marketingFunnelSteps: FunnelStep[] = [
  { label: 'Website Visits', value: 48200, dropOff: '62% drop-off', color: 'bg-violet-600' },
  { label: 'Room Page Views', value: 18400, dropOff: '63% drop-off', color: 'bg-violet-500' },
  { label: 'Rate Check / Search', value: 6800, dropOff: '68% drop-off', color: 'bg-violet-400' },
  { label: 'Booking Started', value: 2200, dropOff: '57% drop-off', color: 'bg-violet-300' },
  { label: 'Booking Completed', value: 940, dropOff: null, color: 'bg-green-400' },
]

export const roasChannels: RoasChannel[] = [
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

export const wastedSpend: WastedSpendItem[] = [
  { label: 'Google Display', amount: '-$1,840' },
  { label: 'Meta Broad Targeting', amount: '-$1,240' },
  { label: 'Generic Keywords', amount: '-$960' },
]

export const attributionData: AttributionDataPoint[] = [
  { channel: 'Google Ads', value: 31 },
  { channel: 'Meta Ads', value: 22 },
  { channel: 'Email', value: 20 },
  { channel: 'Direct', value: 28 },
  { channel: 'OTA Referral', value: 14 },
]

export const attributionColors: Record<string, string> = {
  'Google Ads': '#6366f1',
  'Meta Ads': '#3b82f6',
  Email: '#22c55e',
  Direct: '#f59e0b',
  'OTA Referral': '#ef4444',
}

export const emailCampaigns: EmailCampaign[] = [
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

// ── External Intelligence Page Data ───────────────────────────────────────────

export const externalWeatherDays: WeatherDay[] = [
  { day: 'Thu', icon: '☀️', high: 22, low: 14 },
  { day: 'Fri', icon: '⛅', high: 24, low: 15 },
  { day: 'Sat', icon: '🌧️', high: 19, low: 12 },
  { day: 'Sun', icon: '🌧️', high: 17, low: 11 },
  { day: 'Mon', icon: '☀️', high: 21, low: 13 },
  { day: 'Tue', icon: '☀️', high: 25, low: 16 },
  { day: 'Wed', icon: '⛅', high: 23, low: 15 },
]

export const externalOccupancyData: OccupancyData[] = [
  { month: 'Jan', value: 72 },
  { month: 'Feb', value: 74 },
  { month: 'Mar', value: 76 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 85 },
]

export const externalEvents: LocalEvent[] = [
  {
    dateRange: '8–10',
    month: 'Mar',
    name: 'Tech Summit 2026',
    venue: 'City Convention Centre · 8,200 expected',
    tags: ['Conference'],
    impact: 'Very High',
    impactColor: 'destructive',
  },
  {
    dateRange: '14–16',
    month: 'Mar',
    name: 'Spring Food Festival',
    venue: 'Waterfront Park · 25,000 expected',
    tags: ['Festival'],
    impact: 'High',
    impactColor: 'default',
  },
  {
    dateRange: '22',
    month: 'Mar',
    name: 'International Marathon',
    venue: 'City Downtown · 12,000 expected',
    tags: ['Sports'],
    impact: 'Medium',
    impactColor: 'secondary',
  },
  {
    dateRange: '25–30',
    month: 'Mar',
    name: 'Art & Culture Week',
    venue: 'Museum District · 18,000 expected',
    tags: ['Culture'],
    impact: 'High',
    impactColor: 'default',
  },
  {
    dateRange: '3',
    month: 'Apr',
    name: 'Business Awards Gala',
    venue: 'Grand Ballroom · 1,200 expected',
    tags: ['Corporate'],
    impact: 'Low',
    impactColor: 'outline',
  },
]

export const externalFlights: FlightArrival[] = [
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

export const externalCompetitors: CompetitorPromo[] = [
  {
    name: 'The Grand Palace',
    promo: 'Stay 3, Pay 2',
    period: 'Mar 8–15',
    impact: 'HIGH IMPACT',
    impactColor: 'destructive',
  },
  {
    name: 'Azure Bay Resort',
    promo: 'Free Breakfast',
    period: 'Ongoing',
    impact: 'MEDIUM IMPACT',
    impactColor: 'default',
  },
  {
    name: 'Skyline Hotel',
    promo: 'Corp Rate -20%',
    period: 'Mar 1–31',
    impact: 'HIGH IMPACT',
    impactColor: 'destructive',
  },
  {
    name: 'Ocean View Suites',
    promo: 'Spa Package $99',
    period: 'Weekends',
    impact: 'LOW IMPACT',
    impactColor: 'outline',
  },
]

export const externalMacroIndicators: MacroIndicator[] = [
  { label: 'Tourism GDP Contribution', value: '+3.2%', change: '+0.4%', up: true },
  { label: 'Consumer Confidence Index', value: '108.4', change: '+2.1', up: true },
  { label: 'Business Travel Spend', value: '$284B', change: '+8.1% YoY', up: true },
  { label: 'Forex Rate (USD/EUR)', value: '0.921', change: '-0.8%', up: false },
  { label: 'Inflation Rate', value: '2.8%', change: '-0.3pp', up: false },
  { label: 'Hotel ADR Index', value: '+5.6%', change: '+1.2pp', up: true },
]

export const externalVisaAlerts: VisaAlert[] = [
  {
    country: 'India',
    tag: 'eVisa Expanded',
    tagColor: 'default',
    desc: '30-day eVisa now available. Expected +12% Indian traveler volume.',
  },
  {
    country: 'China',
    tag: 'Group Travel Policy',
    tagColor: 'secondary',
    desc: 'New group tour regulations effective Apr 1. MICE groups may be affected.',
  },
  {
    country: 'GCC Countries',
    tag: 'Visa on Arrival',
    tagColor: 'default',
    desc: 'New visa-on-arrival for 6 Gulf nations. Luxury segment opportunity.',
  },
]

export const externalPublicHolidays: PublicHoliday[] = [
  { name: "International Women's Day", date: 'Mar 8' },
  { name: 'Spring Equinox', date: 'Mar 20' },
  { name: 'Good Friday', date: 'Apr 4' },
]

// ── Data & Integrations Page Data ───────────────────────────────────────────

export const throughputData: ThroughputDataPoint[] = [
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

export const coreSystemsMocks: Integration[] = [
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

export const guestCrmMocks: Integration[] = [
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

export const distributionMocks: Integration[] = [
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

export const fbEventsMocks: Integration[] = [
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

export const smartBuildingMocks: Integration[] = [
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
