import { Stream, TStream } from './types'

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