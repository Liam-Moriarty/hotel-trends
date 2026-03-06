import { useState } from 'react'
import { Hotel } from 'lucide-react'
import { MOCK_USERS } from '@/mocks'
import { AuthUser } from '@/interface'

interface LoginPageProps {
  onLogin: (user: AuthUser) => void
}

const MOCK_PASSWORD = 'password123'

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setError('')
    setLoading(true)
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && password === MOCK_PASSWORD)
      if (user) {
        onLogin(user)
      } else {
        setError('Invalid email or password.')
      }
      setLoading(false)
    }, 700)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <Hotel className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold text-xl leading-none">HOTEL</div>
              <div className="text-xs text-muted-foreground tracking-widest">TRENDS AI</div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-2 text-center">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="border rounded-xl bg-card shadow-sm p-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>

          {/* Demo hint */}
          <div className="border-t pt-4 space-y-1">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              Demo accounts (password: password123)
            </p>
            {MOCK_USERS.map(u => (
              <button
                key={u.email}
                onClick={() => {
                  setEmail(u.email)
                  setPassword(MOCK_PASSWORD)
                }}
                className="block text-xs text-primary hover:underline"
              >
                {u.email}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
