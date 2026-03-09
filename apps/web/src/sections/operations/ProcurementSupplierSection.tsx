import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Lightbulb } from 'lucide-react'
import type { InventoryItem, SupplierInsight } from '@/interface'

interface ProcurementSupplierSectionProps {
  inventory: InventoryItem[]
  suppliers: SupplierInsight[]
}

function InventoryBar({ status, pct }: { status: InventoryItem['status']; pct: number }) {
  const color = status === 'OK' ? 'bg-green-500' : status === 'LOW' ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function ProcurementSupplierSection({
  inventory,
  suppliers,
}: ProcurementSupplierSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Procurement & Inventory */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-4 h-4" /> Procurement &amp; Inventory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {inventory.map(item => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-md border p-3 gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <InventoryBar status={item.status} pct={(item.units / item.max) * 100} />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {item.units} units
                  </span>
                </div>
              </div>
              <Badge
                variant={
                  item.status === 'OK'
                    ? 'outline'
                    : item.status === 'LOW'
                      ? 'outline'
                      : 'destructive'
                }
                className={`text-xs whitespace-nowrap ${
                  item.status === 'OK'
                    ? 'text-green-500 border-green-500'
                    : item.status === 'LOW'
                      ? 'text-yellow-500 border-yellow-500'
                      : ''
                }`}
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Supplier Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Supplier Renegotiation Insights</CardTitle>
          <p className="text-xs text-muted-foreground">
            AI-identified cost reduction opportunities
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {suppliers.map(s => (
            <div key={s.name} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">{s.name}</p>
                <span className="text-green-500 font-semibold text-sm">{s.save}</span>
              </div>
              <p className="text-xs text-muted-foreground">Current: {s.current}</p>
              <div className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                <span className="text-xs text-green-400">{s.tip}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
