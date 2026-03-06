import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

const UserFooter = ({ collapsed }: { collapsed: boolean }) => {
  const { user, logout } = useAuth()

  return (
    <div
      className={cn('border-t p-3 flex items-center gap-2 shrink-0', collapsed && 'justify-center')}
    >
      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
        {user.initials}
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{user.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{user.role}</p>
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
