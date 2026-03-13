import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@repo/functions/router'

export const trpc = createTRPCReact<AppRouter>()

/** Read the mock auth user stored by App.tsx so we can send a Bearer token on every request. */
function getAuthToken(): string | undefined {
  try {
    const stored = localStorage.getItem('auth_user')
    if (!stored) return undefined
    const user = JSON.parse(stored) as { email?: string }
    return user.email ?? undefined
  } catch {
    return undefined
  }
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL || '/api/trpc',
      headers() {
        const token = getAuthToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
      },
    }),
  ],
})
