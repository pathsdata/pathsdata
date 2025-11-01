import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const authed = localStorage.getItem('pd-authed') === 'true'
  if (!authed) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />
  }
  return children
}


