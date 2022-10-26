import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from 'api-server/src/router/app'

export const trpc = createTRPCReact<AppRouter>()
