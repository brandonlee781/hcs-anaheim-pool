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

export type TStream = {
  name: string;
  link: string;
}
export const streams: { [key in Stream]: TStream } = {
  [Stream.Halo]: {
    name: 'A Stream (Halo)',
    link: 'https://www.twitch.tv/halo',
  },
  [Stream.Xbox]: {
    name: 'B Stream (Xbox)',
    link: 'https://www.twitch.tv/xbox',
  },
  [Stream.Red]: {
    name: 'C Stream (HCS_Red)',
    link: 'https://www.twitch.tv/hcs_red',
  },
  [Stream.Blue]: {
    name: 'D Stream (HCS_Blue)',
    link: 'https://www.twitch.tv/hcs_blue',
  },
}

export type Team = {
  name: string;
  pool: Pool;
  color: string;
}
export const teams: { [key: string]: Team } = {
  // Pool A
  acn: {
    name: 'ACEND',
    pool: Pool.A,
    color: '#6738ec',
  },
  cfs: {
    name: 'Chiefs',
    pool: Pool.A,
    color: '#3b96d7',
  },
  c9: {
    name: 'Cloud9',
    pool: Pool.A,
    color: '#0092df',
  },
  xset: {
    name: 'XSET',
    pool: Pool.A,
    color: '#f40f30',
  },
  // Pool B
  faze: {
    name: 'FaZe Clan',
    pool: Pool.B,
    color: '#e43d30',
  },
  fnatic: {
    name: 'Fnatic',
    pool: Pool.B,
    color: '#ff5900',
  },
  navi: {
    name: 'Natus Vincere',
    pool: Pool.B,
    color: '#ffee00',
  },
  og: {
    name: 'Optic Gaming',
    pool: Pool.B,
    color: '#93c950',
  },
  // Pool C
  eu: {
    name: 'eUnited',
    pool: Pool.C,
    color: '#2373b9',
  },
  g2: {
    name: 'G2 Esports',
    pool: Pool.C,
    color: '#ee3d23',
  },
  qua: {
    name: 'Quadrant',
    pool: Pool.C,
    color: '#ccdb25',
  },
  cru: {
    name: 'Team Cruelty',
    pool: Pool.C,
    color: '#8806ec',
  },
  // Pool D
  jlingz: {
    name: 'JLINGZ esports',
    pool: Pool.D,
    color: '#4c4c4c',
  },
  kcp: {
    name: 'Pioneers',
    pool: Pool.D,
    color: '#a7933d',
  },
  kni: {
    name: 'Pittsburgh Knights',
    pool: Pool.D,
    color: '#fdc00f',
  },
  sen: {
    name: 'Sentinels',
    pool: Pool.D,
    color: '#ce0037',
  },

  // oxg: {
  //   name: 'Oxygen Esports',
  //   pool: Pool.A,
  //   color: '#01ab42',
  // },
  // esa: {
  //   name: 'Esports Arena Red',
  //   pool: Pool.A,
  //   color: '#cf212a',
  // },
  // ssg: {
  //   name: 'Spacestation Gaming',
  //   pool: Pool.B,
  //   color: '#f5b21f',
  // },
  // g1: {
  //   name: 'Gamers First',
  //   pool: Pool.B,
  //   color: '#eee',
  // },
  // comp: {
  //   name: 'Complexity Gaming',
  //   pool: Pool.C,
  //   color: '#002b5c',
  // },
  // uyu: {
  //   name: 'UYU',
  //   pool: Pool.C,
  //   color: '#f10e15',
  // },
  // tor: {
  //   name: 'Torrent',
  //   pool: Pool.D,
  //   color: '#44ffd0',
  // },
}

