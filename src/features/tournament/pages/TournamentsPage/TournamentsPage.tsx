import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/Elements/Button'
import { Card } from '@/components/Elements/Card'
import { Input } from '@/components/Elements/Form/Input'

import { useCreateTournament, CreatePayload } from '../../api/createTournament'
import { useAllTournaments } from '../../api/getAllTournaments'

export const TournamentsPage = () => {
  const { register, handleSubmit } = useForm<CreatePayload>()
  const { tournaments } = useAllTournaments()
  const mutation = useCreateTournament()

  const createTourney: SubmitHandler<CreatePayload> = data => {
    mutation.mutate(data)
  }
  return (
    <div className="w-full flex flex-col items-center justify-start mt-[5rem]">
      <Card className="w-[20rem] h-auto">
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(createTourney)}>
          <Input label="Title" {...register('title')} wrapperClassName="col-span-2" required />
          <Input
            inputType="date"
            label="Start Date"
            {...register('startDate', { valueAsDate: true })}
            required
          />
          <Input
            inputType="date"
            label="End Date"
            {...register('endDate', { valueAsDate: true })}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
      </Card>
      <Card className="w-[20rem] h-auto mt-4">
        <ul className="divide-y divide-gray-100 w-full">
          {tournaments?.map(tournament => (
            <li key={tournament.id} className="p-3 hover:bg-blue-600 hover:text-blue-200">
              <Link to={`/tournament/${tournament.id}`}>{tournament.title}</Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
