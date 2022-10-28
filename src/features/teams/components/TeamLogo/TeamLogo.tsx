import clsx from 'clsx'
import { HtmlHTMLAttributes } from 'react'

import { Team } from '@/features/teams'

import { adjustColor } from '../../utils/adjustColor'

export const TeamLogo = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement> & { team: Team }
>(({ team, className, style }, ref) => {
  const color = adjustColor(team.secondaryColor || team.color, 40)
  return (
    <div
      ref={ref}
      className={clsx(
        'h-12 w-12 p-1 rounded-md flex justify-center items-center overflow-hidden',
        className
      )}
      key={team.name}
      style={{ ...style, backgroundColor: color }}
    >
      <img
        className="h-10 w-10 object-scale-down"
        style={{
          filter: `drop-shadow(2px 6px 8px ${adjustColor(team.secondaryColor || team.color, 100)})`,
        }}
        src={
          team?.image ??
          'https://wfctmtpqpbervzoaiugt.supabase.co/storage/v1/object/public/team-images/images/halo.svg'
        }
        alt={`${team.name} logo`}
      />
    </div>
  )
})

type SplitTeamLogoProps = React.HTMLAttributes<HTMLDivElement> & { teams: Team[] }
export const SplitTeamLogo = forwardRef<HTMLDivElement, SplitTeamLogoProps>(
  ({ teams, className }, ref) => {
    const [team1, team2] = teams
    return (
      <div ref={ref} className={clsx('relative h-12', team2 ? 'w-22' : 'w-12', className)}>
        <TeamLogo
          team={team1}
          className={clsx('absolute top-0 bottom-0 right-0', team2 && '!w-22 pr-10')}
          style={{ clipPath: team1 && team2 ? 'polygon(0 0, 75% 0, 25% 100%, 0% 100%)' : '' }}
        />
        {team2 && (
          <TeamLogo
            team={team2}
            className="absolute top-0 bottom-0 right-0 !w-22 pl-10"
            style={{ clipPath: 'polygon(75% 0, 100% 1%, 100% 100%, 25% 100%)' }}
          />
        )}
      </div>
    )
  }
)
