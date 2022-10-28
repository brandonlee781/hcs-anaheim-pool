import { adjustColor } from './adjustColor'

const percentToHex = (p: number) => {
  const percent = Math.max(0, Math.min(100, p)) // bound percent from 0 to 100
  const intValue = Math.round((percent / 100) * 255) // map percent to nearest integer (0 - 255)
  const hexValue = intValue.toString(16) // get hexadecimal representation
  return hexValue.padStart(2, '0').toUpperCase() // format with leading 0 and upper case characters
}

type CreateTeamGradientOptions = {
  darkAdjust?: number
  lightAdjust?: number
  lightOpacity?: number
  midOpacity?: number
  darkOpacity?: number
  reverse?: boolean
  direction?: string
}
export const createTeamGradient = (color: string, options?: CreateTeamGradientOptions) => {
  const {
    darkAdjust = -40,
    lightAdjust = 40,
    lightOpacity = 0.3,
    midOpacity = 0.2,
    darkOpacity = 0.1,
    reverse = false,
    direction = '90deg',
  } = options || {}
  const dark = adjustColor(color, darkAdjust)
  const light = adjustColor(color, lightAdjust)
  const lightOp = percentToHex(lightOpacity * 100)
  const midOp = percentToHex(midOpacity * 100)
  const darkOp = percentToHex(darkOpacity * 100)

  if (reverse) {
    return `linear-gradient(${direction}, ${dark}${darkOp} 0%, ${color}${midOp} 50%, ${light}${lightOp} 100%)`
  }
  return `linear-gradient(${direction}, ${light}${lightOp} 0%, ${color}${midOp} 50%, ${dark}${darkOp} 100%)`
}
