import clsx from 'clsx'

import { Team } from '@/features/teams'

type TableHeadToHeadProps = {
  left: React.ReactNode
  right: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>
const TableHeadToHead = forwardRef<HTMLDivElement, TableHeadToHeadProps>(
  ({ left, right, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'match-teams row-start-2 row-span-1 col-start-1 col-span-2',
          'text-md font-semibold tracking-wider lead min-w-full',
          'flex flex-row items-center justify-center md:flex-col lg:flex-row',
          className
        )}
      >
        <span className="text-right w-40">{left}</span>
        <span className="mx-2">vs</span>
        <span className="text-left w-40">{right}</span>
      </div>
    )
  }
)
TableHeadToHead.displayName = 'TableHeadToHead'

type TableSplitTeamMatchProps = {
  teams: Team[]
} & React.HTMLAttributes<HTMLDivElement>
const TableSplitTeamMatch = forwardRef<HTMLDivElement, TableSplitTeamMatchProps>(
  ({ teams, className }, ref) => {
    const [team1, team2] = teams
    return (
      <div
        ref={ref}
        className={clsx(
          'match-teams row-start-2 row-span-1 col-start-1 col-span-2',
          'text-md font-semibold tracking-wider lead min-w-full',
          className
        )}
      >
        <span className="text-center w-40">{team1.name}</span>
        <span className="mx-2">or</span>
        <span className="text-center w-40">{team2.name}</span>
      </div>
    )
  }
)

type ScheduleTableMatchProps = { teams: Team[] }
export const ScheduleTableMatch = ({ teams }: ScheduleTableMatchProps) => {
  if (teams.length === 2) {
    return <TableHeadToHead left={teams[0].name} right={teams[1].name} />
  }

  if (teams.length === 3) {
    const [team1, team2, team3] = teams
    const Left = () => (
      <TableSplitTeamMatch
        teams={[team1, team2]}
        className="col-span-1 col-start-1 row-start-2 flex flex-col flex-nowrap items-center"
      />
    )
    const Right = () => (
      <div className="col-start-3 col-span-1 row-start-2 flex flex-col flex-nowrap justify-center">
        {team3.name}
      </div>
    )
    return (
      <TableHeadToHead
        className="grid grid-cols-[1fr,16px,1fr] place-items-center"
        left={<Left />}
        right={<Right />}
      />
    )
  }

  if (teams.length === 4) {
    const [team1, team2, team3, team4] = teams
    const Left = () => (
      <TableSplitTeamMatch
        teams={[team1, team2]}
        className="col-span-1 col-start-1 row-start-2 flex flex-col flex-nowrap items-center"
      />
    )
    const Right = () => (
      <TableSplitTeamMatch
        teams={[team3, team4]}
        className="col-span-1 col-start-1 row-start-2 flex flex-col flex-nowrap items-center"
      />
    )
    return (
      <TableHeadToHead
        className="grid grid-cols-[1fr,16px,1fr] place-items-center"
        left={<Left />}
        right={<Right />}
      />
    )
  }
  return <div></div>
}
