import { useState } from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Settings,
  Mail,
  MessageSquare,
  MessageCircle,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  MOCK_NOTIFICATIONS,
  type Notification,
  type NotificationChannel,
  type NotificationType,
} from '@/lib/mock-notifications'

type TabValue = 'all' | NotificationChannel

function ActivityIcon({ type, channel }: { type: NotificationType; channel: NotificationChannel }) {
  const base = 'h-9 w-9 rounded-full flex items-center justify-center shrink-0'

  if (channel === 'email') {
    return (
      <div className={`${base} bg-blue-500/10`}>
        <Mail className="h-4 w-4 text-blue-500" />
      </div>
    )
  }
  if (channel === 'whatsapp') {
    return (
      <div className={`${base} bg-green-500/10`}>
        <MessageCircle className="h-4 w-4 text-green-500" />
      </div>
    )
  }
  if (channel === 'text') {
    return (
      <div className={`${base} bg-purple-500/10`}>
        <MessageSquare className="h-4 w-4 text-purple-500" />
      </div>
    )
  }

  switch (type) {
    case 'success':
      return (
        <div className={`${base} bg-green-500/10`}>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </div>
      )
    case 'error':
      return (
        <div className={`${base} bg-destructive/10`}>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
      )
    case 'warning':
      return (
        <div className={`${base} bg-yellow-500/10`}>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </div>
      )
    case 'info':
      return (
        <div className={`${base} bg-blue-500/10`}>
          <Info className="h-4 w-4 text-blue-500" />
        </div>
      )
    default:
      return (
        <div className={`${base} bg-muted`}>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )
  }
}

function ActivityItem({ notification }: { notification: Notification }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <ActivityIcon type={notification.type} channel={notification.channel} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{notification.title}</p>
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
              {notification.description}
            </p>
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
            {notification.time}
          </span>
        </div>
      </div>
    </div>
  )
}

function ActivityGroup({ label, notifications }: { label: string; notifications: Notification[] }) {
  if (notifications.length === 0) return null
  return (
    <div>
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1 px-4 pt-4">
        {label}
      </h3>
      <div className="rounded-lg border bg-card divide-y divide-border">
        {notifications.map(n => (
          <div key={n.id} className="px-4">
            <ActivityItem notification={n} />
          </div>
        ))}
      </div>
    </div>
  )
}

const TABS: { value: TabValue; label: string }[] = [
  { value: 'all', label: 'All Activity' },
  { value: 'email', label: 'Email' },
  { value: 'text', label: 'Text' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'system', label: 'System' },
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>('all')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered =
    activeTab === 'all'
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter(n => n.channel === activeTab)

  const visible = filtered.slice(0, visibleCount)
  const todayItems = visible.filter(n => n.date === 'today')
  const yesterdayItems = visible.filter(n => n.date === 'yesterday')
  const hasMore = visibleCount < filtered.length

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Activity</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor system-wide notifications and events in real-time chronological order.
        </p>
      </div>

      <Separator />

      {/* Filter bar */}
      <Tabs
        value={activeTab}
        onValueChange={v => {
          setActiveTab(v as TabValue)
          setVisibleCount(6)
        }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <TabsList className="bg-muted/60">
            {TABS.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <button className="flex items-center gap-1.5 text-sm text-muted-foreground border rounded-md px-3 py-1.5 hover:bg-accent hover:text-foreground transition-colors">
            <span>Filter by Date</span>
            <ChevronDown className="h-3.5 w-3.5" />
            <SlidersHorizontal className="h-3.5 w-3.5 ml-1" />
          </button>
        </div>

        {TABS.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4 space-y-4">
            {todayItems.length === 0 && yesterdayItems.length === 0 ? (
              <div className="rounded-lg border bg-card p-12 text-center">
                <p className="text-sm text-muted-foreground">No activity found.</p>
              </div>
            ) : (
              <>
                <ActivityGroup label="Today" notifications={todayItems} />
                <ActivityGroup label="Yesterday" notifications={yesterdayItems} />
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Load more */}
      <div className="flex flex-col items-center gap-2 pt-2">
        {hasMore && (
          <Button variant="outline" onClick={() => setVisibleCount(prev => prev + 6)}>
            Load More History
          </Button>
        )}
        <p className="text-xs text-muted-foreground">
          Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} activities
        </p>
      </div>
    </div>
  )
}
