import clsx from 'clsx'
import { motion } from 'framer-motion'
import { CSSProperties } from 'react'

import { createTeamGradient, HoverTeamContext, Team } from '@/features/teams'

const DEFAULT_FLEX_GROW = 1
const EXPANDED_FLEX_GROW = 2

import styles from './TeamPoolItem.module.css'

type TeamPoolItemProps = Team & {
  extraClass?: string
  lastItem: boolean
}
export const TeamPoolItem = (props: TeamPoolItemProps) => {
  const { lastItem, extraClass, ...team } = props
  const { color, image, name, region } = team

  const { setTeam, clicked, team: t } = useContext(HoverTeamContext)

  const clickedTeam = clicked && team.id === t?.id
  const gradient = createTeamGradient(color)

  const variants = {
    default: { flexGrow: DEFAULT_FLEX_GROW },
    expanded: { flexGrow: EXPANDED_FLEX_GROW },
  }

  return (
    <motion.div
      className={clsx(
        'relative w-full min-h-[3rem] lg:min-h-fit group cursor-pointer',
        !lastItem && 'border-b-2 dark:border-hcsDark-800 border-white',
        clicked && !clickedTeam && 'bg-dark-100/40 text-gray-500/40',
        extraClass,
        styles.poolItemWrapper
      )}
      animate={clickedTeam ? 'expanded' : 'default'}
      variants={variants}
      role="button"
      tabIndex={0}
      onMouseEnter={() => setTeam(team)}
      onMouseLeave={() => setTeam(null)}
      onClick={() => setTeam(team, true)}
      onKeyDown={() => setTeam(team, true)}
    >
      <div
        className={clsx(
          'absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-2',
          styles.poolItemBg,
          clickedTeam ? `block` : 'top-0 bottom-0 left-0 right-0 hidden group-hover:block'
        )}
        style={
          {
            '--hover-color': gradient,
            '--bg-image': `url(${image})`,
            styles,
          } as CSSProperties
        }
      >
        <div className="relative h-full w-full">
          <img src={image} alt={`${name} logo`} />
        </div>
      </div>
      <div className={clsx('absolute pr-4 flex items-center', 'top-0 bottom-0 right-0 left-0 z-3')}>
        <div
          className={clsx(
            'text-sm font-bold text-dark-300 tracking-wide 2xl:text-xl 2xl:font-extrabold ml-3',
            styles['teamName']
          )}
        >
          {name}
        </div>
        <div className="text-xs text-dark-500 ml-auto">{region}</div>
      </div>
    </motion.div>
  )
}
