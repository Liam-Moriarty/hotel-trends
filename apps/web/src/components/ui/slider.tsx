import * as React from 'react'

import { cn } from '@/lib/utils'

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  value?: number
  onValueChange?: (value: number) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      value={value}
      onChange={e => onValueChange?.(Number(e.target.value))}
      className={cn('w-full accent-primary cursor-pointer', className)}
      {...props}
    />
  )
)
Slider.displayName = 'Slider'

export { Slider }
