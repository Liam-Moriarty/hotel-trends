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

export interface Kpi {
  label: string
  value: string
  sub: string
  up: boolean
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

export interface KpiCardData {
  label: string
  value: string
  change: string
  positive: boolean
  neutral?: boolean
}

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
