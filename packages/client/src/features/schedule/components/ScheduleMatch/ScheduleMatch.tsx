import { EventItem } from 'api-server/src/features/Tournament/types'
import clsx from 'clsx'

import { SplitTeamLogo, Team, TeamLogo } from '@/features/teams'

type HeadToHeadProps = {
  left: React.ReactNode
  right: React.ReactNode
}
const HeadToHead = ({ left, right }: HeadToHeadProps) => {
  return (
    <div className="flex flex-row flex-nowrap items-center">
      {left}
      <span className="mx-1 font-xs mx-2">vs</span>
      {right}
    </div>
  )
}

type ScheduleMatchProps = EventItem<Team> & { timeframe?: string; large?: boolean }
export const ScheduleMatch = ({ teams, text, textClass, timeframe, large }: ScheduleMatchProps) => {
  const [team1, team2, team3, team4] = teams || []

  return (
    <div className="w-full h-full flex flex-row flex-nowrap items-end">
      <div className="h-full w-[0.3rem] *themeGradient !bg-gradient-to-b mr-2"></div>
      <div
        className={clsx(
          'grid grid-cols-1 grid-rows-[1fr,24px,14px] items-end py-2 w-full h-full',
          !large && '!grid-rows-1 !grid-cols-[max-content,max-content] !items-center'
        )}
      >
        {large && !teams?.length && <div></div>}
        {teams?.length === 2 && (
          <HeadToHead left={<TeamLogo team={team1} />} right={<TeamLogo team={team2} />} />
        )}

        {teams && teams?.length >= 3 && (
          <HeadToHead
            left={<SplitTeamLogo teams={[team1, team2]} />}
            right={<SplitTeamLogo teams={[team3, team4]} />}
          />
        )}

        <div className={clsx('font-bold pr-4', textClass)}>{text}</div>
        <div className="text-xs h-3 font-bold text-purple-400/80 whitespace-nowrap">
          {timeframe}
        </div>
      </div>
    </div>
  )
}
