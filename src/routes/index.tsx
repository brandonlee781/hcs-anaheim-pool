import { createBrowserRouter } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImports'

const { ScheduleRoutes } = lazyImport(() => import('@/features/schedule'), 'ScheduleRoutes')

export const router = createBrowserRouter([
  {
    path: '*',
    element: <ScheduleRoutes />,
  },
  {
    path: '/schedule/*',
    element: <ScheduleRoutes />,
  },
])
