import { definitions } from '@/types/database'

export enum Region {
  'NA' = 'NA',
  'EU' = 'EU',
  'AZ' = 'AZ',
  'MX' = 'MX',
}

export type Team = Omit<definitions['teams'], 'region'> & {
  region: Region
  secondaryColor?: string
}
