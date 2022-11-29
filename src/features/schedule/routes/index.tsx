import { Route, Routes } from 'react-router-dom'

import { SchedulePage } from '../pages/SchedulePage'

export const ScheduleRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SchedulePage />} />
      <Route path="/:id" element={<SchedulePage />} />
    </Routes>
  )
}
