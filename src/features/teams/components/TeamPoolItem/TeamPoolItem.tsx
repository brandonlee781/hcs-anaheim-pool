import clsx from 'clsx'
import { CSSProperties } from 'react'
import { useSpring, animated } from 'react-spring'

import { HoverTeamContext } from '../../providers/HoverTeamProvider'
import { Team } from '../../types'
import { createTeamGradient } from '../../utils/createTeamGradient'

const DEFAULT_FLEX_GROW = 1
const EXPANDED_FLEX_GROW = 2

import styles from './TeamPoolItem.module.scss'

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

  const [spring, api] = useSpring(() => ({
    from: { flexGrow: DEFAULT_FLEX_GROW },
  }))

  useEffect(() => {
    if (clickedTeam) {
      api.start({
        from: { flexGrow: DEFAULT_FLEX_GROW },
        to: { flexGrow: EXPANDED_FLEX_GROW },
      })
    } else {
      api.start({
        from: { flexGrow: EXPANDED_FLEX_GROW },
        to: { flexGrow: DEFAULT_FLEX_GROW },
      })
    }
  }, [clickedTeam])

  return (
    <animated.div
      className={clsx(
        'relative min-h-10 xl:min-h-5 2xl:w-70 group cursor-pointer',
        !lastItem && 'border-b-1 dark:border-hcsDark-800 border-white',
        clicked && !clickedTeam && 'bg-dark-100/40 text-gray-500/40',
        extraClass,
        styles.poolItemWrapper
      )}
      style={spring}
      role="button"
      tabIndex={0}
      onFocus={() => setTeam(team)}
      onBlur={() => setTeam(team)}
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
        <div className="text-sm font-bold light:text-dark-300 tracking-wide 2xl:(text-xl font-extrabold) ml-3">
          {name}
        </div>
        <div className="text-xs light:text-dark-500 ml-auto">{region}</div>
      </div>
    </animated.div>
  )
}
