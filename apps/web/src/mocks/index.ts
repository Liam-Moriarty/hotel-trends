import type {
  Anomaly,
  AuthUser,
  CapexItem,
  ChurnGuest,
  ClusterPoint,
  Department,
  GuestPlatform,
  GuestReview,
  HeatmapRow,
  Insight,
  KpiItem,
  LabourDataPoint,
  MaintenanceAlert,
  OccupancyDataPoint,
  Recommendation,
  RevenueDataPoint,
  RevparDataPoint,
  RoomRate,
  SentimentBreakdown,
  SentimentDataPoint,
  TouchpointScore,
} from '@/interface'

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
