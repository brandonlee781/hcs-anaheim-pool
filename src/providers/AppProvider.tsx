import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { HoverTeamProvider } from '@/features/teams'
import { TournamentDayProvider } from '@/features/tournament'
import { trpc } from '@/lib/trpc'

import { ThemeProvider } from './ThemeProvider'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HoverTeamProvider>
          <ThemeProvider>
            <TournamentDayProvider>{children}</TournamentDayProvider>
          </ThemeProvider>
        </HoverTeamProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
