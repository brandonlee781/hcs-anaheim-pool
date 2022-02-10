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
export type Team = {
  name: string;
  pool: Pool;
  color: string;
}
export const teams: { [key: string]: Team } = {
  c9: {
    name: 'Cloud9',
    pool: Pool.A,
    color: '#0092df',
  },
  sen: {
    name: 'Sentinels',
    pool: Pool.A,
    color: '#ce0037',
  },
  oxg: {
    name: 'Oxygen Esports',
    pool: Pool.A,
    color: '#01ab42',
  },
  esa: {
    name: 'Esports Arena Red',
    pool: Pool.A,
    color: '#cf212a',
  },
  faze: {
    name: 'FaZe Clan',
    pool: Pool.B,
    color: '#e43d30',
  },
  ssg: {
    name: 'Spacestation Gaming',
    pool: Pool.B,
    color: '#f5b21f',
  },
  g1: {
    name: 'Gamers First',
    pool: Pool.B,
    color: '#141517',
  },
  fnatic: {
    name: 'Fnatic',
    pool: Pool.B,
    color: '#ff5900',
  },
  og: {
    name: 'Optic Gaming',
    pool: Pool.C,
    color: '#93c950',
  },
  g2: {
    name: 'G2 Esports',
    pool: Pool.C,
    color: '#ee3d23',
  },
  comp: {
    name: 'Complexity Gaming',
    pool: Pool.C,
    color: '#002b5c',
  },
  uyu: {
    name: 'UYU',
    pool: Pool.C,
    color: '#f10e15',
  },
  eu: {
    name: 'eUnited',
    pool: Pool.D,
    color: '#2373b9',
  },
  kcp: {
    name: 'Pioneers',
    pool: Pool.D,
    color: '#a7933d',
  },
  xset: {
    name: 'XSET',
    pool: Pool.D,
    color: '#f40f30',
  },
  tor: {
    name: 'Torrent',
    pool: Pool.D,
    color: '#44ffd0',
  },
}

export type Match = {
  stream: Stream;
  team1: string;
  team2: string;
  timeslot: number;
  pool: Pool;
}
export const matches: Match[] = [
  {
    stream: Stream.Halo,
    team1: 'sen',
    team2: 'oxg',
    timeslot: 0,
    pool: Pool.A,
  },
  {
    stream: Stream.Halo,
    team1: 'g2',
    team2: 'comp',
    timeslot: 1,
    pool: Pool.C,
  },
  {
    stream: Stream.Halo,
    team1: 'c9',
    team2: 'oxg',
    timeslot: 2,
    pool: Pool.A,
  },
  {
    stream: Stream.Halo,
    team1: 'og',
    team2: 'comp',
    timeslot: 3,
    pool: Pool.C,
  },
  {
    stream: Stream.Halo,
    team1: 'c9',
    team2: 'sen',
    timeslot: 4,
    pool: Pool.A,
  },
  {
    stream: Stream.Halo,
    team1: 'og',
    team2: 'g2',
    timeslot: 5,
    pool: Pool.A,
  },
  // b stream
  {
    stream: Stream.Xbox,
    team1: 'ssg',
    team2: 'g1',
    timeslot: 0,
    pool: Pool.B,
  },

  {
    stream: Stream.Xbox,
    team1: 'kcp',
    team2: 'xset',
    timeslot: 1,
    pool: Pool.D,
  },
  {
    stream: Stream.Xbox,
    team1: 'faze',
    team2: 'g1',
    timeslot: 2,
    pool: Pool.B,
  },
  {
    stream: Stream.Xbox,
    team1: 'eu',
    team2: 'xset',
    timeslot: 3,
    pool: Pool.D,
  },
  {
    stream: Stream.Xbox,
    team1: 'faze',
    team2: 'ssg',
    timeslot: 4,
    pool: Pool.B,
  },
  {
    stream: Stream.Xbox,
    team1: 'eu',
    team2: 'kcp',
    timeslot: 5,
    pool: Pool.D,
  },
  // c stream
  {
    stream: Stream.Red,
    team1: 'c9',
    team2: 'esa',
    timeslot: 0,
    pool: Pool.A,
  },

  {
    stream: Stream.Red,
    team1: 'og',
    team2: 'uyu',
    timeslot: 1,
    pool: Pool.C,
  },
  {
    stream: Stream.Red,
    team1: 'sen',
    team2: 'esa',
    timeslot: 2,
    pool: Pool.A,
  },
  {
    stream: Stream.Red,
    team1: 'g2',
    team2: 'uyu',
    timeslot: 3,
    pool: Pool.C,
  },
  {
    stream: Stream.Red,
    team1: 'esa',
    team2: 'oxg',
    timeslot: 4,
    pool: Pool.A,
  },
  {
    stream: Stream.Red,
    team1: 'comp',
    team2: 'uyu',
    timeslot: 5,
    pool: Pool.C,
  },
  // d stream
  {
    stream: Stream.Blue,
    team1: 'faze',
    team2: 'fnatic',
    timeslot: 0,
    pool: Pool.B,
  },

  {
    stream: Stream.Blue,
    team1: 'eu',
    team2: 'tor',
    timeslot: 1,
    pool: Pool.D,
  },
  {
    stream: Stream.Blue,
    team1: 'ssg',
    team2: 'fnatic',
    timeslot: 2,
    pool: Pool.B,
  },
  {
    stream: Stream.Blue,
    team1: 'kcp',
    team2: 'tor',
    timeslot: 3,
    pool: Pool.D,
  },
  {
    stream: Stream.Blue,
    team1: 'g1',
    team2: 'fnatic',
    timeslot: 4,
    pool: Pool.B,
  },
  {
    stream: Stream.Blue,
    team1: 'tor',
    team2: 'xset',
    timeslot: 5,
    pool: Pool.D,
  },
]
