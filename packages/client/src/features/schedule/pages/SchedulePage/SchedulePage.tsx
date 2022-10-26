import clsx from 'clsx'

import { Button } from '@/components/Elements/Button'
import { Card } from '@/components/Elements/Card'
import { HCSLogo } from '@/components/Elements/HCSLogo'
import { useTournament } from '@/features/tournament'
import { MousePositionProvider } from '@/providers/MousePositionProvider'

import { ScheduleCalendar } from '../../components/ScheduleCalendar'
import { ScheduleHeader } from '../../components/ScheduleHeader'

import styles from './SchedulePage.module.css'

import Calendar from '~icons/mdi/calendar-outline'
import ListView from '~icons/mdi/view-list-outline'

export const SchedulePage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')
  const { tournament, day } = useTournament()
  return (
    <MousePositionProvider>
      <div className="p-8 h-full w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-flow flex-nowrap items-center">
            <HCSLogo
              className="h-24 w-auto mx-8"
              primary="#ffffffaa"
              background="#eeeeee44"
              outline="transparent"
            />
            <div className="text-[2.5rem] font-super-bold">{tournament?.title}</div>
          </div>
          <div className="h-full flex flex-row flex-nowrap items-end">
            <Button
              className={clsx(
                'border-0 mr-2',
                view === 'list' ? '*themeGradient' : 'bg-gray-700/30'
              )}
              size="sm"
              startIcon={<ListView />}
              onClick={() => setView('list')}
            >
              List View
            </Button>
            <Button
              className={clsx(
                'border-0',
                view === 'calendar' ? '*themeGradient' : 'bg-gray-700/30'
              )}
              size="sm"
              startIcon={<Calendar />}
              onClick={() => setView('calendar')}
            >
              Calendar
            </Button>
          </div>
        </div>
        {tournament ? <ScheduleHeader days={tournament.days} /> : <div>Loading</div>}
        <div className={clsx(styles.content)}>
          {view === 'calendar' &&
            tournament?.days.map((d, index) => {
              if (index === day) {
                return <ScheduleCalendar key={d.date} day={d} streams={tournament.streams} />
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
