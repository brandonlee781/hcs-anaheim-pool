import { useStorage } from '@vueuse/core'
import { ref, watch } from 'vue'
import useWindowWidth from './useWindowWidth'

const hoveredTeam = ref<Team | null>(null)
const clickToHighlight = useStorage('hcs-click-higlight', false)
const showScheduleLogos = useStorage('hcs-show-logos', false)
const setHover = (team: Team | null) => {
  if (hoveredTeam.value?.name === team?.name) {
    hoveredTeam.value = null
  } else {
    hoveredTeam.value = team
  }
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
