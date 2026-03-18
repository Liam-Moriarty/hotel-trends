import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function OperationsKpiCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="h-9 w-20 mt-2" />
            <Skeleton className="h-1.5 w-full mt-3" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function LaborHousekeepingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Labor Roster */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-44" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border p-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Housekeeping Task Tracker */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          {/* Legend row */}
          <div className="flex flex-wrap gap-3 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <Skeleton className="h-3 w-14" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-md border p-2 text-center space-y-1">
                <Skeleton className="h-4 w-10 mx-auto" />
                <Skeleton className="h-3 w-14 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function EnergyWasteSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-56 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProcurementSupplierSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, panel) => (
        <Card key={panel}>
          <CardHeader>
            <Skeleton className="h-5 w-44" />
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-3">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function OperationsHeaderSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  )
}

export function OperationsPageSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <OperationsHeaderSkeleton />
      <OperationsKpiCardsSkeleton />
      <LaborHousekeepingSkeleton />
      <EnergyWasteSkeleton />
      <ProcurementSupplierSkeleton />
    </div>
  )
}
