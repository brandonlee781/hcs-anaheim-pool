import { Route, Routes } from 'react-router-dom'

import { AuthContext, ProtectedRoute } from '@/features/auth'

import { TournamentPage } from '../pages/TournamentPage'

export const TournamentRoutes = () => {
  const { user } = useContext(AuthContext)
  return (
    <Routes>
      <Route
        path="/:id"
        element={
          <ProtectedRoute isAllowed={!!user}>
            <TournamentPage user={user!} />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
