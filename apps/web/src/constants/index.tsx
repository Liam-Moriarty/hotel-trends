import PageShell from '@/pages/PageShell'
import {
  LayoutDashboard,
  TrendingUp,
  Brain,
  Users,
  Settings2,
  Megaphone,
  Globe,
  Database,
  Settings,
} from 'lucide-react'
import { NavItem } from '@/interface'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    id: 'revenue',
    label: 'Revenue & Pricing',
    icon: TrendingUp,
    children: [
      { id: 'revenue-overview', label: 'Overview' },
      { id: 'rate-shopping', label: 'Rate Shopping' },
      { id: 'booking-mix', label: 'Booking Mix' },
    ],
  },
  {
    id: 'ai',
    label: 'AI & Forecasting',
    icon: Brain,
    children: [
      { id: 'demand-forecast', label: 'Demand Forecast' },
      { id: 'pricing-recs', label: 'Pricing Recommendations' },
    ],
  },
  {
    id: 'guest',
    label: 'Guest Experience',
    icon: Users,
    children: [
      { id: 'sentiment', label: 'Sentiment Feed' },
      { id: 'guest-profiles', label: 'Guest Profiles' },
      { id: 'service-recovery', label: 'Service Recovery' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations',
    icon: Settings2,
    children: [
      { id: 'labour', label: 'Labour & Roster' },
      { id: 'energy', label: 'Energy' },
      { id: 'maintenance', label: 'Maintenance Alerts' },
      { id: 'housekeeping', label: 'Housekeeping' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Distribution',
    icon: Megaphone,
    children: [
      { id: 'channel-roi', label: 'Channel ROI' },
      { id: 'campaigns', label: 'Campaigns' },
    ],
  },
  { id: 'external', label: 'External Intelligence', icon: Globe },
  { id: 'data', label: 'Data & Integrations', icon: Database },
  { id: 'admin', label: 'Admin Settings', icon: Settings },
]

export const PAGES = {
  dashboard: () => (
    <PageShell title="Dashboard" description="Hotel Intelligence Dashboard overview." />
  ),
  revenue: () => <PageShell title="Revenue & Pricing" description="Revenue & pricing overview." />,
  'revenue-overview': () => (
    <PageShell title="Revenue Overview" description="Revenue overview metrics." />
  ),
  'rate-shopping': () => (
    <PageShell title="Rate Shopping" description="Competitor rate comparison table." />
  ),
  'booking-mix': () => <PageShell title="Booking Mix" description="Direct vs OTA booking mix." />,
  ai: () => <PageShell title="AI & Forecasting" description="AI models and forecasting hub." />,
  'demand-forecast': () => (
    <PageShell title="Demand Forecast" description="30/60/90-day occupancy forecast." />
  ),
  'pricing-recs': () => (
    <PageShell
      title="Pricing Recommendations"
      description="AI-generated pricing recommendations."
    />
  ),
  guest: () => <PageShell title="Guest Experience" description="Guest experience overview." />,
  sentiment: () => (
    <PageShell
      title="Sentiment Feed"
      description="Live sentiment from Google, TripAdvisor & OTAs."
    />
  ),
  'guest-profiles': () => (
    <PageShell title="Guest Profiles" description="CRM guest profiles and history." />
  ),
  'service-recovery': () => (
    <PageShell title="Service Recovery" description="Negative alert and recovery actions." />
  ),
  operations: () => <PageShell title="Operations" description="Operations overview." />,
  labour: () => <PageShell title="Labour & Roster" description="Labour roster vs occupancy." />,
  energy: () => <PageShell title="Energy" description="Energy usage by day and occupancy." />,
  maintenance: () => (
    <PageShell title="Maintenance Alerts" description="Predictive maintenance alerts." />
  ),
  housekeeping: () => (
    <PageShell title="Housekeeping" description="Room turnaround times and task status." />
  ),
  marketing: () => <PageShell title="Marketing & Distribution" description="Marketing overview." />,
  'channel-roi': () => (
    <PageShell title="Channel ROI" description="Channel ROI ranking and wasted spend." />
  ),
  campaigns: () => (
    <PageShell title="Campaigns" description="Pre-arrival offer campaign summary." />
  ),
  external: () => (
    <PageShell
      title="External Intelligence"
      description="Events, weather, flights and market data."
    />
  ),
  data: () => (
    <PageShell title="Data & Integrations" description="Pipeline health and integration status." />
  ),
  admin: () => (
    <PageShell title="Admin Settings" description="System configuration and user management." />
  ),
}
