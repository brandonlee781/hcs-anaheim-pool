import { Route, Routes } from 'react-router-dom'

import { LoginPage } from '../pages/LoginPage'

export const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
