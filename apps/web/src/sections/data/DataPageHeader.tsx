import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export function DataPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Data & Integrations</h1>
        <p className="text-muted-foreground text-sm">
          Cloud data lake, API health monitoring & pipeline status
        </p>
      </div>
      <Button variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Sync All
      </Button>
    </div>
  )
}
