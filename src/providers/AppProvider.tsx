import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HoverTeamProvider } from '@/features/teams'
import { TournamentDayProvider } from '@/features/tournament'

import { ThemeProvider } from './ThemeProvider'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HoverTeamProvider>
        <ThemeProvider>
          <TournamentDayProvider>{children}</TournamentDayProvider>
        </ThemeProvider>
      </HoverTeamProvider>
    </QueryClientProvider>
  )
}
