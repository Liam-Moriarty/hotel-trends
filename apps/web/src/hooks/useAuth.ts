import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'
import type { AuthContextValue } from '@/interface'

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider (AuthContext.Provider)')
  }
  return ctx
}
