import { Timestamp } from 'firebase/firestore';

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
  null
}

export type TStream = {
  name: string;
  link: string;
}

export type Team = {
  id: string;
  name: string;
  pool: 'A' | 'B' | 'C' | 'D';
  color: string;
  region: Region
}

export type TTeam = {
  [key: string]: Team
}

export type Match = {
  stream: TStream;
  team1: string;
  team2: string;
  timeslot: number;
}