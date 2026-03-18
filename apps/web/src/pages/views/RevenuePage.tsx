import { useState } from 'react'
import { initialRooms } from '@/mocks'
import type { RoomRate } from '@/interface'
import { KpiCard, KpiSkeleton } from '@/components/KpiCard'
import { useRevenueKpis } from '@/features/revenue-pricing/hooks/useRevenueKpis'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import OccupancyHeatmap from '@/sections/revenue/OccupancyHeatmap'
import RateTrendChart from '@/sections/revenue/RateTrendChart'
import RoomRateTable from '@/sections/revenue/RoomRateTable'

export default function RevenuePage() {
  const { data: revenueKpis, isLoading: kpisLoading } = useRevenueKpis()
  const [rooms, setRooms] = useState<RoomRate[]>(initialRooms)

  const applyRate = (idx: number) =>
    setRooms(prev => prev.map((r, i) => (i === idx ? { ...r, applied: true } : r)))

  const applyAll = () => setRooms(prev => prev.map(r => ({ ...r, applied: true })))

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Revenue &amp; Pricing</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Dynamic pricing engine, demand forecasting &amp; channel optimization
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filter
          </Button>
          <Button size="sm" onClick={applyAll}>
            ⚡ Apply AI Rates
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpisLoading
          ? Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
          : revenueKpis?.map(k => <KpiCard key={k.label} {...k} />)}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="dynamic-pricing">
        <TabsList>
          <TabsTrigger value="dynamic-pricing">Dynamic Pricing</TabsTrigger>
          <TabsTrigger value="demand-forecast">Demand Forecast</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="rate-shopping">Rate Shopping</TabsTrigger>
        </TabsList>

        <TabsContent value="dynamic-pricing" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <RoomRateTable rooms={rooms} onApply={applyRate} />
            </div>
            <OccupancyHeatmap />
          </div>
          <RateTrendChart />
        </TabsContent>

        <TabsContent value="demand-forecast">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Demand Forecast — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="channels">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Channels — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rate-shopping">
          <Card>
            <CardContent className="pt-6 text-muted-foreground text-sm">
              Rate Shopping — coming in Phase 1.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
