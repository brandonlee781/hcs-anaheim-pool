import clsx from 'clsx'

import { Team, useTeams } from '@/features/teams'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'

import Chevron from '~icons/mdi/chevron-down'

type TeamSelectInputProps = {
  value?: Team
  onTeamClick: (team: Team) => void
}

export const TeamSelectInput = ({ value, onTeamClick }: TeamSelectInputProps) => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const { data: teams } = useTeams()

  const inputRef = useRef<HTMLInputElement>(null)

  const wrapperRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(wrapperRef, () => {
    if (setOpen) setOpen(false)
  })

  const clickTeam = (team: Team) => {
    onTeamClick(team)
    setOpen(false)
    setFilter('')
  }

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-1 bg-gray-50 dark:bg-gray-700 flex border border-gray-200 rounded">
              <input
                ref={inputRef}
                value={filter}
                placeholder={value?.name ?? 'Search Teams by Name'}
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800 dark:text-gray-50 bg-transparent"
                onChange={e => setFilter(e.target.value)}
                onFocus={() => setOpen(true)}
              />
              <div className="text-gray-300  w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  type="button"
                  className="cursor-pointer w-6 h-6 text-gray-600 dark:text-gray-50 outline-none focus:outline-none"
                  onClick={() => setOpen(!open)}
                >
                  <Chevron
                    className={clsx('tansition duration-200', open && 'transform -rotate-180')}
                  />
                </button>
              </div>
            </div>
          </div>
          {open && (
            <div className="absolute shadow bg-white dark:bg-gray-700 top-full z-40 w-full left-0 rounded max-h-40 overflow-y-auto">
              <div className="flex flex-col w-full">
                {teams
                  ?.filter(
                    t =>
                      t.name.toLowerCase().includes(filter.toLowerCase()) ||
                      t.id.toLowerCase().includes(filter.toLowerCase())
                  )
                  ?.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                  })
                  ?.map(team => (
                    <div
                      role="button"
                      tabIndex={0}
                      key={team.id}
                      className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-purple-600/50"
                      onClick={() => clickTeam(team)}
                      onKeyDown={() => clickTeam(team)}
                    >
                      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
                        <div className="w-6 flex flex-col items-center">
                          <div className="flex relative justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
                            <img className="rounded-full" alt="A" src={team.image} />
                          </div>
                        </div>
                        <div className="w-full items-center flex">
                          <div className="mx-2 -mt-1  ">
                            {team.name} ({team.region})
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
