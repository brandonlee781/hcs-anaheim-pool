import clsx from 'clsx'
import { CSSProperties } from 'react'

import { HoverTeamContext } from '../../providers/HoverTeamProvider'
import { Team } from '../../types'
import { createTeamGradient } from '../../utils/createTeamGradient'

import styles from './TeamPoolItem.module.scss'

type TeamPoolItemProps = Team & {
  extraClass?: string
  lastItem: boolean
  clickTeam: (t: Team) => void
}
export const TeamPoolItem = (props: TeamPoolItemProps) => {
  const { lastItem, clickTeam, extraClass, ...team } = props
  const { color, image, name, region } = team

  const { setTeam } = useContext(HoverTeamContext)
  const gradient = createTeamGradient(color)
  return (
    <div
      className={clsx(
        'relative flex-1 min-h-10 xl:min-h-5 2xl:w-70 group cursor-pointer',
        !lastItem && 'border-b-1 dark:border-hcsDark-800 border-white',
        extraClass
      )}
      style={
        {
          '--hover-color': gradient,
          '--bg-image': `url(${image})`,
        } as CSSProperties
      }
      role="button"
      tabIndex={0}
      onFocus={() => setTeam(team)}
      onBlur={() => setTeam(team)}
      onMouseEnter={() => setTeam(team)}
      onMouseLeave={() => setTeam(null)}
      onClick={() => clickTeam(team)}
      onKeyDown={() => clickTeam(team)}
    >
      <div
        className={clsx(
          styles.poolItemBg,
          'absolute top-0 bottom-0 left-0 right-0 hidden group-hover:block pointer-events-none'
        )}
      >
        <div className="relative h-full w-full">
          <img src={image} alt={`${name} logo`} />
        </div>
      </div>
      <div className="absolute top-0 bottom-0 right-0 left-0 pr-4 flex items-center z-3 ">
        <div className="text-sm font-bold light:text-dark-300 tracking-wide 2xl:(text-xl font-extrabold) ml-3">
          {name}
        </div>
        <div className="text-xs light:text-dark-500 ml-auto">{region}</div>
      </div>
    </div>
  )
}
