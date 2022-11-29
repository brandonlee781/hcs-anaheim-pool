import { isBefore } from 'date-fns'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Elements/Button'
import { ExpansionPanel } from '@/components/Elements/ExpansionPanel'
import { Input } from '@/components/Elements/Form/Input'
import { MultiSelect } from '@/components/Elements/Form/MultiSelect'
import { Pool } from '@/features/pools'
import { TournamentDay, useStreams, useTournament } from '@/features/tournament'

import { useCreateTournamentDay } from '../../api/createTournamentDay'
import { useDeleteTournamentDay } from '../../api/deleteTournamentDay'
import { useUpdateTournamentDay } from '../../api/updateTournamentDay'
import { EventList } from '../EventList'

type DayFormData = Omit<TournamentDay, 'include'> & { include: Pool[] }

type EventFormProps = {
  tournamentId: string
  days: TournamentDay[]
  pools: Pool[]
}
export const EventForm = ({ days, pools, tournamentId }: EventFormProps) => {
  const { register, control, reset, handleSubmit } = useForm<DayFormData>()
  const [currentDay, setCurrentDay] = useState<TournamentDay | null>(null)
  const { tournament } = useTournament(tournamentId)
  const { streams } = useStreams()
  const updateMutation = useUpdateTournamentDay()
  const createMutation = useCreateTournamentDay()
  const deleteMutation = useDeleteTournamentDay()

  useEffect(() => {
    if (currentDay) {
      setCurrentDay(days.find(d => d.id === currentDay.id) ?? null)
    } else {
      setCurrentDay(days[0])
    }
  }, [days])

  const resetForm = () => {
    reset({
      name: currentDay?.name,
      date: currentDay?.date,
      streams: currentDay?.streams,
      include: currentDay?.include?.map(i => ({ key: i, name: i })),
    })
  }

  useEffect(() => {
    resetForm()
  }, [currentDay])

  const editDay: SubmitHandler<Partial<DayFormData>> = data => {
    if (currentDay && tournament) {
      updateMutation.mutate({
        tournamentId: tournament?.id,
        id: currentDay.id,
        payload: {
          name: data.name,
          date: data.date,
          streams: data.streams?.map(s => s.id) ?? [],
          include: data.include?.map(p => {
            return p.key
          }),
        },
      })
    }
  }

  const [newDay, setNewDay] = useState('')
  const setNewDayValue = async (val: string) => {
    setNewDay(val)
  }
  const insertNewDay = () => {
    if (newDay && tournament) {
      createMutation.mutate({ name: newDay, tournamentId: tournament.id })
      setNewDay('')
    }
  }

  const deleteDay = () => {
    if (currentDay && tournament && confirm('Are you sure you want to delete this day?')) {
      deleteMutation.mutate({ id: currentDay.id, tournamentId: tournament.id })
    }
  }

  return (
    <div className="mb-[10rem]">
      <ExpansionPanel title="Events">
        <div className="p-4">
          <div className="flex flex-col items-start md:flex-row md:items-center">
            {days
              ?.sort((a, b) => {
                const aDate = new Date(a.date)
                const bDate = new Date(b.date)
                if (isBefore(aDate, bDate)) return -1
                if (isBefore(bDate, aDate)) return 1
                return 0
              })
              ?.map((d, index) => {
                return (
                  <a
                    key={index}
                    className={`cursor-pointer p-2 mx-2 whitespace-nowrap text-center rounded-md hover:opacity-80 ${
                      currentDay?.id === d.id ? 'active bg-gray-50 text-black/70' : ''
                    }`}
                    role="button"
                    tabIndex={index}
                    onClick={() => setCurrentDay(d)}
                    onKeyDown={() => setCurrentDay(d)}
                  >
                    {d.name}
                  </a>
                )
              })}
            <div className="flex ml-auto">
              <Input
                placeholder="New Day"
                value={newDay}
                onChange={e => setNewDayValue(e.target.value)}
                wrapperClassName="h-full mr-2"
              />
              <Button size="sm" className="!py-1" onClick={() => insertNewDay()}>
                Create
              </Button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(editDay)}
            className="flex flex-col md:flex-row md:flex-nowrap md:items-center p-4 my-4 border rounded-lg border-gray-50"
          >
            <Input wrapperClassName="w-[10rem] mr-2" label="Name" {...register('name')} />
            <Input
              wrapperClassName="w-[10rem] mr-2"
              label="Date"
              inputType="date"
              {...register('date')}
            />
            <div className="mr-2">
              <MultiSelect
                name="streams"
                placeholder="Streams"
                label="Streams"
                control={control}
                options={streams ?? []}
                getOptionLabel={option => option.name || option || 'N/A'}
                getOptionValue={option => option.id}
              />
            </div>
            <div className="mr-2">
              <MultiSelect
                name="include"
                placeholder="Pools"
                label="Pools"
                control={control}
                options={pools}
                getOptionLabel={option => option.name || option}
                getOptionValue={option => option.key}
              />
            </div>
            <Button type="submit" size="sm" className="mt-7 mr-2">
              Submit
            </Button>
            <Button size="sm" className="mt-7" onClick={() => deleteDay()}>
              Delete
            </Button>
          </form>
          <EventList
            events={currentDay?.events ?? []}
            date={currentDay?.date ?? ''}
            dayId={currentDay?.id ?? ''}
            tournamentId={tournament?.id ?? ''}
            streams={currentDay?.streams ?? []}
          />
        </div>
      </ExpansionPanel>
    </div>
  )
}
