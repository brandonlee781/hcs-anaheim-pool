import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Spinner } from '@/components/Elements/Spinner'
import { Calendar } from '@/features/calendar'
import { TeamPool, Participants } from '@/features/teams'
import { useTournament } from '@/features/tournament'

import { ScheduleHeader } from '../../components/ScheduleHeader'
import { ScheduleNav } from '../../components/ScheduleNav'

import styles from './SchedulePage.module.scss'

export const SchedulePage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const { tournament, day, setDay, isLoading } = useTournament()

  const includes = tournament?.days[day].include
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
  } else {
    poolEl = <Participants {...pools[0]} />
  }

  return (
    <div className="p-8 h-full w-full mx-auto">
      <ScheduleHeader title={tournament.title} view={view} setView={setView} />
      <ScheduleNav days={tournament.days} current={day} setDay={setDay} />
      <div className={clsx(styles.content)} data-pool-count={pools.length}>
        <motion.div layout>
          {view === 'calendar' && <Calendar days={tournament.days} day={day} />}
        </motion.div>
        <motion.div layout className={clsx(styles.pools, 'pt-6 ml-2 scrollbar-hide')}>
          {poolEl}
        </motion.div>
      </div>
    </div>
  )
}
