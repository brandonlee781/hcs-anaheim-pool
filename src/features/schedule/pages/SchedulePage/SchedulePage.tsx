import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useSessionStorage } from 'react-use'

import { Spinner } from '@/components/Elements/Spinner'
import { Calendar } from '@/features/calendar'
import { Participants, TeamPool } from '@/features/pools'
import { ScheduleTable } from '@/features/table'
import { useTournament } from '@/features/tournament'

import { ScheduleHeader } from '../../components/ScheduleHeader'
import { ScheduleNav } from '../../components/ScheduleNav'

import styles from './SchedulePage.module.css'

export const SchedulePage = () => {
  const { id } = useParams()
  const [view, setView] = useSessionStorage<'calendar' | 'table'>('hcs-schedule-view', 'calendar')
  const { tournament, day, setDay, isLoading } = useTournament(id)

  const includes = tournament?.days[day]?.include || []
  const pools =
    tournament?.pools.filter(pool => {
      return includes?.includes(pool.key)
    }) ?? []

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
    poolEl = pools.map(pool => (
      <TeamPool key={pool.key} poolKey={pool.key} name={pool.name} teams={pool.teams} />
    ))
  } else if (pools.length === 1) {
    poolEl = <Participants {...pools[0]} isTable={view === 'table'} />
  } else {
    poolEl = <span></span>
  }

  return (
    <div className="p-8 h-full w-full mx-auto">
      <ScheduleHeader
        title={tournament.title}
        location={tournament.location}
        prizePool={tournament.prizePool}
        startDate={tournament.startDate}
        endDate={tournament.endDate}
        isOnline={tournament.isOnline}
        view={view}
        setView={setView}
      />
      <ScheduleNav days={tournament.days} current={day} setDay={setDay} />
      <div
        className={clsx('scrollbar-hide', styles.content, view === 'table' && 'with-table')}
        data-pool-count={pools.length}
      >
        <motion.div layout className="content-wrapper lg:max-w-full">
          {view === 'calendar' && <Calendar days={tournament.days} day={day} />}
          {view === 'table' && <ScheduleTable days={tournament.days} day={day} />}
        </motion.div>
        <motion.div layout className={clsx(styles.pools, 'pt-6 lg:ml-2 scrollbar-hide')}>
          {poolEl}
        </motion.div>
      </div>
    </div>
  )
}
