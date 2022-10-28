import clsx from 'clsx'
import { HtmlHTMLAttributes } from 'react'

import { Stream } from '@/features/tournament'

import { formatOptionalMinutes } from '../../utils/formatOptionalMinutes'
import { getPosition, INCREMENT } from '../ScheduleCalendar/ScheduleCalendar'
import { ScheduleCalendarGrid } from '../ScheduleCalendarGrid/ScheduleCalendarGrid'

type ScheduleCalendarBackgroundGridProps = {
  rows: number
  timeslots: Date[]
  streams?: Stream[]
} & HtmlHTMLAttributes<HTMLDivElement>

export const ScheduleCalendarBackgroundGrid = forwardRef<
  HTMLDivElement,
  ScheduleCalendarBackgroundGridProps
>(({ rows, timeslots, streams, className }, ref) => {
  return (
    <ScheduleCalendarGrid
      ref={ref}
      rows={rows}
      cols={streams?.length}
      className={clsx(className, 'lg:mb-10 xl:mb-20')}
    >
      {timeslots.map((time, index) => {
        const nextTime = timeslots[index + 1]

        const next = nextTime ?? timeslots[timeslots.length - 1]
        const { offset, length } = getPosition(time, next, timeslots[0])
        return (
          <Fragment key={index}>
            <div
              className={clsx(
                'w-full flex col-start-1 relative',
                `row-start-${offset}`,
                `row-span-${nextTime ? length : 60 / INCREMENT}`
              )}
              key={`timeslot-time-${index}`}
            >
              <span className="absolute right-1 -top-2 w-12 text-right text-xs font-bold dark:text-gray-300">
                {formatOptionalMinutes(time, '', 'h aa')}
              </span>
            </div>
            {streams?.map((stream, i) => (
              <div
                className={clsx(
                  'w-full flex',
                  `row-start-${offset}`,
                  `row-span-${nextTime ? length : 60 / INCREMENT}`,
                  'border-gray-600 border-1',
                  index > 0 && 'border-t-0',
                  i > 0 && 'border-l-0'
                )}
                key={`timeslot-lines-${i}`}
              ></div>
            ))}
          </Fragment>
        )
      })}
    </ScheduleCalendarGrid>
  )
})
