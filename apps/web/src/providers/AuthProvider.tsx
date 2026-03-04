import { createContext, type ReactNode } from 'react'

export interface AuthUser {
  email: string
  name: string
  role: string
  initials: string
}

export interface AuthContextValue {
  user: AuthUser
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  value: AuthContextValue
  children: ReactNode
}

export function AuthProvider({ value, children }: AuthProviderProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
