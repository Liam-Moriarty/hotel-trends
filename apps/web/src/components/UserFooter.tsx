import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

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

const UserFooter = ({ collapsed }: { collapsed: boolean }) => {
  const { user, logout } = useAuth()

  const initials = user ? getInitials(user.displayName, user.email) : '?'
  const name = user?.displayName || user?.email || 'Unknown'

  return (
    <div
      className={cn('border-t p-3 flex items-center gap-2 shrink-0', collapsed && 'justify-center')}
    >
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
        {initials}
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{name}</p>
        </div>
      )}
      {!collapsed && (
        <button
          onClick={logout}
          title="Logout"
          className="text-muted-foreground hover:text-foreground shrink-0 p-1 rounded hover:bg-accent"
        >
          <LogOut className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default UserFooter
