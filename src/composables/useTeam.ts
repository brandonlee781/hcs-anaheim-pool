import { Team } from '@/data';
import { ref, watch } from 'vue';

const hoveredTeam = ref<Team | null>(null)
const setHover = (team: Team | null) => { hoveredTeam.value = team }

export default function useTeam() {
  return {
    hoveredTeam,
    setHover,
  }
}
