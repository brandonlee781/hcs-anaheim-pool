import teams from '../teams.json'
import type { Team } from '../types'

export const getTeam = (name: string) => {
  if (!teams[name as keyof typeof teams])
    throw new Error(`Invalid team name ${name}`)
  return teams[name as keyof typeof teams] as Team
}
