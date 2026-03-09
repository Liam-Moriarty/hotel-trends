import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'
import type { Integration, IntegrationStatus } from '@/interface'

interface DataIntegrationsSectionProps {
  coreSystems: Integration[]
  guestCrm: Integration[]
  distribution: Integration[]
  fbEvents: Integration[]
  smartBuilding: Integration[]
}

export function DataIntegrationsSection({
  coreSystems,
  guestCrm,
  distribution,
  fbEvents,
  smartBuilding,
}: DataIntegrationsSectionProps) {
  return (
    <div className="space-y-6">
      <IntegrationGroup title="Core Systems" items={coreSystems} />
      <IntegrationGroup title="Guest & CRM" items={guestCrm} />
      <IntegrationGroup title="Distribution" items={distribution} />
      <IntegrationGroup title="F&B & Events" items={fbEvents} />
      <IntegrationGroup title="Smart Building" items={smartBuilding} />
    </div>
  )
}

function IntegrationGroup({ title, items }: { title: string; items: Integration[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {items.map(item => (
          <IntegrationRow key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  )
}

function IntegrationRow({ item }: { item: Integration }) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <StatusIcon status={item.status} />
        <div>
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.vendor}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 shrink-0">
        <div className="text-right hidden md:block">
          <p
            className={`text-sm font-medium ${item.status === 'error' ? 'text-red-500' : item.status === 'warning' ? 'text-yellow-500' : 'text-green-500'}`}
          >
            {item.lastSync}
          </p>
          <p className="text-xs text-muted-foreground">{item.records}</p>
        </div>
        <div className="hidden lg:flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">Uptime</span>
          <UptimeBar uptime={item.uptime} status={item.status} />
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs text-muted-foreground block">Latency</span>
          <LatencyBadge latency={item.latency} status={item.status} />
        </div>
        <div className="flex items-center gap-2">
          <ActionButton status={item.status} />
          <Button size="icon" variant="outline" className="h-8 w-8">
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatusIcon({ status }: { status: IntegrationStatus }) {
  if (status === 'healthy') return <CheckCircle2 className="h-4 w-4 text-green-500" />
  if (status === 'warning') return <AlertTriangle className="h-4 w-4 text-yellow-500" />
  return <XCircle className="h-4 w-4 text-red-500" />
}

function UptimeBar({ uptime, status }: { uptime: number; status: IntegrationStatus }) {
  const color =
    status === 'healthy' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${uptime}%` }} />
      </div>
      <span className="text-sm text-muted-foreground">{uptime}%</span>
    </div>
  )
}

function LatencyBadge({ latency, status }: { latency: string; status: IntegrationStatus }) {
  if (latency === 'Timeout')
    return <span className="text-sm font-semibold text-red-500">Timeout</span>
  const color =
    status === 'healthy'
      ? 'text-green-500'
      : status === 'warning'
        ? 'text-yellow-500'
        : 'text-red-500'
  return <span className={`text-sm font-semibold ${color}`}>{latency}</span>
}

function ActionButton({ status }: { status: IntegrationStatus }) {
  if (status === 'warning')
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/10"
      >
        Investigate
      </Button>
    )
  if (status === 'error')
    return (
      <Button
        size="sm"
        variant="outline"
        className="text-red-500 border-red-500 hover:bg-red-500/10"
      >
        Diagnose
      </Button>
    )
  return null
}
