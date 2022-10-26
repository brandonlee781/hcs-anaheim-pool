export enum Region {
  'NA' = 'NA',
  'EU' = 'EU',
  'AZ' = 'AZ',
  'MX' = 'MX',
}

export type Team = {
  name: string
  color: string
  region: Region | null
  image?: string
}
