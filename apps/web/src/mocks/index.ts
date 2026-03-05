import type {
  AuthUser,
  CapexItem,
  Department,
  HeatmapRow,
  Insight,
  Kpi,
  KpiCardData,
  RevenueDataPoint,
  RevparDataPoint,
  RoomRate,
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

export const kpis: Kpi[] = [
  { label: 'Total Revenue', value: '$482K', sub: '+8.4% vs last month', up: true },
  { label: 'Gross Operating Profit', value: '$142K', sub: '+12.1% · GOP margin 29.5%', up: true },
  { label: 'ADR', value: '$218', sub: '+5.6% Avg Daily Rate', up: true },
  { label: 'Occupancy', value: '84.2%', sub: '−2.1% vs 86.3% prior month', up: false },
  { label: 'RevPAR', value: '$183', sub: '+3.2% Revenue per avail. room', up: true },
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

export const kpiCardData: KpiCardData[] = [
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