export type Match = {
  stream: TStream;
  team1: string;
  team2: string;
  timeslot: number;
  pool: Pool;
  finished: string | null;
}
export const matches: Match[] = [
  // a stream
  {
    stream: streams[Stream.Halo],
    team1: 'c9',
    team2: 'acn',
    timeslot: 0,
    pool: Pool.A,
    finished: null,
  },
  {
    stream: streams[Stream.Halo],
    team1: 'faze',
    team2: 'navi',
    timeslot: 1,
    pool: Pool.B,
    finished: null,
  },
  {
    stream: streams[Stream.Halo],
    team1: 'xset',
    team2: 'acn',
    timeslot: 2,
    pool: Pool.A,
    finished: null,
  },
  {
    stream: streams[Stream.Halo],
    team1: 'eu',
    team2: 'g2',
    timeslot: 3,
    pool: Pool.C,
    finished: null,
  },
  {
    stream: streams[Stream.Halo],
    team1: 'sen',
    team2: 'kcp',
    timeslot: 4,
    pool: Pool.D,
    finished: null,
  },
  {
    stream: streams[Stream.Halo],
    team1: 'og',
    team2: 'faze',
    timeslot: 5,
    pool: Pool.B,
    finished: null,
  },
  // b stream
  {
    stream: streams[Stream.Xbox],
    team1: 'sen',
    team2: 'kni',
    timeslot: 0,
    pool: Pool.D,
    finished: null,
  },

  {
    stream: streams[Stream.Xbox],
    team1: 'og',
    team2: 'fnatic',
    timeslot: 1,
    pool: Pool.B,
    finished: null,
  },
  {
    stream: streams[Stream.Xbox],
    team1: 'kcp',
    team2: 'kni',
    timeslot: 2,
    pool: Pool.D,
    finished: null,
  },
  {
    stream: streams[Stream.Xbox],
    team1: 'faze',
    team2: 'fnatic',
    timeslot: 3,
    pool: Pool.B,
    finished: null,
  },
  {
    stream: streams[Stream.Xbox],
    team1: 'acn',
    team2: 'cfs',
    timeslot: 4,
    pool: Pool.A,
    finished: null,
  },
  {
    stream: streams[Stream.Xbox],
    team1: 'eu',
    team2: 'qua',
    timeslot: 5,
    pool: Pool.C,
    finished: null,
  },
  // c stream
  {
    stream: streams[Stream.Red],
    team1: 'xset',
    team2: 'cfs',
    timeslot: 0,
    pool: Pool.A,
    finished: null,
  },

  {
    stream: streams[Stream.Red],
    team1: 'g2',
    team2: 'qua',
    timeslot: 1,
    pool: Pool.C,
    finished: null,
  },
  {
    stream: streams[Stream.Red],
    team1: 'c9',
    team2: 'cfs',
    timeslot: 2,
    pool: Pool.A,
    finished: null,
  },
  {
    stream: streams[Stream.Red],
    team1: 'og',
    team2: 'navi',
    timeslot: 3,
    pool: Pool.B,
    finished: null,
  },
  {
    stream: streams[Stream.Red],
    team1: 'c9',
    team2: 'xset',
    timeslot: 4,
    pool: Pool.A,
    finished: null,
  },
  {
    stream: streams[Stream.Red],
    team1: 'navi',
    team2: 'fnatic',
    timeslot: 5,
    pool: Pool.B,
    finished: null,
  },
  // d stream
  {
    stream: streams[Stream.Blue],
    team1: 'kcp',
    team2: 'jlingz',
    timeslot: 0,
    pool: Pool.D,
    finished: null,
  },
  {
    stream: streams[Stream.Blue],
    team1: 'eu',
    team2: 'cru',
    timeslot: 1,
    pool: Pool.C,
    finished: null,
  },
  {
    stream: streams[Stream.Blue],
    team1: 'sen',
    team2: 'jlingz',
    timeslot: 2,
    pool: Pool.D,
    finished: null,
  },
  {
    stream: streams[Stream.Blue],
    team1: 'qua',
    team2: 'cru',
    timeslot: 3,
    pool: Pool.C,
    finished: null,
  },
  {
    stream: streams[Stream.Blue],
    team1: 'jlingz',
    team2: 'kni',
    timeslot: 4,
    pool: Pool.D,
    finished: null,
  },
  {
    stream: streams[Stream.Blue],
    team1: 'g2',
    team2: 'cru',
    timeslot: 5,
    pool: Pool.C,
    finished: null,
  },
]
