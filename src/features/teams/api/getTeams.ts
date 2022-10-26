import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

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
    if (!img) {
      return {
        ...team,
        img: `${
          import.meta.env.VITE_SUPABASE_URL
        }/storage/v1/object/public/team-images/images/halo.png`,
      }
    }
    return {
      ...team,
      image: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/team-images/images/${
        img?.name
      }`,
    }
  })
}
