import type { InsightVariant } from '@/interface'

export const dotColors: Record<InsightVariant, string> = {
  destructive: 'bg-destructive',
  warning: 'bg-yellow-500',
  success: 'bg-green-500',
  secondary: 'bg-muted-foreground',
}

export const ctaClasses: Record<InsightVariant, string> = {
  destructive: 'border-destructive/40 text-destructive hover:bg-destructive/10',
  warning: 'border-yellow-500/40 text-yellow-600 hover:bg-yellow-500/10',
  success: 'border-green-500/40 text-green-600 hover:bg-green-500/10',
  secondary: 'border-border text-foreground hover:bg-accent',
}
