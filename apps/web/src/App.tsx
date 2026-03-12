import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import { AuthUser } from './interface'
import { AuthContext } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { QueryProvider } from './providers/QueryProvider'

// Pages...
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/views/DashboardPage'
import RevenuePage from './pages/views/RevenuePage'
import AiPage from './pages/views/AiPage'
import GuestPage from './pages/views/GuestPage'
import OperationPage from './pages/views/OperationPage'
import MarketingPage from './pages/views/MarketingPage'
import ExternalPage from './pages/views/ExternalPage'
import DataPage from './pages/views/DataPage'
import AdminPage from './pages/views/AdminPage'
import NotFoundPage from './pages/views/NotFoundPage'

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

  if (!user)
    return (
      <QueryProvider>
        <ThemeProvider>
          <LoginPage onLogin={handleLogin} />
        </ThemeProvider>
      </QueryProvider>
    )

  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthContext.Provider value={{ user, logout }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="revenue" element={<RevenuePage />} />
                <Route path="ai" element={<AiPage />} />
                <Route path="guest" element={<GuestPage />} />
                <Route path="operations" element={<OperationPage />} />
                <Route path="marketing" element={<MarketingPage />} />
                <Route path="external" element={<ExternalPage />} />
                <Route path="data" element={<DataPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default App
