import clsx from 'clsx'

import { Card } from '@/components/Elements/Card'
import type { Pool } from '@/features/tournament'

import { TeamPoolItem } from '../TeamPoolItem'

type ParticipantsProps = Pool
export const Participants = ({ teams, name }: ParticipantsProps) => {
  return (
    <Card className="!p-0">
      <div
        className={clsx(
          'h-full w-full grid grid-cols-2 grid-rows-[2rem,auto] md:grid-cols-4 xl:(flex flex-col)'
        )}
      >
        <div className="border-b-2 dark:border-hcsDark-800 border-white flex items-center justify-center col-span-2 md:col-span-4">
          <span>{name}</span>
        </div>
        {teams.map((team, index) => (
          <TeamPoolItem
            extraClass="border-r-1 border-hcsDark-800"
            key={team.name}
            {...team}
            lastItem={index === teams.length - 1}
            clickTeam={() => {}}
          />
        ))}
      </div>
    </Card>
  )
}
