import { supabase } from '@/lib/supabase'

import { Tournament } from '../types'

export async function updateTournament(id: string, payload: Partial<Tournament>) {
  const { error } = await supabase.from('tournament').update(payload).eq('id', id).select()
  if (error) {
    throw new Error(error.message)
  }
}
