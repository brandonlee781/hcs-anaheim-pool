import { useQuery } from '@tanstack/react-query'
import { isBefore } from 'date-fns'

import { Team, useTeams, Region } from '@/features/teams'

import { getTournament } from '../api/getTournament'
import { TournamentDayContext } from '../providers/TournamentDayProvider'
import { Tournament } from '../types'

export const getTeam = (teamName: string, teams?: Team[]): Team => {
  const found = teams?.find(t => t.id === teamName)
  if (found) {
    return found
  }
  return {
    id: '',
    name: teamName,
    color: '',
    region: 'NA' as Region.NA,
    image: '',
  }
}

export function useTournament(id?: string) {
  const { day, previousDay, setDay } = useContext(TournamentDayContext)
  const {
    data,
    error,
    isLoading: tournamentLoading,
  } = useQuery(['tournament', id], () => getTournament(id))

  const { data: teams, isLoading: teamsLoading } = useTeams()

  const tournament = useMemo<Tournament | null>(() => {
    if (!data) return null

    return {
      id: data.id,
      liquipediaLink: data.liquipediaLink,
      timezone: data.timezone || 'UTC',
      isPast: data.isPast,

      title: data.title,
      location: data.location,
      prizePool: data.prizePool,
      isOnline: data.isOnline,
      startDate: data.startDate,
      endDate: data.endDate,

      days: data.days
        .sort((a, b) => {
          const aDate = new Date(a.date)
          const bDate = new Date(b.date)
          if (isBefore(aDate, bDate)) return -1
          if (isBefore(bDate, aDate)) return 1
          return 0
        })
        .map(d => {
          return {
            ...d,
            events: d.events?.map(ev => {
              return {
                ...ev,
                streams: ev.streams as string[],
                data: {
                  ...ev.data,
                  teams: ev.data.teams?.map(t => getTeam(t, teams)),
                },
              }
            }),
          }
        }),
      pools:
        data.pools
          ?.sort((a, b) => {
            if (a.key < b.key) return -1
            if (a.key > b.key) return 1
            return 0
          })
          ?.map(pool => {
            return {
              ...pool,
              teams: pool.teams?.map(t => getTeam(t, teams)),
            }
          }) || [],
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
    previousDay,
    setDay,
    tournament,
    teams,
    error,
    isLoading,
  }
}
