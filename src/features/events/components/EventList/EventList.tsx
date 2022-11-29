import { isBefore } from 'date-fns'
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/Elements/Button'
import { Card } from '@/components/Elements/Card'
import { Input } from '@/components/Elements/Form/Input'
import { MultiSelect } from '@/components/Elements/Form/MultiSelect'
import { Team, TeamSelectInput } from '@/features/teams'
import { Stream, TournamentEvent, useTournament } from '@/features/tournament'

import { useCreateEvent } from '../../api/createEvent'
import { useDeleteEvent } from '../../api/deleteEvent'
import { useUpdateEvent } from '../../api/updateEvent'

import Save from '~icons/mdi/content-save'
import Reset from '~icons/mdi/restore'
import Trash from '~icons/mdi/trash-can'

function hasDST(date = new Date()) {
  const january = new Date(date.getFullYear(), 0, 1).getTimezoneOffset()
  const july = new Date(date.getFullYear(), 6, 1).getTimezoneOffset()

  return Math.max(january, july) !== date.getTimezoneOffset()
}

type EventFormData = {
  time: string
  duration: number
  text: string
  textClass: string
  streams: Stream[]
}

type EventListItemProps = {
  event: TournamentEvent | Partial<TournamentEvent>
  date: string
  dayId: string
  tournamentId: string
  streams: Stream[]
}
const EventListItem = ({ event, date, dayId, tournamentId, streams }: EventListItemProps) => {
  const { register, reset, formState, control, handleSubmit } = useForm<EventFormData>()
  const { tournament } = useTournament(tournamentId)

  const updateMutation = useUpdateEvent()
  const createMutation = useCreateEvent()
  const deleteMutation = useDeleteEvent()

  const [teamsDirty, setTeamsDirty] = useState(false)
  const [formTeams, setFormTeams] = useState<Team[]>([])

  const resetEvent = () => {
    if (event.id) {
      const formattedTime = event.time
        ? formatInTimeZone(new Date(event.time), tournament?.timezone || 'UTC', 'HH:mm')
        : ''
      reset({
        time: formattedTime,
        duration: event.duration,
        text: event.data?.text,
        textClass: event.data?.textClass,
        streams: event.streams?.map(s => ({ id: s, name: s })),
      })

      setFormTeams(event?.data?.teams ?? [])
      setTeamsDirty(false)
    } else {
      reset({
        time: '',
        duration: 90,
        text: '',
        textClass: '',
        streams: [],
      })
      setFormTeams([])
      setTeamsDirty(false)
    }
  }

  const submitEvent: SubmitHandler<EventFormData> = data => {
    let tzOffset = getTimezoneOffset(tournament?.timezone ?? 'UTC') / 1000 / 60 / 60
    if (hasDST(new Date(date))) {
      tzOffset += 1
    }
    const offset = tzOffset.toString() + ':00'
    if (event.id && tournament) {
      updateMutation.mutate({
        tournamentId: tournament.id,
        id: event.id,
        payload: {
          text: data.text,
          textClass: data.textClass,
          time: `${date} ${data.time}${offset}`,
          duration: data.duration,
          teams: formTeams,
          streams: data.streams,
        },
      })
    } else if (dayId.length && tournament) {
      createMutation.mutate({
        tournamentId: tournament.id,
        payload: {
          dayId: dayId,
          text: data.text,
          duration: data.duration,
          textClass: data.textClass,
          time: `${date} ${data.time}${offset}`,
          teams: formTeams,
          streams: data.streams,
        },
      })
    } else {
      throw new Error('A day id must be included to create a new event')
    }
  }

  useEffect(() => {
    resetEvent()
  }, [event])

  const updateTeams = (team: Team, index: number) => {
    const currentTeams = [...formTeams]
    currentTeams[index] = team
    setFormTeams(currentTeams)
    setTeamsDirty(true)
  }

  const deleteTeam = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      if (event.id && tournament) {
        deleteMutation.mutate({ id: event.id, tournamentId: tournament.id })
      }
    }
  }

  return (
    <Card className="!w-full">
      <form onSubmit={handleSubmit(submitEvent)} className="w-full flex-col">
        <div className="w-full mb-2 flex flex-row-reverse justify-between">
          <div className="flex">
            {(formState.isDirty || teamsDirty) && (
              <>
                <Button size="xs" className="!p-1 !px-0 mr-1" onClick={() => resetEvent()}>
                  <Reset />
                </Button>
                <Button type="submit" size="xs" className="!p-1 !px-0">
                  <Save />
                </Button>
              </>
            )}
            {event?.id && (
              <Button size="xs" className="!p-1 !px-0 ml-1" onClick={() => deleteTeam()}>
                <Trash />
              </Button>
            )}
          </div>
          {event.id}
        </div>
        <div className="w-full flex flex-row mb-2">
          <Input
            inputType="time"
            label="Time"
            {...register('time')}
            wrapperClassName="mr-2"
            required
          />
          <Input inputType="number" label="Duration" {...register('duration')} required />
        </div>
        <Input label="Text" {...register('text')} className="mb-2" />
        <Input label="Text Class" {...register('textClass')} className="mb-2" />
        <div className="w-full mb-2">
          <MultiSelect
            name="streams"
            placeholder="Streams"
            label="Streams"
            control={control}
            required
            items={event?.streams?.map(s => ({ id: s, name: s })) ?? []}
            options={streams ?? []}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
          />
        </div>
        <div className="">
          <div className="flex flex-row flex-nowrap items-center">
            <TeamSelectInput value={formTeams?.[0]} onTeamClick={team => updateTeams(team, 0)} />
            <span className="mx-2">vs</span>
            <TeamSelectInput value={formTeams?.[1]} onTeamClick={team => updateTeams(team, 1)} />
          </div>
          <div className="flex flex-row flex-nowrap items-center">
            <TeamSelectInput value={formTeams?.[2]} onTeamClick={team => updateTeams(team, 2)} />
            <span className="mx-2">vs</span>
            <TeamSelectInput value={formTeams?.[3]} onTeamClick={team => updateTeams(team, 3)} />
          </div>
        </div>
      </form>
    </Card>
  )
}

type EventListProps = {
  events: TournamentEvent[]
  date: string
  dayId: string
  tournamentId: string
  streams: Stream[]
}
export const EventList = ({ events, date, dayId, tournamentId, streams }: EventListProps) => {
  return (
    <div className="max-w-full grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-auto-rows gap-2">
      {events
        ?.sort((a, b) => {
          const aDate = new Date(a.time)
          const bDate = new Date(b.time)
          const aStreamIdx = streams.findIndex(s => s.id === a.streams?.[0])
          const bStreamIdx = streams.findIndex(s => s.id === b.streams?.[0])
          if (isBefore(aDate, bDate)) return -1
          if (isBefore(bDate, aDate)) return 1

          return aStreamIdx - bStreamIdx
        })
        .map(event => (
          <EventListItem
            key={event.id}
            event={event}
            date={date}
            dayId={dayId}
            tournamentId={tournamentId}
            streams={streams}
          />
        ))}
      <EventListItem
        event={{}}
        tournamentId={tournamentId}
        date={date}
        dayId={dayId}
        streams={streams}
      />
    </div>
  )
}
