import { dimensions, height, width } from 'src/utils/dimensions'

/**
 * Theme For Styled Components
 * -
 */
export const appTheme = {
  background: '#182F40',
  primary: '#186CA8',
  et_light_blue: '#5DBDF0',
  et_x_light_blue: '#EDF5F9',
  size: dimensions,
  windowHeight: `${height}px`,
  windowWidth: `${width}px`,
  text: '#182F40'
}

/**
 * Theme For Expo Navigation Header
 * -
 */
export const navTheme = {
  dark: false,
  colors: {
    background: appTheme.background,
    border: appTheme.primary,
    card: appTheme.background,
    notification: appTheme.primary,
    primary: appTheme.primary,
    text: appTheme.primary
  }
}
