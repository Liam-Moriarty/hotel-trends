import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'

interface OperationsHeaderProps {
  understaffedCount: number
}

export function OperationsHeader({ understaffedCount }: OperationsHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">Operations</h1>
        <p className="text-muted-foreground text-sm">
          Labor, housekeeping, energy, procurement &amp; maintenance
        </p>
      </div>
      <Badge variant="destructive" className="flex items-center gap-1.5 text-sm px-3 py-1.5">
        <AlertTriangle className="w-4 h-4" />
        {understaffedCount} Understaffed Depts
      </Badge>
    </div>
  )
}
