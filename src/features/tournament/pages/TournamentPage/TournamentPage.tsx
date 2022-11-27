import { User } from '@supabase/supabase-js'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { PoolsForm } from '@/features/pools'

import { TournamentForm } from '../../components/TournamentForm'
import { useTournament } from '../../hooks/useTournament'
import { useUpdateTournament } from '../../hooks/useUpdateTournament'
import { Tournament } from '../../types'

type TournamentPageProps = {
  user: User
}
export const TournamentPage = ({ user }: TournamentPageProps) => {
  const { register, handleSubmit, reset, setValue } = useForm()
  const { id } = useParams()
  const { tournament, isLoading } = useTournament(id)
  const mutation = useUpdateTournament()

  const resetTournamentData = () => {
    reset({
      title: tournament?.title,
      liquipediaLink: tournament?.liquipediaLink,
      location: tournament?.location,
      prizePool: tournament?.prizePool,
      startDate: tournament?.startDate,
      endDate: tournament?.endDate,
      isOnline: tournament?.isOnline,
    })
  }

  useEffect(() => {
    resetTournamentData()
  }, [tournament])

  if (isLoading || !tournament) return <div>Loading...</div>

  const onSubmit: SubmitHandler<Partial<Tournament>> = data => {
    if (id) {
      mutation.mutateAsync({ id, payload: data }).then(() => {
        alert('Success')
      })
    }
  }

  const checkBeforeReset = () => {
    if (confirm('Are you sure you want to reset all data?')) {
      resetTournamentData()
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-4">
      <div className="flex flex-nowrap w-full justify-end">
        <Button onClick={checkBeforeReset} className="mr-2 text-yellow-500 border-yellow-500">
          Reset
        </Button>
        <Button type="submit" className="border-green-500 text-green-500">
          Submit
        </Button>
      </div>
      <TournamentForm {...tournament} register={register} setValue={setValue} />
      <PoolsForm pools={tournament.pools} tournamentId={tournament.id} />
    </form>
  )
}
