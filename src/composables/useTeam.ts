import { Team } from '@/data';
import { ref, watch } from 'vue';
import useWindowWidth from './useWindowWidth';

const hoveredTeam = ref<Team | null>(null)
const setHover = (team: Team | null) => { hoveredTeam.value = team }

export default function useTeam() {
  const { windowWidth } = useWindowWidth()

  watch(windowWidth, (w) => {
    setHover(null)
  })

  return {
    hoveredTeam,
    setHover,
  }
}
