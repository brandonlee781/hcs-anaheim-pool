import clsx from 'clsx'

import { Button } from '@/components/Elements/Button'
import { HCSLogo } from '@/components/Elements/HCSLogo'

import Calendar from '~icons/mdi/calendar-outline'
import TableView from '~icons/mdi/table'

type ScheduleHeaderProps = {
  title: string
  view: 'calendar' | 'list'
  setView: (val: 'calendar' | 'list') => void
}
export const ScheduleHeader = ({ title, view, setView }: ScheduleHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-flow flex-nowrap items-center">
        <HCSLogo
          className="light:hidden h-24 w-auto mx-8"
          primary="#ffffffcc"
          background="#ffffff99"
          outline="transparent"
        />
        <HCSLogo
          className="dark:hidden h-24 w-auto mx-8"
          primary="#000000aa"
          background="#33333344"
          outline="transparent"
        />
        <div className="text-[2.5rem] font-super-bold">{title}</div>
      </div>
      <div className="h-full flex flex-col lg:flex-row flex-nowrap items-end">
        <Button
          className={clsx(
            'border-0 max-w-30 mb-2 lg:(mr-2 mb-0 max-w-full) text-white',
            view === 'list' ? '*themeGradient' : 'bg-gray-700/30 light:bg-gray-700/70'
          )}
          size="sm"
          startIcon={<TableView />}
          onClick={() => setView('list')}
        >
          Table View
        </Button>
        <Button
          className={clsx(
            'border-0 max-w-30 text-white',
            view === 'calendar' ? '*themeGradient' : 'bg-gray-700/30 light:bg-gray-700/70'
          )}
          size="sm"
          startIcon={<Calendar />}
          onClick={() => setView('calendar')}
        >
          Calendar
        </Button>
      </div>
    </div>
  )
}
