import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'

export async function getAllTournaments() {
  const { data, error } = await supabase
    .from('tournament')
    .select<string, { id: string; title: string }>(`id, title`)
    .order('endDate', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export function useAllTournaments() {
  const { data, error, isLoading } = useQuery(['tournaments'], () => getAllTournaments())
  return {
    tournaments: data,
    error,
    isLoading,
  }
}
