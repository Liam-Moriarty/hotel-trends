import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@repo/firebase-config'
import { AuthContext } from './providers/AuthProvider'
import { AuthUser } from './interface'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './layouts/AppLayout'

// Pages
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import DashboardPage from './pages/views/DashboardPage'
import RevenuePage from './pages/views/RevenuePage'
import AiPage from './pages/views/AiPage'
import GuestPage from './pages/views/GuestPage'
import OperationPage from './pages/views/OperationPage'
import MarketingPage from './pages/views/MarketingPage'
import ExternalPage from './pages/views/ExternalPage'
import DataPage from './pages/views/DataPage'
import AdminPage from './pages/views/AdminPage'
import AlertsPage from './pages/views/AlertsPage'
import NotFoundPage from './pages/views/NotFoundPage'

const MOCK_USER: AuthUser | null =
  import.meta.env.VITE_MOCK_AUTH === 'true'
    ? { uid: 'mock-uid', email: 'user.staff@hotel.com', displayName: 'Staff User' }
    : null

const App = () => {
  const [user, setUser] = useState<AuthUser | null>(MOCK_USER)
  const [authLoading, setAuthLoading] = useState(!MOCK_USER)

  useEffect(() => {
    if (MOCK_USER) return
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(
        firebaseUser
          ? {
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              displayName: firebaseUser.displayName ?? firebaseUser.email ?? '',
            }
          : null
      )
      setAuthLoading(false)
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    const auth = getAuth(app)
    await auth.signOut()
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading…</span>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      <Routes>
        {/* Public routes — redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" replace /> : <SignUpPage onSignUp={setUser} />}
        />

        {/* Protected routes — redirect to /login if not logged in */}
        <Route element={<ProtectedRoute user={user} />}>
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
            <Route path="alerts" element={<AlertsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
