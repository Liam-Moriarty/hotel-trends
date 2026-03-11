// MOCK — replace with Firestore read from 'hubos-tasks' collection
// Shape conforms to HubOSTaskSchema in @repo/shared/schemas/hubos

import type { HubOSTask } from '@repo/shared'

export const mockTasks: HubOSTask[] = [
  {
    taskId: 'TASK-001',
    roomNumber: '401',
    area: 'Room 401',
    description: 'AC unit not cooling — guest complained on arrival. Unit making rattling noise.',
    status: 'InProgress',
    priority: 'Critical',
    assignedTo: 'James Tran',
    reportedAt: '2026-03-10T14:45:00+11:00',
    resolvedAt: null,
  },
  {
    taskId: 'TASK-002',
    roomNumber: '215',
    area: 'Room 215',
    description: 'Bathroom exhaust fan not working.',
    status: 'Open',
    priority: 'Medium',
    assignedTo: null,
    reportedAt: '2026-03-11T07:30:00+11:00',
    resolvedAt: null,
  },
  {
    taskId: 'TASK-003',
    roomNumber: null,
    area: 'Pool Area',
    description: 'Pool pump pressure low — maintenance inspection required.',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Derek Muller',
    reportedAt: '2026-03-11T06:00:00+11:00',
    resolvedAt: null,
  },
  {
    taskId: 'TASK-004',
    roomNumber: '318',
    area: 'Room 318',
    description: 'TV remote not working — likely dead batteries.',
    status: 'Completed',
    priority: 'Low',
    assignedTo: 'Maria Santos',
    reportedAt: '2026-03-11T08:10:00+11:00',
    resolvedAt: '2026-03-11T08:35:00+11:00',
  },
  {
    taskId: 'TASK-005',
    roomNumber: null,
    area: 'Lobby',
    description: 'Lift 2 door slow to close — logged with service provider, awaiting technician.',
    status: 'Blocked',
    priority: 'High',
    assignedTo: null,
    reportedAt: '2026-03-10T11:00:00+11:00',
    resolvedAt: null,
  },
]
