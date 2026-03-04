import { useState } from 'react'
import { AuthContext, type AuthUser } from './providers/AuthProvider'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'

const STORAGE_KEY = 'auth_user'

const App = () => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as AuthUser) : null
    } catch {
      return null
    }
  })

  const handleLogin = (u: AuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  if (!user) return <LoginPage onLogin={handleLogin} />

  return (
    <AuthContext.Provider value={{ user, logout }}>
      <AppLayout />
    </AuthContext.Provider>
  )
}

export default App
