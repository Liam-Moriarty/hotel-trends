import { NAV_ITEMS } from '@/constants'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, Hotel, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import UserFooter from './UserFooter'

import { NavItem, SidebarProps } from '@/interface'

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

const Sidebar = ({ collapsed, onToggleCollapse }: SidebarProps) => {
  const [openGroups, setOpenGroups] = useState(['revenue'])
  const location = useLocation()
  const navigate = useNavigate()

  function toggleGroup(id: string) {
    setOpenGroups(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }

  function isActive(item: NavItem) {
    if (item.children)
      return (
        item.children.some((c: NavItem): boolean => location.pathname === c.path) ||
        location.pathname === item.path
      )
    return location.pathname === item.path
  }

  return (
    <aside
      className={cn(
        'flex flex-col h-screen border-r bg-card transition-all duration-300 shrink-0',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex items-center border-b h-14 px-3 shrink-0',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="bg-primary rounded-md p-1.5 shrink-0">
              <Hotel className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="leading-none">
              <div className="font-bold text-sm">HOTEL</div>
              <div className="text-[9px] text-muted-foreground tracking-widest">TRENDS AI</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="bg-primary rounded-md p-1.5">
            <Hotel className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            className="text-muted-foreground hover:text-foreground rounded p-1"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {collapsed && (
          <button
            onClick={onToggleCollapse}
            className="w-full flex justify-center py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md mb-1"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        )}

        {NAV_ITEMS.map(item => {
          const Icon = item.icon
          const active = isActive(item)
          const open = openGroups.includes(item.id)

          if (item.children) {
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (collapsed) {
                      navigate(item.path)
                      return
                    }
                    toggleGroup(item.id)
                  }}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
                    active
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    collapsed && 'justify-center'
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      <ChevronRight
                        className={cn(
                          'h-3.5 w-3.5 shrink-0 transition-transform',
                          open && 'rotate-90'
                        )}
                      />
                    </>
                  )}
                </button>
                {!collapsed && open && (
                  <div className="ml-6 mt-0.5 space-y-0.5 border-l pl-3 mb-1">
                    {item.children.map(child => (
                      <button
                        key={child.id}
                        onClick={() => navigate(child.path)}
                        className={cn(
                          'w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors',
                          location.pathname === child.path
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'w-full flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors',
                active
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                collapsed && 'justify-center'
              )}
            >
              {Icon && <Icon className="h-4 w-4 shrink-0" />}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <UserFooter collapsed={collapsed} />
    </aside>
  )
}

export default Sidebar
