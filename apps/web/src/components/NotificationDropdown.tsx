import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  Settings,
  Mail,
  MessageSquare,
  MessageCircle,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import {
  MOCK_NOTIFICATIONS,
  type Notification,
  type NotificationType,
} from '@/lib/mock-notifications'

interface NotificationChannels {
  email: boolean
  text: boolean
  whatsapp: boolean
}

interface NotificationDropdownProps {
  onViewAll?: () => void
}

function NotificationIcon({ type }: { type: NotificationType }) {
  const base = 'h-8 w-8 rounded-full flex items-center justify-center shrink-0'
  switch (type) {
    case 'success':
      return (
        <div className={base} style={{ background: 'var(--status-success-bg)' }}>
          <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--status-success)' }} />
        </div>
      )
    case 'error':
      return (
        <div className={base} style={{ background: 'var(--status-error-bg)' }}>
          <AlertTriangle className="h-4 w-4" style={{ color: 'var(--status-error)' }} />
        </div>
      )
    case 'warning':
      return (
        <div className={base} style={{ background: 'var(--status-warning-bg)' }}>
          <AlertTriangle className="h-4 w-4" style={{ color: 'var(--status-warning)' }} />
        </div>
      )
    case 'info':
      return (
        <div className={base} style={{ background: 'var(--status-info-bg)' }}>
          <Info className="h-4 w-4" style={{ color: 'var(--status-info)' }} />
        </div>
      )
    case 'system':
    default:
      return (
        <div className={`${base} bg-muted`}>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )
  }
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <NotificationIcon type={notification.type} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight">{notification.title}</p>
          {!notification.read && (
            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.time}</p>
      </div>
    </div>
  )
}

export function NotificationDropdown({ onViewAll }: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const [channels, setChannels] = useState<NotificationChannels>({
    email: true,
    text: false,
    whatsapp: false,
  })

  const unreadCount = notifications.filter(n => !n.read).length
  const recent = notifications.slice(0, 2)

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const toggleChannel = (key: keyof NotificationChannels) => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="w-[360px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Latest Notifications</h3>
          {unreadCount > 0 && (
            <span
              className="h-5 min-w-5 rounded-full text-[10px] text-white flex items-center justify-center font-bold px-1"
              style={{ background: 'var(--status-error)' }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-medium transition-colors"
          style={{ color: 'var(--accent-cool)' }}
        >
          Mark all as read
        </button>
      </div>

      {/* Recent notifications */}
      <div className="px-4">
        {recent.map((notification, i) => (
          <div key={notification.id}>
            <NotificationItem notification={notification} />
            {i < recent.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <Separator className="mt-1" />

      {/* Notification channels */}
      <div className="px-4 py-3 space-y-3">
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          Notification Channels
        </p>

        {[
          {
            key: 'email' as const,
            Icon: Mail,
            label: 'Email Notifications',
            sub: 'Weekly reports & alerts',
          },
          {
            key: 'text' as const,
            Icon: MessageSquare,
            label: 'Text Message (SMS)',
            sub: 'Critical system warnings',
          },
          {
            key: 'whatsapp' as const,
            Icon: MessageCircle,
            label: 'WhatsApp',
            sub: 'Real-time team updates',
          },
        ].map(({ key, Icon, label, sub }) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-md bg-muted flex items-center justify-center">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium leading-tight">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
            <Switch checked={channels[key]} onCheckedChange={() => toggleChannel(key)} />
          </div>
        ))}
      </div>

      <Separator />

      {/* Footer */}
      <div className="p-3">
        <Button asChild variant="ghost" className="w-full text-sm" onClick={onViewAll}>
          <Link to="/alerts">View all activity</Link>
        </Button>
      </div>
    </div>
  )
}
