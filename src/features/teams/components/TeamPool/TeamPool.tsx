import clsx from 'clsx'

import { Card } from '@/components/Elements/Card'

import { Team } from '../../types'
import { TeamPoolItem } from '../TeamPoolItem'

import styles from './TeamPool.module.css'

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

  const clickTeam = () => {}
  return (
    <Card className="!p-0">
      <div className={clsx(styles.teamPoolWrapper)}>
        <div className="border-b-2 dark:border-hcsDark-800 border-white flex items-center justify-center">
          <span>{tName}</span>
        </div>
        {teams.map((team, index) => (
          <TeamPoolItem
            key={team.name}
            {...team}
            lastItem={index === teams.length - 1}
            clickTeam={() => clickTeam()}
          />
        ))}
      </div>
    </Card>
  )
}
