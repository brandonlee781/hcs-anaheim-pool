import clsx from 'clsx'

import { TournamentEvent, useStreams } from '@/features/tournament'

import { MatchHover } from '../MatchHover'
import { ScheduleTableData } from '../ScheduleTableData'
import { ScheduleTableMatch } from '../ScheduleTableMatch'

type ScheduleTableEventProps = {
  event: TournamentEvent & { span: number }
  showStream?: boolean
}

const ScheduleEvent = ({ event, showStream }: ScheduleTableEventProps) => {
  const { streams } = useStreams()
  const eventStream = streams?.find(s => s.id === event.streams?.[0])
  return (
    <>
      <MatchHover teams={event.data.teams ?? []} />
      <div
        className={clsx('grid grid-cols-1 grid-rows-[min-content,min-content,min-content] w-full')}
      >
        <div
          className={clsx(
            'text-center',
            !event.data.teams?.length && 'text-lg font-bold',
            event.data.textClass
          )}
        >
          {event.data.text}
        </div>
        <ScheduleTableMatch teams={event.data.teams ?? []} />
        {showStream && eventStream && (
          <a
            href={eventStream.link}
            target="_blank"
            rel="noreferrer"
            className="underline place-self-center"
          >
            {eventStream.name}
          </a>
        )}
      </div>
    </>
  )
}

export const ScheduleTableEvent = ({ event }: ScheduleTableEventProps) => {
  return (
    <ScheduleTableData colSpan={event.span}>
      <ScheduleEvent event={event} />
    </ScheduleTableData>
  )
}

export const ScheduleMobileEvent = ({ event }: ScheduleTableEventProps) => {
  return (
    <div className={clsx('relative h-fit p-2 flex items-center justify-center')}>
      <ScheduleEvent event={event} showStream={true} />
    </div>
  )
}
