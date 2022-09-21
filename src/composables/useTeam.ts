import { ref, watch } from 'vue'
import useWindowWidth from './useWindowWidth'

const hoveredTeam = ref<Team | null>(null)
const clickToHighlight = ref(false)
const showScheduleLogos = ref(false)
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
    showScheduleLogos,
    hoveredTeam,
    setHover,
  }
}
