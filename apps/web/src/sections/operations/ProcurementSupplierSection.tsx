import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Lightbulb } from 'lucide-react'
import type { InventoryItem, SupplierInsight } from '@/interface'

interface ProcurementSupplierSectionProps {
  inventory: InventoryItem[]
  suppliers: SupplierInsight[]
}

function InventoryBar({ status, pct }: { status: InventoryItem['status']; pct: number }) {
  const color =
    status === 'OK'
      ? 'var(--status-success)'
      : status === 'LOW'
        ? 'var(--status-warning)'
        : 'var(--status-error)'
  return (
    <div className="relative h-2 w-full rounded-full bg-muted overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ width: `${pct}%`, background: color }}
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
                  <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
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
                style={
                  item.status === 'OK'
                    ? { color: 'var(--status-success)', borderColor: 'var(--status-success)' }
                    : item.status === 'LOW'
                      ? { color: 'var(--status-warning)', borderColor: 'var(--status-warning)' }
                      : {}
                }
                className="text-xs whitespace-nowrap"
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
                <span className="font-semibold text-sm" style={{ color: 'var(--status-success)' }}>
                  {s.save}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Current: {s.current}</p>
              <div className="flex items-center gap-1.5 rounded-md bg-muted/50 px-2 py-1.5">
                <Lightbulb
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: 'var(--status-warning)' }}
                />
                <span className="text-xs" style={{ color: 'var(--status-success)' }}>
                  {s.tip}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
