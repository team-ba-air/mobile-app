import { Dimensions, PixelRatio } from 'react-native'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const widthBaseScale = SCREEN_WIDTH / 360
const heightBaseScale = SCREEN_HEIGHT / 700

const normalize = (size: number, based = 'width') => {
  const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale

  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

const Sizing = {
  text: {
    heading: {
      36: 36,
      32: 32,
      28: 28,
      24: 24,
    },
    subheading: {
      20: 20,
      18: 18,
    },
    body: {
      16: 16,
      14: 14,
      12: 12,
      11: 11,
      10: 10,
      8: 8,
    },
  }
}

const widthPixel = (size: number) => {
  return normalize(size, 'width')
}

const heightPixel = (size: number) => {
  return normalize(size, 'height')
}

const fontPixel = (size: number) => {
  return heightPixel(size)
}

//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size)
}

//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size)
}

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  Sizing,
}
