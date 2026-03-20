import { useState } from 'react'
import type { AdminUser } from '@/interface'

interface UserManagementSectionProps {
  users: AdminUser[]
}

export function UserManagementSection({ users }: UserManagementSectionProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground tabular-nums">
          {users.length} team members
        </span>
        <button className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">
          <span className="text-base leading-none">+</span>
          Invite User
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {['USER', 'ROLE', 'STATUS', 'LAST LOGIN', 'ACTIONS'].map(h => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest h-11"
                  style={{
                    color: 'var(--text-muted)',
                    background: 'var(--surface-container-high)',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className={`hover:bg-muted/50 transition-colors ${
                  i < users.length - 1 ? 'border-b' : ''
                }`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-semibold text-foreground shrink-0">
                      {u.initials}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-foreground">{u.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{u.email}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="inline-flex items-center bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold border border-transparent">
                    {u.role}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background:
                          u.status === 'Active' ? 'var(--status-success)' : 'var(--text-muted)',
                      }}
                    />
                    <span className="text-sm text-foreground">{u.status}</span>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm text-muted-foreground">{u.lastLogin}</td>

                <td className="px-4 py-4 relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === u.id ? null : u.id)}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    ···
                  </button>

                  {menuOpen === u.id && (
                    <div className="absolute right-4 top-12 z-50 bg-popover border border-border rounded-lg shadow-md min-w-[140px] p-1">
                      {['Edit', 'Change Role', 'Remove'].map(action => (
                        <button
                          key={action}
                          onClick={() => setMenuOpen(null)}
                          className={`block w-full text-left px-2 py-1.5 text-sm rounded hover:bg-accent transition-colors ${
                            action === 'Remove' ? 'text-destructive' : 'text-foreground'
                          }`}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(null)} />}
    </>
  )
}
