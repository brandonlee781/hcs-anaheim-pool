import clsx from 'clsx'

import { TournamentEvent } from '@/features/tournament'

import { MatchHover } from '../MatchHover'
import { ScheduleTableData } from '../ScheduleTableData'
import { ScheduleTableMatch } from '../ScheduleTableMatch'

type ScheduleTableEventProps = {
  event: TournamentEvent & { span: number }
}
export const ScheduleTableEvent = ({ event }: ScheduleTableEventProps) => {
  return (
    <ScheduleTableData colSpan={event.span}>
      <MatchHover teams={event.data.teams ?? []} />
      <div
        className={clsx('grid grid-cols-1 grid-rows-[min-content,min-content,min-content] h-full')}
      >
        <div className={clsx('text-center', event.data.textClass)}>{event.data.text}</div>
        <ScheduleTableMatch teams={event.data.teams ?? []} />
      </div>
    </ScheduleTableData>
  )
}
