import { LucideIcon } from 'lucide-react'

export type InsightVariant = 'destructive' | 'warning' | 'success' | 'secondary'

// ── Component Types ───────────────────────────────────────────────────────────

export interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export interface NavItem {
  id: string
  label: string
  path: string
  icon?: LucideIcon
  children?: NavItem[]
}

// ── Auth types ───────────────────────────────────────────────────────────

export interface AuthUser {
  email: string
  name: string
  role: string
  initials: string
}

export interface AuthContextValue {
  user: AuthUser
  logout: () => void
}

// ── Dashboard types ───────────────────────────────────────────────────────────

export interface RevenueDataPoint {
  day: string
  actual: number
  forecast: number
}

export interface RevparDataPoint {
  month: string
  actual: number | null
  forecast: number | null
}

export type KpiVariant = 'up' | 'down' | 'info' | 'neutral'

export interface KpiItem {
  label: string
  value: string
  sub: string
  variant: KpiVariant
}

export interface Department {
  name: string
  score: number
}

export interface Insight {
  badge: string
  variant: InsightVariant
  title: string
  body: string
  cta: string
}

export interface CapexItem {
  name: string
  roi: string
  score: number
  amount: string
  bar: number
}

// ── Revenue types ───────────────────────────────────────────────────────────

export interface RoomRate {
  type: string
  current: number
  compAvg: number
  aiRec: number
  delta: number
  occupancy: number
  applied: boolean
}

export interface HeatmapCell {
  value: number | null
}

export type HeatmapRow = HeatmapCell[]

// ── AI Page types ───────────────────────────────────────────────────────────

export interface OccupancyDataPoint {
  date: string
  occ: number
}

export interface LabourDataPoint {
  week: string
  hours: number
}

export interface Anomaly {
  id: number
  title: string
  delta: string
  desc: string
  time: string
  color: string
  bg: string
  icon: string
  resolved: boolean
}

export interface Recommendation {
  id: number
  title: string
  priority: string
  priorityColor: string
  impact: string
  impactColor: string
  category: string
  conf: number
}

export interface ClusterPoint {
  name: string
  x: number
  y: number
  z: number
}

export interface MaintenanceAlert {
  name: string
  eta: string
  cost: string
  pct: number
  color: string
}

export interface ChurnGuest {
  initials: string
  name: string
  stays: string
  ltv: string
  churn: number
  color: string
}

// ── Guest Experience types ────────────────────────────────────────────────────

export interface GuestPlatform {
  name: string
  initial: string
  reviews: string
  score: number
  outOf: number
}

export interface SentimentDataPoint {
  month: string
  score: number
}

export interface SentimentBreakdown {
  label: string
  value: number
  color: string
}

export interface TouchpointScore {
  label: string
  score: number
  color: string
}

export interface GuestReview {
  initial: string
  name: string
  platform: string
  stars: number
  text: string
  tags: string[]
  time: string
  positive: boolean
}

// ── Marketing types ───────────────────────────────────────────────────────────

export type AttributionMode = 'First Touch' | 'Last Touch' | 'Linear'

export interface MarketingKpi {
  title: string
  value: string
  change: string
  positive: boolean
  icon: LucideIcon
}

export interface AdsPerformanceDataPoint {
  week: string
  googleSpend: number
  metaSpend: number
  googleRevenue: number
  metaRevenue: number
}

export interface FunnelStep {
  label: string
  value: number
  dropOff: string | null
  color: string
}

export interface RoasChannel {
  name: string
  roas: number
  spend: string
  pct: number
  color: string
  status: string | null
}

export interface WastedSpendItem {
  label: string
  amount: string
}

export interface AttributionDataPoint {
  channel: string
  value: number
}

export interface EmailCampaign {
  name: string
  revenue: string
  sent: number
  opens: string
  clicks: string
  bookings: number
}

// ── External Intelligence types ─────────────────────────────────────────────

export interface WeatherDay {
  day: string
  icon: string
  high: number
  low: number
}

export interface OccupancyData {
  month: string
  value: number
}

export interface LocalEvent {
  dateRange: string
  month: string
  name: string
  venue: string
  tags: string[]
  impact: string
  impactColor: 'destructive' | 'default' | 'secondary' | 'outline'
}

export interface FlightArrival {
  time: string
  origin: string
  flight: string
  pax: number
  status: string
  statusColor: string
}

export interface CompetitorPromo {
  name: string
  promo: string
  period: string
  impact: string
  impactColor: 'destructive' | 'default' | 'outline'
}

export interface MacroIndicator {
  label: string
  value: string
  change: string
  up: boolean
}

export interface VisaAlert {
  country: string
  tag: string
  tagColor: 'default' | 'secondary'
  desc: string
}

export interface PublicHoliday {
  name: string
  date: string
}

// ── Data & Integrations types ────────────────────────────────────────────────

export type IntegrationStatus = 'healthy' | 'warning' | 'error'

export interface Integration {
  id: string
  name: string
  vendor: string
  status: IntegrationStatus
  lastSync: string
  records: string
  uptime: number
  latency: string
}

export interface ThroughputDataPoint {
  time: string
  value: number
}

// ── Admin Settings types ──────────────────────────────────────────────────

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin: string
  initials: string
}

export interface AdminTab {
  id: string
  label: string
}
// ── Operations types ────────────────────────────────────────────────────────

export type RosterStatus = 'ok' | 'understaffed' | 'overtime'

export interface RosterDept {
  name: string
  shift: string
  staffed: number
  required: number
  status: RosterStatus
  overtime?: string
}

export type RoomTaskStatus = 'Clean' | 'In Progress' | 'Inspecting' | 'Dirty' | 'Blocked'

export interface RoomTask {
  room: string
  status: RoomTaskStatus
}

export interface EnergyDataPoint {
  time: string
  actual: number
  target: number
}

export interface FoodWasteDataPoint {
  day: string
  kg: number
}

export interface InventoryItem {
  name: string
  units: number
  max: number
  status: 'OK' | 'LOW' | 'CRITICAL'
}

export interface SupplierInsight {
  name: string
  current: string
  save: string
  tip: string
}
