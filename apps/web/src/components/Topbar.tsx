import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/providers/ThemeProvider'
import { Bell, Moon, Search, Sun } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { NotificationDropdown } from '@/components/NotificationDropdown'
import { MOCK_NOTIFICATIONS } from '@/lib/mock-notifications'

const getInitials = (displayName: string, email: string): string => {
  if (displayName) {
    return displayName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  return email[0].toUpperCase()
}

const Topbar = () => {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-AU', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const initials = user ? getInitials(user.displayName, user.email) : '?'

  return (
    <header
      className="h-14 border-b flex items-center gap-3 px-4 shrink-0"
      style={{ background: 'var(--surface-base)' }}
    >
      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-xs">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search metrics, reports, rooms..."
            className="w-full rounded-md pl-8 pr-10 py-1.5 text-sm outline-none transition-all"
            style={{
              background: 'var(--surface-container-high)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
            onFocus={e => {
              e.currentTarget.style.border = '1px solid var(--accent-cool)'
              e.currentTarget.style.boxShadow = '0 0 0 3px var(--accent-cool-muted)'
            }}
            onBlur={e => {
              e.currentTarget.style.border = '1px solid var(--border-subtle)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <kbd
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] rounded px-1"
            style={{ color: 'var(--text-ghost)', border: '1px solid var(--border-subtle)' }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex-1" />

      {/* Date */}
      <span
        className="text-xs hidden sm:block rounded-md px-2.5 py-1 font-medium"
        style={{
          color: 'var(--text-muted)',
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-container-high)',
        }}
      >
        {dateStr}
      </span>

      {/* Role badge */}
      <div
        className="flex items-center gap-1.5 rounded-md px-2.5 py-1"
        style={{
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-container-high)',
        }}
      >
        <span
          className="h-2 w-2 rounded-full shrink-0"
          style={{ background: 'var(--status-success)' }}
        />
        <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
          Hotel Staff
        </span>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-md hover:bg-accent transition-colors"
        style={{ color: 'var(--text-muted)' }}
        aria-label="Toggle dark mode"
      >
        {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      {/* Notifications */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="relative p-2 rounded-md hover:bg-accent transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span
                className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full text-[9px] text-white flex items-center justify-center font-bold"
                style={{ background: 'var(--status-error)' }}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={8} className="p-0 w-auto">
          <NotificationDropdown onViewAll={() => setOpen(false)} />
        </PopoverContent>
      </Popover>

      {/* Avatar */}
      <div
        className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
        style={{ background: 'var(--accent-gradient)' }}
      >
        {initials}
      </div>
    </header>
  )
}

export default Topbar
