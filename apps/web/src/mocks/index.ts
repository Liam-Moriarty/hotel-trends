import type { AuthUser } from '@/providers/AuthProvider'

export const MOCK_USERS: AuthUser[] = [
  {
    email: 'james.wilson@grandazure.com',
    name: 'James Wilson',
    role: 'Revenue Manager',
    initials: 'JW',
  },
  {
    email: 'sarah.chen@grandazure.com',
    name: 'Sarah Chen',
    role: 'General Manager',
    initials: 'SC',
  },
  {
    email: 'mike.tran@grandazure.com',
    name: 'Mike Tran',
    role: 'Operations Manager',
    initials: 'MT',
  },
]
