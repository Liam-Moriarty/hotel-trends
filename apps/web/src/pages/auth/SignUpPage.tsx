import { useState } from 'react'
import { Hotel } from 'lucide-react'
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth'
import { app } from '@repo/firebase-config'
import { AuthUser } from '@/interface'
import { useNavigate } from 'react-router-dom'

interface SignUpPageProps {
  onSignUp: (user: AuthUser) => void
}

const getFirebaseAuthError = (err: unknown): string => {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code
    if (code === 'auth/email-already-in-use') return 'An account with this email already exists.'
    if (code === 'auth/invalid-email') return 'Please enter a valid email address.'
    if (code === 'auth/weak-password') return 'Password must be at least 6 characters.'
  }
  return 'Something went wrong. Please try again.'
}

const SignUpPage = ({ onSignUp }: SignUpPageProps) => {
  const navigate = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (!displayName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      const auth = getAuth(app)
      const credential = await createUserWithEmailAndPassword(auth, email, password)

      try {
        await updateProfile(credential.user, { displayName: displayName.trim() })
      } catch {
        await credential.user.delete()
        throw new Error('Signup failed due to a connection issue. Please try again.')
      }

      const user: AuthUser = {
        uid: credential.user.uid,
        email: credential.user.email ?? '',
        displayName: displayName.trim(),
      }
      onSignUp(user)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : getFirebaseAuthError(err))
    } finally {
      setLoading(false)
    }
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
          <p className="text-muted-foreground text-sm mt-2 text-center">Create your account</p>
        </div>

        {/* Card */}
        <div className="border rounded-xl bg-card shadow-sm p-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
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
                className="w-full border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </div>

          {/* Login link */}
          <div className="border-t pt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
