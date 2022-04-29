import { Match, Pool, Region, Stream, Team, TStream } from './types'

export * from './types'

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

type TeamPool = { [key: string]: Team }
const poolA: TeamPool = {
  acn: {
    name: 'ACEND',
    pool: Pool.A,
    color: '#6738ec',
    region: Region.EU,
  },
  cfs: {
    name: 'Chiefs',
    pool: Pool.A,
    color: '#3b96d7',
    region: Region.AZ,
  },
  c9: {
    name: 'Cloud9',
    pool: Pool.A,
    color: '#0092df',
    region: Region.NA,
  },
  xset: {
    name: 'XSET',
    pool: Pool.A,
    color: '#f40f30',
    region: Region.NA,
  },
  aTbd: {
    name: 'TBD',
    pool: Pool.A,
    color: '',
    region: Region.null,
  }
}

const poolB: TeamPool = {
  faze: {
    name: 'FaZe Clan',
    pool: Pool.B,
    color: '#e43d30',
    region: Region.NA,
  },
  fnatic: {
    name: 'Fnatic',
    pool: Pool.B,
    color: '#ff5900',
    region: Region.NA,
  },
  navi: {
    name: 'Natus Vincere',
    pool: Pool.B,
    color: '#ffee00',
    region: Region.EU,
  },
  og: {
    name: 'Optic Gaming',
    pool: Pool.B,
    color: '#93c950',
    region: Region.NA,
  },
  bTbd: {
    name: 'TBD',
    pool: Pool.B,
    color: '',
    region: Region.null,
  }
}

const poolC: TeamPool = {
  eu: {
    name: 'eUnited',
    pool: Pool.C,
    color: '#2373b9',
    region: Region.NA,
  },
  g2: {
    name: 'G2 Esports',
    pool: Pool.C,
    color: '#ee3d23',
    region: Region.NA,
  },
  qua: {
    name: 'Quadrant',
    pool: Pool.C,
    color: '#ccdb25',
    region: Region.NA,
  },
  cru: {
    name: 'Team Cruelty',
    pool: Pool.C,
    color: '#8806ec',
    region: Region.MX,
  },
  cTbd: {
    name: 'TBD',
    pool: Pool.C,
    color: '',
    region: Region.null,
  }
}

const poolD: TeamPool = {
  jlingz: {
    name: 'JLINGZ esports',
    pool: Pool.D,
    color: '#4c4c4c',
    region: Region.EU,
  },
  kcp: {
    name: 'Pioneers',
    pool: Pool.D,
    color: '#a7933d',
    region: Region.NA,
  },
  kni: {
    name: 'Pittsburgh Knights',
    pool: Pool.D,
    color: '#fdc00f',
    region: Region.MX,
  },
  sen: {
    name: 'Sentinels',
    pool: Pool.D,
    color: '#ce0037',
    region: Region.NA,
  },
  dTbd: {
    name: 'TBD',
    pool: Pool.D,
    color: '',
    region: Region.null,
  }
}


export const teams = {
  ...poolA,
  ...poolB,
  ...poolC,
  ...poolD,

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
