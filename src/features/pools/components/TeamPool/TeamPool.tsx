import clsx from 'clsx'

import { Card } from '@/components/Elements/Card'
import { Team } from '@/features/teams'

import { TeamPoolItem } from '../TeamPoolItem'

type TeamPoolProps = {
  poolKey: string
  name: string
  teams: Team[]
}
export const TeamPool = ({ poolKey, teams, name }: TeamPoolProps) => {
  const { t } = useTranslation()
  if (!teams.length) {
    return <div></div>
  }
  const tName = poolKey.includes('pool') ? t('table:pool', { pool: name }) : name

  return (
    <Card className="!p-0 h-full w-full">
      <div className={clsx('h-full w-full flex flex-col')}>
        <div className="border-b-2 dark:border-hcsDark-800 border-white flex items-center justify-center">
          <span>{tName}</span>
        </div>
        {teams.map((team, index) => (
          <TeamPoolItem key={team.name} {...team} lastItem={index === teams.length - 1} />
        ))}
      </div>
    </Card>
  )
}
