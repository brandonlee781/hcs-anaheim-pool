import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Stream } from '@/features/tournament'

import { useTimeslots } from '../../hooks/useTimeslots'
import { CalendarGrid } from '../CalendarGrid'

type CalendarStreamLinksProps = React.HTMLAttributes<HTMLDivElement> & {
  streams: Stream[]
}
export const CalendarStreamLinks = forwardRef<HTMLDivElement, CalendarStreamLinksProps>(
  ({ streams, className }, ref) => {
    const { t } = useTranslation()
    const { columns } = useTimeslots()
    const colSpan = columns / streams.length
    return (
      <CalendarGrid
        ref={ref}
        className={clsx('shadow-md mb-1', className)}
        rows={1}
        cols={columns}
        height={'2.2rem'}
      >
        <div></div>
        {streams?.map((stream, i) => {
          let col = 2
          if (i > 0) {
            col += i * colSpan
          }
          return (
            <motion.div
              layout
              transition={{ type: 'spring', damping: 20 }}
              key={stream.id}
              className="flex items-center justify-center text-xs"
              style={{
                gridColumn: `${col} / span ${colSpan}`,
              }}
            >
              <a className="hover:underline" href={stream.link} target="_blank" rel="noreferrer">
                {t('event:stream', { name: stream.name })}
              </a>
            </motion.div>
          )
        })}
      </CalendarGrid>
    )
  }
)
