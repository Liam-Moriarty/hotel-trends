import { Navigate, Outlet } from 'react-router-dom'
import { AuthUser } from '../interface'

interface ProtectedRouteProps {
  user: AuthUser | null
}

const ProtectedRoute = ({ user }: ProtectedRouteProps) => {
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

export default ProtectedRoute
