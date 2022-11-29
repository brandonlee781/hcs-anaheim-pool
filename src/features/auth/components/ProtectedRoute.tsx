import { Outlet, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  if (!isAllowed) {
    return navigate(redirectPath)
  }

  return children ? children : <Outlet />
}
