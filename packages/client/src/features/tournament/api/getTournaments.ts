import { trpc } from '@/lib/trpc'

export default function getTournament(name: string) {
  return trpc.tournament.getTournament.useQuery(name)
}
