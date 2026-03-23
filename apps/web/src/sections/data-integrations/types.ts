import type { Integration } from '@/interface'

export type IntegrationCategory = 'core' | 'crm' | 'distribution' | 'fnb' | 'building'

export interface EnrichedIntegration extends Integration {
  category: IntegrationCategory
  issueType?: string
  actionLabel?: 'Diagnose' | 'Investigate'
}

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  core: 'Core Systems',
  crm: 'Guest & CRM',
  distribution: 'Distribution',
  fnb: 'F&B & Events',
  building: 'Smart Building',
}

export const CATEGORY_ORDER: IntegrationCategory[] = [
  'core',
  'crm',
  'distribution',
  'fnb',
  'building',
]
