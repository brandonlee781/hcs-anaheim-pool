import clsx from 'clsx'

import { Card } from '@/components/Elements/Card'

import { Team } from '../../types'

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
  return (
    <Card className={clsx('!p-0', styles.teamPoolWrapper)}>
      <div className="border-b-2 dark:border-gray-800 h-full flex items-center justify-center">
        <span>{tName}</span>
      </div>
      {teams.map(team => (
        <div key={team.name}>{team.name}</div>
      ))}
    </Card>
  )
}
