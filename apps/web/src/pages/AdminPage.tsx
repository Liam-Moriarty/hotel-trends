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

// Shadcn light theme tokens
const theme = {
  background: '#ffffff',
  foreground: '#09090b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  border: '#e4e4e7',
  primary: '#18181b',
  primaryForeground: '#fafafa',
  secondary: '#f4f4f5',
  secondaryForeground: '#18181b',
  accent: '#f4f4f5',
  accentForeground: '#18181b',
  destructive: '#ef4444',
  ring: '#18181b',
  radius: '0.5rem',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('user-management')
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        color: theme.foreground,
        fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
        fontSize: '0.875rem',
        padding: '2rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.025em',
              color: theme.foreground,
            }}
          >
            Admin Settings
          </h1>
          <p style={{ color: theme.mutedForeground, fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Manage users, roles, API keys, audit logs &amp; billing
          </p>
        </div>

        {/* Tabs — Shadcn style */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: theme.muted,
            borderRadius: theme.radius,
            padding: '0.25rem',
            gap: '0.125rem',
            marginBottom: '1.5rem',
          }}
        >
          {tabs.map(t => {
            const isActive = activeTab === t.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  background: isActive ? theme.background : 'transparent',
                  color: isActive ? theme.foreground : theme.mutedForeground,
                  boxShadow: isActive
                    ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
                    : 'none',
                  lineHeight: '1.25rem',
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {/* User Management Tab Content */}
        {activeTab === 'user-management' && (
          <>
            {/* Toolbar row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '0.875rem', color: theme.mutedForeground }}>
                {users.length} team members
              </span>
              {/* Shadcn default Button */}
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: theme.primary,
                  color: theme.primaryForeground,
                  border: 'none',
                  borderRadius: theme.radius,
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  lineHeight: '1.25rem',
                  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span>
                Invite User
              </button>
            </div>

            {/* Table — Shadcn style */}
            <div
              style={{
                border: `1px solid ${theme.border}`,
                borderRadius: theme.radius,
                overflow: 'hidden',
                background: theme.background,
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr
                    style={{
                      borderBottom: `1px solid ${theme.border}`,
                      background: theme.background,
                    }}
                  >
                    {['USER', 'ROLE', 'STATUS', 'LAST LOGIN', 'ACTIONS'].map(h => (
                      <th
                        key={h}
                        style={{
                          padding: '0.75rem 1rem',
                          textAlign: 'left',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: theme.mutedForeground,
                          letterSpacing: '0.05em',
                          height: '2.75rem',
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
                      style={{
                        borderBottom: i < users.length - 1 ? `1px solid ${theme.border}` : 'none',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = theme.muted)}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {/* User Cell */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {/* Avatar */}
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: theme.muted,
                              border: `1px solid ${theme.border}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              color: theme.foreground,
                              flexShrink: 0,
                            }}
                          >
                            {u.initials}
                          </div>
                          <div>
                            <div
                              style={{
                                fontWeight: 500,
                                fontSize: '0.875rem',
                                color: theme.foreground,
                              }}
                            >
                              {u.name}
                            </div>
                            <div
                              style={{
                                fontSize: '0.75rem',
                                color: theme.mutedForeground,
                                marginTop: 2,
                              }}
                            >
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role — Shadcn Badge (secondary) */}
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            background: theme.secondary,
                            color: theme.secondaryForeground,
                            borderRadius: '9999px',
                            padding: '0.125rem 0.625rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            lineHeight: '1.25rem',
                            border: `1px solid transparent`,
                          }}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: u.status === 'Active' ? '#22c55e' : theme.mutedForeground,
                              display: 'inline-block',
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: '0.875rem', color: theme.foreground }}>
                            {u.status}
                          </span>
                        </div>
                      </td>

                      {/* Last Login */}
                      <td
                        style={{
                          padding: '1rem',
                          fontSize: '0.875rem',
                          color: theme.mutedForeground,
                        }}
                      >
                        {u.lastLogin}
                      </td>

                      {/* Actions — Shadcn ghost icon button + dropdown */}
                      <td style={{ padding: '1rem', position: 'relative' }}>
                        <button
                          onClick={() => setMenuOpen(menuOpen === u.id ? null : u.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 32,
                            height: 32,
                            borderRadius: theme.radius,
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: theme.mutedForeground,
                            fontSize: '1rem',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = theme.accent)}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          ···
                        </button>

                        {menuOpen === u.id && (
                          <div
                            style={{
                              position: 'absolute',
                              right: '1rem',
                              top: '3rem',
                              zIndex: 50,
                              background: theme.background,
                              border: `1px solid ${theme.border}`,
                              borderRadius: theme.radius,
                              minWidth: 140,
                              boxShadow:
                                '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                              padding: '0.25rem',
                            }}
                          >
                            {['Edit', 'Change Role', 'Remove'].map(action => (
                              <button
                                key={action}
                                onClick={() => setMenuOpen(null)}
                                style={{
                                  display: 'block',
                                  width: '100%',
                                  textAlign: 'left',
                                  background: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  padding: '0.375rem 0.5rem',
                                  fontSize: '0.875rem',
                                  borderRadius: '0.25rem',
                                  color: action === 'Remove' ? theme.destructive : theme.foreground,
                                }}
                                onMouseEnter={e =>
                                  (e.currentTarget.style.background = theme.accent)
                                }
                                onMouseLeave={e =>
                                  (e.currentTarget.style.background = 'transparent')
                                }
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
          <p style={{ color: theme.mutedForeground, marginTop: '2rem' }}>
            {tabs.find(t => t.id === activeTab)?.label} — coming soon.
          </p>
        )}
      </div>

      {/* Overlay to close dropdown */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 40 }}
          onClick={() => setMenuOpen(null)}
        />
      )}
    </div>
  )
}
