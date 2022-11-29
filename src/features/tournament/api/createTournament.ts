import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { supabase } from '@/lib/supabase'

export type CreatePayload = {
  title: string
  startDate: Date
  endDate: Date
}

export async function createTournament(payload: CreatePayload) {
  const { data, error } = await supabase.from('tournament').insert(payload).select('id')
  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useCreateTournament() {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (payload: CreatePayload) => createTournament(payload),
    onSuccess(data) {
      if (data.length) {
        const [tournament] = data
        navigate(`/tournament/${tournament.id}`)
      }
    },
  })
}
