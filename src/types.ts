export enum Pool {
  A,
  B,
  C,
  D,
}

export enum Stream {
  Halo,
  Xbox,
  Red,
  Blue
}

export enum Region {
  NA,
  EU,
  MX,
  AZ,
}

export type TStream = {
  name: string;
  link: string;
}

export type Team = {
  name: string;
  pool: Pool;
  color: string;
  region: Region
}

export type Match = {
  stream: TStream;
  team1: string;
  team2: string;
  timeslot: number;
  pool: Pool;
  finished: string | null;
}