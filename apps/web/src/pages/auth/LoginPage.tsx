import { useState } from 'react'
import { AuthUser } from '@/interface'
import { HotelTrendsIcon } from '@/components/HotelTrendsIcon'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { app } from '@repo/firebase-config'
import { useNavigate } from 'react-router-dom'

interface LoginPageProps {
  onLogin: (user: AuthUser) => void
}

const getFirebaseAuthError = (err: unknown): string => {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code
    if (
      code === 'auth/user-not-found' ||
      code === 'auth/wrong-password' ||
      code === 'auth/invalid-credential'
    ) {
      return 'Invalid email or password.'
    }
    if (code === 'auth/too-many-requests') {
      return 'Too many attempts. Please try again later.'
    }
    if (code === 'auth/user-disabled') {
      return 'This account has been disabled.'
    }
  }
  return 'Something went wrong. Please try again.'
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate() // ✅ inside the component
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      const auth = getAuth(app)
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUser = credential.user
      const user: AuthUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName: firebaseUser.displayName ?? firebaseUser.email ?? '',
      }
      onLogin(user)
    } catch (err: unknown) {
      setError(getFirebaseAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <HotelTrendsIcon size={56} />
          <div className="text-center">
            <div
              className="font-bold text-xl leading-none"
              style={{ color: 'var(--text-primary)' }}
            >
              Hotel Trends
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Sign in to your account
            </p>
          </div>
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

          {/* Sign up link */}
          <div className="border-t pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-primary hover:underline font-medium"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
