import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  lastLogin: string
  initials: string
}

const users: User[] = [
  {
    id: '1',
    name: 'James Wilson',
    email: 'j.wilson@grandazure.com',
    role: 'Revenue Manager',
    status: 'Active',
    lastLogin: '2 min ago',
    initials: 'JW',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 's.chen@grandazure.com',
    role: 'Executive',
    status: 'Active',
    lastLogin: '1h ago',
    initials: 'SC',
  },
  {
    id: '3',
    name: 'Mark Okafor',
    email: 'm.okafor@grandazure.com',
    role: 'Operations Head',
    status: 'Active',
    lastLogin: '3h ago',
    initials: 'MO',
  },
  {
    id: '4',
    name: 'Lisa Park',
    email: 'l.park@grandazure.com',
    role: 'Marketing Manager',
    status: 'Active',
    lastLogin: 'Yesterday',
    initials: 'LP',
  },
  {
    id: '5',
    name: 'Tom Bradley',
    email: 't.bradley@grandazure.com',
    role: 'Front Desk Lead',
    status: 'Inactive',
    lastLogin: '5 days ago',
    initials: 'TB',
  },
]

const tabs = [
  { id: 'user-management', label: 'User Management' },
  { id: 'role-permissions', label: 'Role Permissions' },
  { id: 'api-keys', label: 'API Keys' },
  { id: 'audit-log', label: 'Audit Log' },
  { id: 'billing', label: 'Billing' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('user-management')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background text-foreground p-8 text-sm">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage users, roles, API keys, audit logs &amp; billing
          </p>
        </div>

        {/* Tabs */}
        <div className="inline-flex items-center bg-muted rounded-lg p-1 gap-0.5 mb-6">
          {tabs.map(t => {
            const isActive = activeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* User Management Tab */}
        {activeTab === 'user-management' && (
          <>
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">{users.length} team members</span>
              <button className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium shadow-sm hover:bg-primary/90 transition-colors">
                <span className="text-base leading-none">+</span>
                Invite User
              </button>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden bg-card">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-card">
                    {['USER', 'ROLE', 'STATUS', 'LAST LOGIN', 'ACTIONS'].map(h => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-medium text-muted-foreground tracking-widest h-11"
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
                      {/* User Cell */}
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

                      {/* Role Badge */}
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5 text-xs font-semibold border border-transparent">
                          {u.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              u.status === 'Active' ? 'bg-green-500' : 'bg-muted-foreground'
                            }`}
                          />
                          <span className="text-sm text-foreground">{u.status}</span>
                        </div>
                      </td>

                      {/* Last Login */}
                      <td className="px-4 py-4 text-sm text-muted-foreground">{u.lastLogin}</td>

                      {/* Actions */}
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
          </>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== 'user-management' && (
          <p className="text-muted-foreground mt-8">
            {tabs.find(t => t.id === activeTab)?.label} — coming soon.
          </p>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {menuOpen && <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(null)} />}
    </div>
  )
}
