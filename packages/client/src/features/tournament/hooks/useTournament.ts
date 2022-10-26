import { Tournament } from 'api-server/src/features/Tournament'

import { Team, teams, getTeam } from '@/features/teams'

import getTournament from '../api/getTournaments'
import { TournamentDayContext } from '../providers/TournamentDayProvider'

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
  return (date: string, time: string) => `${date}T${time}:00${offset}`
}

export function useTournament() {
  const { day, setDay } = useContext(TournamentDayContext)
  const [tournamentName] = useState('hcs/2022/worlds')
  const { data, error, isLoading } = getTournament(tournamentName)

  const tournament = useMemo<Tournament<Team> | null>(() => {
    if (!data) return null
    const timeFn = getTime(data.timezone)

    return {
      id: data.id,
      title: data.title,
      link: data.link,
      timezone: data.timezone,
      streams: data.streams,

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
      pools:
        data.pools?.map(pool => {
          return {
            ...pool,
            teams: pool.teams.map(team => getTeam(team)),
          }
        }) || [],
      participants: data.participants
        ? {
            ...data.participants,
            teams: data.participants?.teams.map(team => getTeam(team)),
          }
        : undefined,
    }
  }, [data])

  return {
    day,
    setDay,
    tournament,
    teams,
    error,
    isLoading,
  }
}
