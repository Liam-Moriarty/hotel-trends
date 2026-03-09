import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, AlertTriangle, AlertCircle, Database } from 'lucide-react'

interface DataPageStatsProps {
  healthyCount: number
  warningCount: number
  errorCount: number
}

export function DataPageStats({ healthyCount, warningCount, errorCount }: DataPageStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-2">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cloud Data Lake</span>
          </div>
          <p className="text-3xl font-bold">2.4 TB</p>
          <p className="text-sm text-muted-foreground mb-3">Total data ingested</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Records Today</span>
              <span className="font-medium">1.2M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Calls/hr</span>
              <span className="font-medium">48.4K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Data Freshness</span>
              <span className="font-medium">&lt; 5 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
          <p className="text-5xl font-bold text-green-500">{healthyCount}</p>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-sm">Healthy</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
          <p className="text-5xl font-bold text-yellow-500">{warningCount}</p>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">Warnings</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
          <p className="text-5xl font-bold text-red-500">{errorCount}</p>
          <div className="flex items-center gap-1 mt-2 text-muted-foreground">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span className="text-sm">Errors</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
