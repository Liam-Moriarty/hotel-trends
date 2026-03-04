import { LucideIcon } from 'lucide-react'

export interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
}

export interface NavItem {
  id: string
  label: string
  icon?: LucideIcon
  children?: NavItem[]
}

export interface PageShellProps {
  title: string
  description?: string
}
