import { Navigate, Outlet } from 'react-router-dom'

type ProtectedRouteProps = {
  isAllowed: boolean
  redirectPath?: string
  children?: JSX.Element
}
export const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
