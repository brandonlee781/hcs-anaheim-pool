import clsx from 'clsx'

import { Button } from '@/components/Elements/Button'
import { HCSLogo } from '@/components/Elements/HCSLogo'

import Calendar from '~icons/mdi/calendar-outline'
import ListView from '~icons/mdi/view-list-outline'

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
          className="h-24 w-auto mx-8"
          primary="#ffffffaa"
          background="#eeeeee44"
          outline="transparent"
        />
        <div className="text-[2.5rem] font-super-bold">{title}</div>
      </div>
      <div className="h-full flex flex-row flex-nowrap items-end">
        <Button
          className={clsx('border-0 mr-2', view === 'list' ? '*themeGradient' : 'bg-gray-700/30')}
          size="sm"
          startIcon={<ListView />}
          onClick={() => setView('list')}
        >
          List View
        </Button>
        <Button
          className={clsx('border-0', view === 'calendar' ? '*themeGradient' : 'bg-gray-700/30')}
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
