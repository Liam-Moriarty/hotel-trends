import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground border-border',
        destructive: 'border-destructive/30 text-destructive',
        outline: 'text-foreground',
        warning: '',
        success: '',
        ai: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, style, ...props }: BadgeProps) {
  const variantStyle: React.CSSProperties =
    variant === 'warning'
      ? {
          background: 'var(--status-warning-bg)',
          color: 'var(--status-warning)',
          borderColor: 'rgba(217,119,6,0.3)',
          ...style,
        }
      : variant === 'success'
        ? {
            background: 'var(--status-success-bg)',
            color: 'var(--status-success)',
            borderColor: 'rgba(22,163,74,0.3)',
            ...style,
          }
        : variant === 'destructive'
          ? { background: 'var(--status-error-bg)', ...style }
          : variant === 'ai'
            ? {
                background: 'var(--accent-violet-muted)',
                color: 'var(--accent-violet)',
                borderColor: 'var(--border-ai)',
                ...style,
              }
            : style ?? {}

  return (
    <div className={cn(badgeVariants({ variant }), className)} style={variantStyle} {...props} />
  )
}

export { Badge, badgeVariants }
