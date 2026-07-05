export type Theme = 'light' | 'dark' | 'auto'

export type ColorTheme = 
  | 'black'
  | 'white'
  | 'blue'
  | 'purple'
  | 'green'
  | 'red'
  | 'orange'
  | 'custom'

export interface ThemeConfig {
  name: Theme
  colorTheme: ColorTheme
  customColor?: string
  fontScale: number
  reducedMotion: boolean
}
