import { useForm, SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { EventForm } from '@/features/events'
import { PoolsForm } from '@/features/pools'

import { TournamentForm } from '../../components/TournamentForm'
import { useTournament } from '../../hooks/useTournament'
import { useUpdateTournament } from '../../hooks/useUpdateTournament'
import { Tournament } from '../../types'

export const TournamentPage = () => {
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
      timezone: tournament?.timezone,
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
    <div className="wrapper w-full h-full p-4 mb-[10rem]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-nowrap w-full justify-between mb-4">
          <Button to="/tournament">Back</Button>
          <div className="flex">
            <Button onClick={checkBeforeReset} className="mr-2 text-yellow-500 border-yellow-500">
              Reset
            </Button>
            <Button type="submit" className="border-green-500 text-green-500">
              Submit
            </Button>
          </div>
        </div>
        <TournamentForm {...tournament} register={register} setValue={setValue} />
      </form>
      <PoolsForm pools={tournament.pools} tournamentId={tournament.id} />
      <EventForm tournamentId={tournament.id} days={tournament.days} pools={tournament.pools} />
    </div>
  )
}
