import { create } from 'zustand'
import { Statistics, StreakData } from '../types/countdown'

interface StatsStore {
  stats: Statistics
  streaks: StreakData
  updateStats: (stats: Statistics) => void
  updateStreaks: (streaks: StreakData) => void
  getStats: () => Statistics
  getStreaks: () => StreakData
}

export const useStatsStore = create<StatsStore>((set, get) => ({
  stats: {
    totalCountdowns: 0,
    finishedCountdowns: 0,
    activeCountdowns: 0,
    avgCompletion: 0,
    longestStreak: 0,
    totalJournalEntries: 0,
  },
  streaks: {
    appOpenStreak: 0,
    goalStreak: 0,
    journalStreak: 0,
    notificationReadStreak: 0,
  },
  updateStats: (stats) => set({ stats }),
  updateStreaks: (streaks) => set({ streaks }),
  getStats: () => get().stats,
  getStreaks: () => get().streaks,
}))
