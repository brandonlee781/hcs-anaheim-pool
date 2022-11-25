import clsx from 'clsx'
import { format, parse } from 'date-fns'

import { Button } from '@/components/Elements/Button'
import { HCSLogo } from '@/components/Elements/HCSLogo'

import Calendar from '~icons/mdi/calendar-outline'
import CalendarStar from '~icons/mdi/calendar-star'
import Earth from '~icons/mdi/earth'
import Location from '~icons/mdi/map-marker'
import TableView from '~icons/mdi/table'
import Trophy from '~icons/mdi/trophy'

type ScheduleHeaderProps = {
  title: string
  location?: string
  prizePool?: number
  isOnline?: boolean
  startDate: string
  endDate: string
  view: 'calendar' | 'table'
  setView: (val: 'calendar' | 'table') => void
}
export const ScheduleHeader = ({
  title,
  location,
  prizePool = 0,
  isOnline,
  startDate,
  endDate,
  view,
  setView,
}: ScheduleHeaderProps) => {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const formatStart = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'MMM dd') : ''
  const formatEnd = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'MMM dd') : ''
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-flow flex-nowrap items-center">
        <HCSLogo
          className="hidden dark:inline-block h-24 w-auto mx-8"
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
        <div className="flex flex-col w-full">
          <div className="col-span-full text-[2.5rem] font-super-bold w-full">{title}</div>
          <div className="flex flex-nowrap items-center w-full">
            {!isOnline ? (
              <div className="flex text-sm items-center mr-4">
                <Location className="mr-1" />
                <span>{location}</span>
              </div>
            ) : (
              <div className="flex text-sm items-center mr-4">
                <Earth className="mr-1" />
                Online
              </div>
            )}

            <div className="flex text-sm items-center mr-4">
              <Trophy className="mr-1" />
              <span>{formatter.format(prizePool)}</span>
            </div>
            <div className="flex text-sm items-center mr-4">
              <CalendarStar className="mr-1" />
              <span>
                {formatStart} - {formatEnd}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full flex flex-col lg:flex-row flex-nowrap items-end">
        <Button
          className={clsx(
            'border-0 max-w-30 mb-2 lg:mr-2 lg:mb-0 lg:max-w-full text-white',
            view === 'table' ? 'themeGradient' : 'dark:bg-gray-700/30 bg-gray-700/70'
          )}
          size="sm"
          startIcon={<TableView />}
          onClick={() => setView('table')}
        >
          Table View
        </Button>
        <Button
          className={clsx(
            'border-0 max-w-30 text-white',
            view === 'calendar' ? 'themeGradient' : 'dark:bg-gray-700/30 bg-gray-700/70'
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
