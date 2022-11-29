import clsx from 'clsx'

import { HoverTeamContext, Team, adjustColor } from '@/features/teams'

import styles from './MatchHover.module.css'

type MatchHoverProps = {
  teams: Team[]
}
export const MatchHover = ({ teams }: MatchHoverProps) => {
  const { team: highlightTeam } = useContext(HoverTeamContext)

  let show = true

  if (highlightTeam && teams.findIndex(t => t.id === highlightTeam.id) < 0) {
    show = false
  }
  // highlightTeam &&

  const getClasses = (index: number) => {
    let horizontal: keyof typeof styles = styles.left
    let vertical: keyof typeof styles = styles.top
    let isVertical = teams.length > 2

    if (teams.length === 2 && index === 1) {
      horizontal = styles.right
    }

    if (teams.length === 3) {
      if (index <= 1) horizontal = styles.left
      if (index === 2) {
        horizontal = styles.right
        isVertical = false
      }

      if (index === 1) vertical = styles.bottom
    }

    if (teams.length === 4) {
      switch (index) {
        case 0:
          horizontal = styles.left
          vertical = styles.top
          break
        case 1:
          horizontal = styles.left
          vertical = styles.bottom
          break
        case 2:
          horizontal = styles.right
          vertical = styles.top
          break
        case 3:
          horizontal = styles.right
          vertical = styles.bottom
          break
        default:
          horizontal = styles.left
          vertical = styles.top
      }
      // if (index === 0) {
      // }

      // if (index % 2 === 0) {
      //   // if the item is even; ie 0 or 2
      //   horizontal = styles.left
      // } else {
      //   // if item is odd; ie 1 or 3
      //   horizontal = styles.right
      // }
      // if (isVertical && index >= 2) {
      //   vertical = styles.bottom
      // }
    }

    return [horizontal, isVertical ? vertical : null]
  }

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles['inner-wrapper'])}>
        {show &&
          teams.map((team, index) => {
            return (
              <div
                key={team.id}
                className={clsx(...getClasses(index), show && 'displayLogos')}
                style={{ backgroundColor: adjustColor(team.secondaryColor ?? team.color, 50) }}
              >
                <img src={team.image} alt={`${team.name} Logo`} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
