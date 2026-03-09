import { Badge } from '@/components/ui/badge'
import { Cpu } from 'lucide-react'
import OccupancyForecast from '@/sections/ai-forecasting/OccupancyForecast'
import LaborDemandForecast from '@/sections/ai-forecasting/LaborDemandForecast'
import AnomalyDetection from '@/sections/ai-forecasting/AnomalyDetection'
import RecommendationEngine from '@/sections/ai-forecasting/RecommendationEngine'
import OptimizationEngine from '@/sections/ai-forecasting/OptimizationEngine'
import GuestClusterVisualization from '@/sections/ai-forecasting/GuestClusterVisualization'
import PredictiveMaintenance from '@/sections/ai-forecasting/PredictiveMaintenance'
import LoyaltyChurnPrediction from '@/sections/ai-forecasting/LoyaltyChurnPrediction'

export default function AiPage() {
  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI &amp; Forecasting</h1>
          <p className="text-sm text-muted-foreground">
            Machine learning insights, predictive analytics &amp; optimization engine
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 text-sm">
          <Cpu className="h-3.5 w-3.5 text-green-500" />
          Vertex AI · Models Active
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </Badge>
      </div>

      {/* Row 1 — Occupancy Forecast + Labor Demand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OccupancyForecast />
        <LaborDemandForecast />
      </div>

      {/* Row 2 — Anomaly Detection + Recommendation Engine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnomalyDetection />
        <RecommendationEngine />
      </div>

      {/* Row 3 — Optimization Engine + Guest Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <OptimizationEngine />
        <GuestClusterVisualization />
      </div>

      {/* Row 4 — Predictive Maintenance + Loyalty vs Churn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PredictiveMaintenance />
        <LoyaltyChurnPrediction />
      </div>
    </div>
  )
}
