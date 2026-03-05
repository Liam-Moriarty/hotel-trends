import type {
  AuthUser,
  CapexItem,
  Department,
  Insight,
  Kpi,
  RevenueDataPoint,
  RevparDataPoint,
} from '@/interface'

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
