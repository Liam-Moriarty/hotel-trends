import { AuthContextValue } from '@/interface'
import { createContext, type ReactNode } from 'react'

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  value: AuthContextValue
  children: ReactNode
}

export function AuthProvider({ value, children }: AuthProviderProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
