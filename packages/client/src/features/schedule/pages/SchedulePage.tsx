import { useTournament } from '@/features/tournament'

import { ScheduleHeader } from '../components/ScheduleHeader'

export const SchedulePage = () => {
  const { tournament } = useTournament()
  return (
    <div className="p-8 h-full w-full">
      <div className="text-3xl text-super-bold mb-8">{tournament?.title}</div>
      {tournament ? (
        <ScheduleHeader days={tournament.days} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}
