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
import type { NavItem } from '@/interface'

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  {
    id: 'revenue',
    label: 'Revenue & Pricing',
    path: '/revenue',
    icon: TrendingUp,
    // children: [
    //   { id: 'revenue-overview', label: 'Overview', path: '/revenue/overview' },
    //   { id: 'rate-shopping', label: 'Rate Shopping', path: '/revenue/rate-shopping' },
    //   { id: 'booking-mix', label: 'Booking Mix', path: '/revenue/booking-mix' },
    // ],
  },
  {
    id: 'ai',
    label: 'AI & Forecasting',
    path: '/ai',
    icon: Brain,
    // children: [
    //   { id: 'demand-forecast', label: 'Demand Forecast', path: '/ai/demand-forecast' },
    //   { id: 'pricing-recs', label: 'Pricing Recommendations', path: '/ai/pricing-recs' },
    // ],
  },
  {
    id: 'guest',
    label: 'Guest Experience',
    path: '/guest',
    icon: Users,
    // children: [
    //   { id: 'sentiment', label: 'Sentiment Feed', path: '/guest/sentiment' },
    //   { id: 'guest-profiles', label: 'Guest Profiles', path: '/guest/profiles' },
    //   { id: 'service-recovery', label: 'Service Recovery', path: '/guest/service-recovery' },
    // ],
  },
  {
    id: 'operations',
    label: 'Operations',
    path: '/operations',
    icon: Settings2,
    // children: [
    //   { id: 'labour', label: 'Labour & Roster', path: '/operations/labour' },
    //   { id: 'energy', label: 'Energy', path: '/operations/energy' },
    //   { id: 'maintenance', label: 'Maintenance Alerts', path: '/operations/maintenance' },
    //   { id: 'housekeeping', label: 'Housekeeping', path: '/operations/housekeeping' },
    // ],
  },
  {
    id: 'marketing',
    label: 'Marketing & Distribution',
    path: '/marketing',
    icon: Megaphone,
    // children: [
    //   { id: 'channel-roi', label: 'Channel ROI', path: '/marketing/channel-roi' },
    //   { id: 'campaigns', label: 'Campaigns', path: '/marketing/campaigns' },
    // ],
  },
  { id: 'external', label: 'External Intelligence', path: '/external', icon: Globe },
  { id: 'data', label: 'Data & Integrations', path: '/data', icon: Database },
  { id: 'admin', label: 'Admin Settings', path: '/admin', icon: Settings },
]
