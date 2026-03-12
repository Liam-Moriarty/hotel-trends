import { router } from './trpc.js'
import { dashboardRouter } from './routers/dashboard.js'

export const appRouter = router({
  dashboard: dashboardRouter,
})

export type AppRouter = typeof appRouter
