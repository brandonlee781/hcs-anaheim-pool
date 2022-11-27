import { Team } from '@/features/teams'
import { definitions } from '@/types/database'

export type Pool = Omit<definitions['pools'], 'teams'> & { teams: Team[] }
