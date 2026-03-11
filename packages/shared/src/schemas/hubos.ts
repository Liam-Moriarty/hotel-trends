import { z } from 'zod'

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export const RoomStatusSchema = z.enum(['Clean', 'Dirty', 'InProgress', 'Inspecting', 'Blocked'])

export const TaskStatusSchema = z.enum(['Open', 'InProgress', 'Completed', 'Blocked'])

export const TaskPrioritySchema = z.enum(['Low', 'Medium', 'High', 'Critical'])

export const DepartmentSchema = z.enum([
  'FrontDesk',
  'Housekeeping',
  'FBRestaurant',
  'FBBar',
  'SpaWellness',
  'Maintenance',
  'Concierge',
])

export const StaffingStatusSchema = z.enum(['Fully Staffed', 'Understaffed', 'Overstaffed'])

// ---------------------------------------------------------------------------
// Room Status
// Hub OS tracks room-level housekeeping state, synced from Opera Cloud
// ---------------------------------------------------------------------------

export const HubOSRoomSchema = z.object({
  roomNumber: z.string(), // e.g. "101", "402"
  floor: z.number().int(),
  roomType: z.string(), // e.g. "DLX", "STD", "STE"
  status: RoomStatusSchema,
  assignedAttendant: z.string().nullable(),
  guestName: z.string().nullable(), // null if vacant
  checkoutTime: z.string().nullable(), // ISO time string, null if not departing today
  notes: z.string().nullable(),
  lastUpdated: z.string(), // ISO datetime
})

// ---------------------------------------------------------------------------
// Maintenance Tasks
// Hub OS tracks open maintenance requests and their resolution state
// ---------------------------------------------------------------------------

export const HubOSTaskSchema = z.object({
  taskId: z.string(),
  roomNumber: z.string().nullable(), // null if common area task
  area: z.string(), // e.g. "Room 302", "Pool Area", "Lobby"
  description: z.string(),
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  assignedTo: z.string().nullable(),
  reportedAt: z.string(), // ISO datetime
  resolvedAt: z.string().nullable(), // null if unresolved
})

// ---------------------------------------------------------------------------
// Labor Roster
// Hub OS tracks scheduled vs actual staff per department per shift
// ---------------------------------------------------------------------------

export const HubOSRosterEntrySchema = z.object({
  department: DepartmentSchema,
  shiftStart: z.string(), // e.g. "06:00"
  shiftEnd: z.string(), // e.g. "14:00"
  scheduled: z.number().int(),
  actual: z.number().int(),
  overtimeHours: z.number().min(0),
  staffingStatus: StaffingStatusSchema,
})

// ---------------------------------------------------------------------------
// Derived types
// ---------------------------------------------------------------------------

export type RoomStatus = z.infer<typeof RoomStatusSchema>
export type TaskStatus = z.infer<typeof TaskStatusSchema>
export type TaskPriority = z.infer<typeof TaskPrioritySchema>
export type Department = z.infer<typeof DepartmentSchema>
export type StaffingStatus = z.infer<typeof StaffingStatusSchema>
export type HubOSRoom = z.infer<typeof HubOSRoomSchema>
export type HubOSTask = z.infer<typeof HubOSTaskSchema>
export type HubOSRosterEntry = z.infer<typeof HubOSRosterEntrySchema>
