import type { InsightVariant } from '@/interface'

export const dotColors: Record<InsightVariant, string> = {
  destructive: 'bg-destructive',
  warning: 'bg-status-warning',
  success: 'bg-status-success',
  secondary: 'bg-muted-foreground',
}

export const ctaClasses: Record<InsightVariant, string> = {
  destructive: 'border-destructive/40 text-destructive hover:bg-destructive/10',
  warning: '',
  success: '',
  secondary: 'border-border text-foreground hover:bg-accent',
}

export const ctaStyles: Record<InsightVariant, React.CSSProperties> = {
  destructive: {},
  warning: {
    borderColor: 'rgba(217,119,6,0.4)',
    color: 'var(--status-warning)',
  },
  success: {
    borderColor: 'rgba(22,163,74,0.4)',
    color: 'var(--status-success)',
  },
  secondary: {},
}
