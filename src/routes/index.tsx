import { createBrowserRouter } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImports'

const { ScheduleRoutes } = lazyImport(() => import('@/features/schedule'), 'ScheduleRoutes')
const { LoginRoutes } = lazyImport(() => import('@/features/auth'), 'LoginRoutes')

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
])
