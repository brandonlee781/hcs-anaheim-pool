import { useQuery } from '@tanstack/react-query'

import { Team, useTeams, Region } from '@/features/teams'

import { getTournament } from '../api/getTournaments'
import { TournamentDayContext } from '../providers/TournamentDayProvider'
import { Tournament } from '../types'

const getOffset = (timeZone = 'UTC') => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'longOffset' as const,
  }
  const dateText = Intl.DateTimeFormat([], options).format(new Date())

  // Scraping the numbers we want from the text
  // The default value '+0' is needed when the timezone is missing the number part.
  // Ex. Africa/Bamako --> GMT
  const timezoneString = dateText.split(' ')[1].slice(3) || '+0'

  return timezoneString
}

function getTime(timezone: string) {
  const offset = getOffset(timezone)
  return (date: string, time: string) => `${date}T${time}${offset}`
}

export function useTournament() {
  const { day, setDay } = useContext(TournamentDayContext)
  const {
    data,
    error,
    isLoading: tournamentLoading,
  } = useQuery(['tournament'], () => getTournament())

  const { data: teams, isLoading: teamsLoading } = useTeams()

  const tournament = useMemo<Tournament<Team> | null>(() => {
    if (!data) return null
    const timeFn = getTime(data.timezone || 'UTC')

    const getTeam = (teamName: string): Team => {
      const found = teams?.find(t => t.id === teamName)
      if (found) {
        return {
          name: found.name,
          color: found.color,
          region: (found.region as Region) || null,
          image: found.image || '',
        }
      }
      return {
        name: teamName,
        color: '',
        region: 'NA' as Region.NA,
        image: '',
      }
    }

    return {
      id: data.id,
      title: data.title,
      liquipediaLink: data.liquipediaLink,
      timezone: data.timezone || 'UTC',

      days: data.days.map(d => {
        return {
          ...d,
          events: d.events?.map(ev => {
            return {
              ...ev,
              time: timeFn(d.date, ev.time),
              items: ev.items.map(item => {
                return {
                  ...item,
                  teams: item.teams?.map(t => getTeam(t)),
                }
              }),
            }
          }),
        }
      }),
      // pools:
      //   data.pools?.map(pool => {
      //     return {
      //       ...pool,
      //       teams: pool.teams?.map(t => getTeam(t)),
      //     }
      //   }) || [],
      // participants: data.participants
      //   ? {
      //       ...data.participants,
      //       teams: data.participants?.teams?.map(t => getTeam(t)),
      //     }
      //   : undefined,
    }
  }, [data, teams])

  const isLoading = useMemo(() => {
    let val = false
    if (tournamentLoading) val = true
    if (teamsLoading) val = true
    return val
  }, [tournamentLoading, teamsLoading])

  return {
    day,
    setDay,
    tournament,
    teams,
    error,
    isLoading,
  }
}
