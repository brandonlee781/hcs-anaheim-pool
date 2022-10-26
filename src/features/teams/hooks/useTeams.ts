import { useQuery } from '@tanstack/react-query'

import { getTeams } from '../api/getTeams'

export function useTeams() {
  return useQuery(['teams'], getTeams)
}
