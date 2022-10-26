import clsx from 'clsx'

import { Card } from '@/components/Elements/Card'
import { Spinner } from '@/components/Elements/Spinner'
import { useTournament } from '@/features/tournament'
import { MousePositionProvider } from '@/providers/MousePositionProvider'

import { ScheduleCalendar } from '../../components/ScheduleCalendar'
import { ScheduleHeader } from '../../components/ScheduleHeader'
import { ScheduleNav } from '../../components/ScheduleNav'

import styles from './SchedulePage.module.css'

export const SchedulePage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const { tournament, day, setDay, isLoading } = useTournament()

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

  return (
    <MousePositionProvider>
      <div className="p-8 h-full w-full mx-auto">
        <ScheduleHeader title={tournament.title} view={view} setView={setView} />
        <ScheduleNav days={tournament.days} current={day} setDay={setDay} />
        <div className={clsx(styles.content)}>
          {view === 'calendar' &&
            tournament.days.map((d, index) => {
              if (index === day) {
                return <ScheduleCalendar key={d.date} day={d} />
              }
              return null
            })}
          <div className={clsx(styles.pools, 'pt-6 ml-2')}>
            <Card className="h-full" />
            <Card className="h-full" />
            <Card className="h-full" />
            <Card className="h-full" />
          </div>
        </div>
      </div>
    </MousePositionProvider>
  )
}
