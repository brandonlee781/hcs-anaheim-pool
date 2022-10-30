import clsx from 'clsx'

import { Spinner } from '@/components/Elements/Spinner'
import { Calendar } from '@/features/calendar'
import { TeamPool, Participants } from '@/features/teams'
import { useTournament } from '@/features/tournament'
import { MousePositionProvider } from '@/providers/MousePositionProvider'

import { ScheduleHeader } from '../../components/ScheduleHeader'
import { ScheduleNav } from '../../components/ScheduleNav'

import styles from './SchedulePage.module.scss'

export const SchedulePage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const { tournament, day, previousDay, setDay, isLoading } = useTournament()

  const pools = useMemo(() => {
    if (!tournament?.days[day]) return []
    const include = tournament.days[day].include
    return (
      tournament.pools?.filter(pool => {
        return include?.includes(pool.key)
      }) ?? []
    )
  }, [tournament, day])

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="h-full w-full flex justify-center pt-40">
        <span className="text-2xl font-bold">No Data</span>
      </div>
    )
  }

  let poolEl: React.ReactNode
  if (pools.length > 1) {
    poolEl = pools.map(pool => {
      return <TeamPool key={pool.key} poolKey={pool.key} name={pool.name} teams={pool.teams} />
    })
  } else {
    poolEl = <Participants {...pools[0]} />
  }

  return (
    <MousePositionProvider>
      <div className="p-8 h-full w-full mx-auto">
        <ScheduleHeader title={tournament.title} view={view} setView={setView} />
        <ScheduleNav days={tournament.days} current={day} setDay={setDay} />
        <div className={clsx(styles.content)} data-pool-count={pools.length}>
          {view === 'calendar' && (
            <Calendar days={tournament.days} day={day} previousDay={previousDay} />
          )}
          <div className={clsx(styles.pools, 'pt-6 ml-2 scrollbar-hide')}>{poolEl}</div>
        </div>
      </div>
    </MousePositionProvider>
  )
}
