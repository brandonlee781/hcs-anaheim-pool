import { ref, watch } from 'vue';
import useWindowWidth from './useWindowWidth';

export type Team = {
  name: string;
  color: string;
  region: 'NA' | 'EU' | 'AZ' | 'MX';
}
export type TeamPool = { [key: string]: Team }
export const teams: TeamPool = {
  acn: {
    name: 'ACEND',
    color: '#6738ec',
    region: 'EU',
  },
  cfs: {
    name: 'Chiefs',
    color: '#3b96d7',
    region: 'AZ',
  },
  c9: {
    name: 'Cloud9',
    color: '#0092df',
    region: 'NA'
  },
  xset: {
    name: 'XSET',
    color: '#f40f30',
    region: 'NA'
  },
  faze: {
    name: 'FaZe Clan',
    color: '#e43d30',
    region: 'NA'
  },
  fnatic: {
    name: 'Fnatic',
    color: '#ff5900',
    region: 'NA'
  },
  navi: {
    name: 'Natus Vincere',
    color: '#ffee00',
    region: 'EU'
  },
  og: {
    name: 'Optic Gaming',
    color: '#93c950',
    region: 'NA'
  },
  eu: {
    name: 'eUnited',
    color: '#2373b9',
    region: 'NA'
  },
  g2: {
    name: 'G2 Esports',
    color: '#ee3d23',
    region: 'NA'
  },
  qua: {
    name: 'Quadrant',
    color: '#ccdb25',
    region: 'EU'
  },
  cru: {
    name: 'Team Cruelty',
    color: '#8806ec',
    region: 'MX',
  },
  jlingz: {
    name: 'JLINGZ esports',
    color: '#4c4c4c',
    region: 'EU'
  },
  kcp: {
    name: 'Pioneers',
    color: '#a7933d',
    region: 'NA'
  },
  kni: {
    name: 'Pittsburgh Knights',
    color: '#fdc00f',
    region: 'MX',
  },
  sen: {
    name: 'Sentinels',
    color: '#ce0037',
    region: 'NA'
  },
  oxg: {
    name: 'Oxygen Esports',
    color: '#01ab42',
    region: 'NA',
  },
  ssg: {
    name: 'Spacestation Gaming',
    color: '#f5b21f',
    region: 'NA',
  },
  g1: {
    name: 'Gamers First',
    color: '#eee',
    region: 'NA',
  },
  comp: {
    name: 'Complexity Gaming',
    color: '#002b5c',
    region: 'NA',
  },
  bbg: {
    name: 'Built By Gamers',
    color: '#2ce3ef',
    region: 'NA',
  }
};

export type Pools = {
  A: Team[];
  B: Team[];
  C: Team[];
  D: Team[];
}
export const pools: Pools = {
  A: [teams.c9, teams.acn, teams.xset, teams.cfs, teams.ssg],
  B: [teams.og, teams.faze, teams.fnatic, teams.navi, teams.comp],
  C: [teams.eu, teams.qua, teams.g2,teams.cru, teams.g1],
  D: [teams.sen, teams.kcp, teams.kni, teams.jlingz, teams.bbg],
}

const hoveredTeam = ref<Team | null>(null)
const clickToHighlight = ref(false)
const setHover = (team: Team | null) => { hoveredTeam.value = team }

export default function useTeam() {

  const { windowWidth } = useWindowWidth()

  watch([windowWidth, clickToHighlight], (w) => {
    setHover(null)
  })

  return {
    teams,
    pools,
    clickToHighlight,
    hoveredTeam,
    setHover,
  }
}
