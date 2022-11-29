import { Route, Routes } from 'react-router-dom'

import { AuthContext } from '@/features/auth'

import { TournamentPage } from '../pages/TournamentPage'
import { TournamentsPage } from '../pages/TournamentsPage'

export const TournamentRoutes = () => {
  const { user } = useContext(AuthContext)

  if (!user) return

  return (
    <Routes>
      <Route path="/:id" element={<TournamentPage />} />
      <Route path="" element={<TournamentsPage />} />
    </Routes>
  )
}
