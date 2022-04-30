import { collection, getDocs } from 'firebase/firestore';
import db from '@/firebase'
import { ref } from 'vue';

export default async function useMatches() {
  let matches = ref<any[]>([])
  const matchesCol = collection(db, 'matches')
  const matchSnapshot = await getDocs(matchesCol)

  for await (const match of matchSnapshot.docs) {
    const mat = match.data()
    // const streamSnap = await getDoc(doc(db, 'streams', mat.stream?.id))
    matches.value.push({
      ...mat,
      stream: mat.stream.id,
      team1: mat.team1.id,
      team2: mat.team2.id,
    }) 
  }

  return {
    matches
  }
}