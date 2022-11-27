import { useMutation } from '@tanstack/react-query'

import { updateTournament } from '../api/updateTournament'
import { Tournament } from '../types'

type TournamentMutation = {
  id: string
  payload: Partial<Tournament>
}

export function useUpdateTournament() {
  return useMutation({
    mutationFn: ({ id, payload }: TournamentMutation) => updateTournament(id, payload),
  })
}
