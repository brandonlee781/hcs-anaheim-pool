import { ref, watch } from 'vue';
import useWindowWidth from './useWindowWidth';
import db from '@/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { Team } from '@/types';

const hoveredTeam = ref<Team | null>(null)
const clickToHighlight = ref(false)
const setHover = (team: Team | null) => { hoveredTeam.value = team }

export default function useTeam() {
  const teams = ref<Team[]>([])

  const teamsCol = collection(db, 'teams')

  getDocs(teamsCol).then(snapshot => {
    teams.value = snapshot.docs.map(doc => {
      const team = doc.data() as Team
      return {
        ...team,
        id: doc.id,
      }
    });
  })

  const getTeam = (id: string) => {
    return teams.value.find(team => team.id === id)
  }

  const { windowWidth } = useWindowWidth()

  watch([windowWidth, clickToHighlight], (w) => {
    setHover(null)
  })

  return {
    teams,
    getTeam,
    clickToHighlight,
    hoveredTeam,
    setHover,
  }
}
