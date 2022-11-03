import clsx from 'clsx'
import { differenceInMinutes } from 'date-fns'
import { motion } from 'framer-motion'
import { HtmlHTMLAttributes } from 'react'

import { Stream } from '@/features/tournament'

import { useTimeslots } from '../../hooks/useTimeslots'
import { formatOptionalMinutes } from '../../utils/formatOptionalMinutes'
import { CalendarGrid } from '../CalendarGrid'

type CalendarBackgroundGridProps = {
  streams?: Stream[]
} & HtmlHTMLAttributes<HTMLDivElement>

export const CalendarBackgroundGrid = forwardRef<HTMLDivElement, CalendarBackgroundGridProps>(
  ({ className, streams }, ref) => {
    const { rows, columns, timeslots, getRow } = useTimeslots()
    return (
      <CalendarGrid
        ref={ref}
        rows={rows}
        cols={columns}
        className={clsx('background-grid min-h-full', className, 'lg:mb-10 xl:mb-20')}
      >
        {timeslots.map((time, index) => {
          const duration = Math.abs(differenceInMinutes(time, timeslots[index + 1]))
          const { rowStart, rowSpan } = getRow(time, duration)
          const colSpan = columns / (streams?.length || 1)

          return (
            <Fragment key={index}>
              <div
                className={clsx('timeslots-time w-full flex col-start-1 relative')}
                style={{
                  gridRow: `${rowStart} / span ${rowSpan}`,
                }}
                key={`timeslot-time-${index}`}
              >
                <span className="absolute right-1 -top-2 w-12 text-right text-xs font-bold dark:text-gray-300">
                  {formatOptionalMinutes(time, '', 'h aa')}
                </span>
              </div>
              {streams?.map((stream, i) => (
                <motion.div
                  layout
                  className={clsx(
                    'timeslots-lines w-full flex',
                    'border-gray-600 border',
                    index > 0 && 'border-t-0',
                    i > 0 && 'border-l-0'
                  )}
                  style={{
                    gridRow: `${rowStart} / span ${rowSpan}`,
                    gridColumn: `2 / span ${colSpan * (i + 1)}`,
                  }}
                  key={`timeslot-lines-${i}`}
                ></motion.div>
              ))}
            </Fragment>
          )
        })}
      </CalendarGrid>
    )
  }
)

CalendarBackgroundGrid.displayName = 'CalendarBackgroundGrid'
