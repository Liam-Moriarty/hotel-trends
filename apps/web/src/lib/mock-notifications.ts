export type NotificationChannel = 'email' | 'text' | 'whatsapp' | 'system'
export type NotificationType = 'success' | 'info' | 'warning' | 'error' | 'system'
export type NotificationDate = 'today' | 'yesterday'

export interface Notification {
  id: string
  channel: NotificationChannel
  type: NotificationType
  title: string
  description: string
  time: string
  date: NotificationDate
  read: boolean
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    channel: 'system',
    type: 'success',
    title: 'New User Registered',
    description: 'User alex.smith@example.com completed sign-up and verified their email address.',
    time: '10:42 AM',
    date: 'today',
    read: false,
  },
  {
    id: '2',
    channel: 'system',
    type: 'success',
    title: 'Payment Processed',
    description: 'Order #84920 has been successfully billed. Amount: $299.00 USD.',
    time: '09:15 AM',
    date: 'today',
    read: false,
  },
  {
    id: '3',
    channel: 'system',
    type: 'system',
    title: 'Server Update',
    description:
      'Automatic security patch applied to US-EAST-1 main cluster. No downtime reported.',
    time: '04:30 AM',
    date: 'today',
    read: false,
  },
  {
    id: '4',
    channel: 'whatsapp',
    type: 'info',
    title: 'WhatsApp Campaign Sent',
    description: 'Summer Sale promotion sent to 4,502 recipients via WhatsApp Business API.',
    time: 'Yesterday, 11:20 PM',
    date: 'yesterday',
    read: true,
  },
  {
    id: '5',
    channel: 'system',
    type: 'error',
    title: 'Unauthorized Login Attempt',
    description:
      'Multiple failed password attempts detected for user admin_root from IP 192.168.1.104.',
    time: 'Yesterday, 08:45 PM',
    date: 'yesterday',
    read: true,
  },
  {
    id: '6',
    channel: 'email',
    type: 'info',
    title: 'Weekly Report Emailed',
    description: 'System performance and sales report delivered to stakeholders (5 recipients).',
    time: 'Yesterday, 10:00 AM',
    date: 'yesterday',
    read: true,
  },
]
