import clsx from 'clsx'
import { isBefore } from 'date-fns'

import { Button } from '@/components/Elements/Button'
import { Card } from '@/components/Elements/Card'
import { Input } from '@/components/Elements/Form/Input'
import { Team, TeamSelectInput } from '@/features/teams'

import { useCreatePool } from '../../api/createPool'
import { useDeletePool } from '../../api/deletePool'
import { useUpdatePool } from '../../api/updatePool'
import { Pool } from '../../types'

import Chevron from '~icons/mdi/chevron-down'
import Save from '~icons/mdi/content-save'
import Minus from '~icons/mdi/minus'
import Plus from '~icons/mdi/plus'
import Trash from '~icons/mdi/trash-can'

const PoolsFormTitle = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  return (
    <div className="flex w-full border-b border-gray-200">
      <div className="p-1 px-3 appearance-none outline-none w-full text-gray-800 dark:text-gray-50 bg-transparent">
        Pools
      </div>
      <div className="text-gray-300  w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 ml-auto">
        <button
          type="button"
          className="cursor-pointer w-6 h-6 text-gray-600 dark:text-gray-50 outline-none focus:outline-none"
          onClick={onClick}
        >
          <Chevron className={clsx('tansition duration-200', open && 'transform -rotate-180')} />
        </button>
      </div>
    </div>
  )
}

const PoolFormTeam = ({ team, onRemove }: { team: Team; onRemove: () => void }) => {
  return (
    <div key={team.id} className="flex items-center border-b border-gray-50/60 p-2 w-full py-2">
      <img src={team.image} className="w-6 h-6 mr-2" alt={`${team.name} logo`} />
      <span>
        {team.name} ({team.region})
      </span>
      <Button
        size="sm"
        className="border-0 ml-auto text-red-500 rounded-full w-8 hover:bg-gray-500"
        onClick={onRemove}
      >
        <Minus />
      </Button>
    </div>
  )
}

type FormPool = {
  dirty: boolean
  data: Pool
}

type PoolsFormProps = {
  pools: Pool[]
  tournamentId: string
}
export const PoolsForm = ({ pools, tournamentId }: PoolsFormProps) => {
  const [open, setOpen] = useState(true)
  const [formPools, setFormPools] = useState<FormPool[]>([])
  const updateMutation = useUpdatePool()
  const createMutation = useCreatePool()
  const deleteMutation = useDeletePool()

  useEffect(() => {
    setFormPools(pools.map(p => ({ dirty: false, data: p })))
  }, [pools])

  const addTeamToPool = (pool: Pool, team: Team) => {
    const { id } = pool
    const newTeams = [...(pool.teams || []), team]
    updateMutation.mutate({
      id,
      payload: {
        ...pool,
        teams: newTeams,
      },
    })
  }

  const removeTeamFromPool = (pool: Pool, team: Team) => {
    const { id } = pool
    const newTeams = pool.teams.filter(t => t.id !== team.id)

    updateMutation.mutate({
      id,
      payload: {
        ...pool,
        teams: newTeams,
      },
    })
  }

  const createNewPool = () => {
    createMutation.mutate({ tournamentId })
  }

  const setPoolChange = async (data: { key?: string; name?: string }, pool: Pool) => {
    const index = formPools.findIndex(fp => fp.data.id === pool.id)
    if (index >= 0) {
      setFormPools(previousState => {
        return [
          ...previousState.slice(0, index),
          { data: { ...pool, ...data }, dirty: true },
          ...previousState.slice(index + 1),
        ]
      })
    }
  }

  const updatePoolData = (index: number) => {
    const { data } = formPools[index]
    if (data.id) {
      updateMutation.mutate({
        id: data.id,
        payload: data,
      })
    }
  }

  const deletePool = (pool: Pool) => {
    if (confirm('Are you sure you want to delete this pool?')) {
      deleteMutation.mutate({ id: pool.id })
    }
  }

  return (
    <div>
      <div className="w-full">
        <div className="my-2 bg-gray-50 dark:bg-gray-700 flex flex-col border border-gray-200 rounded">
          <PoolsFormTitle open={open} onClick={() => setOpen(!open)} />
          {}
          {open && (
            <div className="grid grid-cols-4 gap-2 p-4">
              {formPools
                ?.sort((a, b) => {
                  const timeA = new Date(a.data.created_at!)
                  const timeB = new Date(b.data.created_at!)
                  if (isBefore(timeA, timeB)) return -1
                  if (isBefore(timeB, timeA)) return 1
                  return 0
                })
                .map(({ dirty, data: pool }, index) => (
                  <Card key={pool.id} className="flex flex-col !justify-start">
                    <div className="w-full flex justify-end">
                      <Button
                        type="button"
                        size="xs"
                        className=" text-red-500 border-red-500 hover:bg-red-500 hover:text-white px-0 mr-2"
                        onClick={() => deletePool(pool)}
                      >
                        <Trash />
                      </Button>
                      {dirty && (
                        <Button
                          type="button"
                          size="xs"
                          className=" text-green-500 border-green-500 hover:bg-green-500 hover:text-white px-0"
                          onClick={() => updatePoolData(index)}
                        >
                          <Save />
                        </Button>
                      )}
                    </div>
                    <div className="w-full border-b border-gray-50/30">
                      <Input
                        value={pool.key || ''}
                        label="Pool Key"
                        onChange={e => setPoolChange({ key: e.target.value }, pool)}
                      />
                      <Input
                        value={pool.name || ''}
                        label="Pool name"
                        wrapperClassName="mt-2"
                        onChange={e => setPoolChange({ name: e.target.value }, pool)}
                      />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      {pool.teams?.map(team => (
                        <PoolFormTeam
                          key={team.id}
                          team={team}
                          onRemove={() => removeTeamFromPool(pool, team)}
                        />
                      ))}
                      <TeamSelectInput onTeamClick={team => addTeamToPool(pool, team)} />
                    </div>
                  </Card>
                ))}
              <Card
                className="flex flex-col !h-20 items-center !justify-center cursor-pointer hover:!bg-slate-400 hover:!text-black/80"
                onClick={createNewPool}
                onKeyDown={createNewPool}
              >
                <Plus /> Add New Pool
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
