import { supabase } from '@/lib/supabase'
import { definitions } from '@/types/database'

const ONE_WEEK = 60 * 60 * 24 * 7

export async function getTeams() {
  const { data: teams, error: teamsError } = await supabase
    .from('teams')
    .select<string, definitions['teams']>('*')
  const images = await supabase.storage
    .from('team-images')
    .list('images')
    .then(({ data }) => {
      if (!data?.length) return []
      return supabase.storage
        .from('team-images')
        .createSignedUrls(data.map(img => `images/${img.name}`).filter(Boolean), ONE_WEEK)
        .then(({ data: urls }) => {
          return data.map(teamImage => {
            const foundUrl = urls?.find(url => teamImage.name === url.path?.replace('images/', ''))
            return {
              id: teamImage.id,
              image: foundUrl?.signedUrl,
            }
          })
        })
    })

  if (teamsError) {
    throw new Error(teamsError?.message)
  }

  return teams.map(team => {
    const img = images.find(i => i.id === team.image)
    return {
      ...team,
      image: img?.image,
    }
  })
}
