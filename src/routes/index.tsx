import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImports'

const { ScheduleRoutes } = lazyImport(() => import('@/features/schedule'), 'ScheduleRoutes')
const { LoginRoutes } = lazyImport(() => import('@/features/auth'), 'LoginRoutes')
const { TournamentRoutes } = lazyImport(() => import('@/features/tournament'), 'TournamentRoutes')

export const router = createBrowserRouter([
  {
    path: '*',
    element: <ScheduleRoutes />,
  },
  {
    path: '/schedule/*',
    element: <ScheduleRoutes />,
  },
  {
    path: '/auth/*',
    element: <LoginRoutes />,
  },
  {
    path: '/tournament/*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TournamentRoutes />
      </Suspense>
    ),
  },
])
