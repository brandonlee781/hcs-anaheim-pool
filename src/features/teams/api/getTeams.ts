import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

import { Team } from '../types'

export async function getTeams() {
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select<string, definitions['teams']>('*')
  const { data: images } = await supabase.storage.from('team-images').list('images')

  if (teamsError) {
    throw new Error(teamsError?.message)
  }

  return teams.map(team => {
    const img = images?.find(i => i.id === team.image)
    const image = img
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/team-images/images/${
          img?.name
        }`
      : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/team-images/images/halo.svg`

    return {
      ...team,
      color: team.color ?? '#8b5cf6',
      secondaryColor: team['secondary-color'] ?? undefined,
      image,
    } as Team
  })
}
