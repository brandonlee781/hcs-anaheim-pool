import clsx from 'clsx'
import { CSSProperties } from 'react'

import { SplitTeamLogo, Team, TeamLogo, createTeamGradient } from '@/features/teams'
import { EventItem } from '@/features/tournament'

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

function hexToRgb(hex: string) {
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return r + ',' + g + ',' + b
}

type ScheduleMatchProps = EventItem & {
  timeframe?: string
  large?: boolean
  highlight?: Team
}
export const ScheduleMatch = ({
  teams,
  text,
  textClass,
  timeframe,
  large,
  highlight,
}: ScheduleMatchProps) => {
  const [team1, team2, team3, team4] = teams || []

  let highlightGradient = ''

  if (highlight) {
    highlightGradient = createTeamGradient(highlight.color, {
      direction: 'to top',
      lightOpacity: 1,
      midOpacity: 1,
      darkOpacity: 1,
    })
    document.documentElement.style.setProperty('--team-color', hexToRgb(highlight.color.slice(1)))
  }

  return (
    <div className={clsx('w-full h-full flex flex-row flex-nowrap items-end relative')}>
      {highlight && (
        <div
          className="absolute h-3 w-3 top-4 right-4 rounded-full pulseColor"
          style={{ background: highlight?.color }}
        ></div>
      )}
      <div
        className={clsx('h-full w-[0.3rem] mr-2', !highlight && '*themeGradient !bg-gradient-to-b')}
        style={
          {
            backgroundImage: highlight && highlightGradient,
          } as CSSProperties
        }
      ></div>
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
        <div className="text-xs h-3 font-bold text-purple-600/80 dark:text-purple-400/80 whitespace-nowrap tracking-wide">
          {timeframe}
        </div>
      </div>
    </div>
  )
}
