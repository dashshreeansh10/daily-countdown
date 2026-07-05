import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Theme, ColorTheme, ThemeConfig } from '../types/theme'

interface ThemeStore extends ThemeConfig {
  setTheme: (theme: Theme) => void
  setColorTheme: (colorTheme: ColorTheme) => void
  setCustomColor: (color: string) => void
  setFontScale: (scale: number) => void
  setReducedMotion: (value: boolean) => void
}

export const useThemeStore = create<ThemeStore>(
  persist(
    (set) => ({
      name: 'auto',
      colorTheme: 'blue',
      customColor: undefined,
      fontScale: 1,
      reducedMotion: false,
      setTheme: (theme) => set({ name: theme }),
      setColorTheme: (colorTheme) => set({ colorTheme }),
      setCustomColor: (customColor) => set({ customColor }),
      setFontScale: (fontScale) => set({ fontScale: Math.max(0.8, Math.min(1.5, fontScale)) }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
    }),
    {
      name: 'theme-store',
    },
  ),
)
