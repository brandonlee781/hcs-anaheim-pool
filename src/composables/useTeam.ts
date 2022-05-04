import { ref, watch } from 'vue'
import useWindowWidth from './useWindowWidth'
import { Team } from '@/data'

const hoveredTeam = ref<Team | null>(null)
const clickToHighlight = ref(false)
const setHover = (team: Team | null) => {
  hoveredTeam.value = team
}

export default function useTeam() {
  const { windowWidth } = useWindowWidth()

  watch([windowWidth, clickToHighlight], w => {
    setHover(null)
  })

  return {
    clickToHighlight,
    hoveredTeam,
    setHover,
  }
}
