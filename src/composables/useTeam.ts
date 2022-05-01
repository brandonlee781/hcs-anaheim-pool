import { ref, watch } from 'vue';
import useWindowWidth from './useWindowWidth';

export type Team = {
  name: string;
  color: string;
  region: 'NA' | 'EU' | 'AZ' | 'MX' | null;
  image?: string;
}
export type TeamPool = { [key: string]: Team }
export const teams: TeamPool = {
  tbd: {
    name: 'TBD',
    color: '',
    region: null,
  },
  acn: {
    name: 'ACEND',
    color: '#6738ec',
    region: 'EU',
    image: 'acend.png',
  },
  cfs: {
    name: 'Chiefs',
    color: '#3b96d7',
    region: 'AZ',
    image: 'chiefs.png',
  },
  c9: {
    name: 'Cloud9',
    color: '#0092df',
    region: 'NA',
    image: 'cloud9.png',
  },
  xset: {
    name: 'XSET',
    color: '#f40f30',
    region: 'NA',
    image: 'xset.png',
  },
  faze: {
    name: 'FaZe Clan',
    color: '#e43d30',
    region: 'NA',
    image: 'faze.png',
  },
  fnatic: {
    name: 'Fnatic',
    color: '#ff5900',
    region: 'NA',
    image: 'fnatic.png',
  },
  navi: {
    name: 'Natus Vincere',
    color: '#ffee00',
    region: 'EU',
    image: 'navi.png',
  },
  og: {
    name: 'Optic Gaming',
    color: '#93c950',
    region: 'NA',
    image: 'optic.png',
  },
  eu: {
    name: 'eUnited',
    color: '#2373b9',
    region: 'NA',
    image: 'eunited.png',
  },
  g2: {
    name: 'G2 Esports',
    color: '#ee3d23',
    region: 'NA',
    image: 'g2.png',
  },
  qua: {
    name: 'Quadrant',
    color: '#ccdb25',
    region: 'EU',
    image: 'quadrant.png',
  },
  cru: {
    name: 'Team Cruelty',
    color: '#8806ec',
    region: 'MX',
    image: 'cruelty.png',
  },
  jlingz: {
    name: 'JLINGZ esports',
    color: '#4c4c4c',
    region: 'EU',
    image: 'jlingz.png',
  },
  kcp: {
    name: 'Pioneers',
    color: '#a7933d',
    region: 'NA',
    image: 'kcp.png',
  },
  kni: {
    name: 'Pittsburgh Knights',
    color: '#fdc00f',
    region: 'MX',
    image: 'pknights.png',
  },
  sen: {
    name: 'Sentinels',
    color: '#ce0037',
    region: 'NA',
    image: 'sentinels.png',
  },
  oxg: {
    name: 'Oxygen Esports',
    color: '#01ab42',
    region: 'NA',
    image: 'oxygen.png',
  },
  ssg: {
    name: 'Spacestation Gaming',
    color: '#f5b21f',
    region: 'NA',
    image: 'ssg.png',
  },
  g1: {
    name: 'Gamers First',
    color: '#eee',
    region: 'NA',
    image: 'gamers_first.png',
  },
  comp: {
    name: 'Complexity Gaming',
    color: '#002b5c',
    region: 'NA',
    image: 'complexity.png',
  },
  bbg: {
    name: 'Built By Gamers',
    color: '#2ce3ef',
    region: 'NA',
    image: 'bbg.png',
  },
  bhnd: {
    name: 'BLVCKHVND',
    color: '#262626',
    region: 'EU',
    image: 'blackhand.png'
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
