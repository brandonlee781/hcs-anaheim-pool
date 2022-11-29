import { useQuery } from '@tanstack/react-query'

import { supabase } from '@/lib/supabase'

import { Stream } from '../types'

export async function getStreams(filter?: string[]) {
  let select = supabase.from('streams').select<string, Stream>()

  if (filter?.length) {
    select = select.in('id', filter)
  }

  const { data: streams, error } = await select

  if (error) {
    throw new Error(error.message)
  }

  return streams
}

export function useStreams() {
  const { data, error, isLoading } = useQuery(['streams'], () => getStreams())

  return {
    streams: data,
    error,
    isLoading,
  }
}
