import { create } from 'zustand'
import { Countdown } from '../types/countdown'
import * as dbService from '../services/database'

interface CountdownStore {
  countdowns: Countdown[]
  loading: boolean
  error: string | null
  fetchCountdowns: () => Promise<void>
  addCountdown: (countdown: Omit<Countdown, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateCountdown: (id: string, updates: Partial<Countdown>) => Promise<void>
  deleteCountdown: (id: string) => Promise<void>
  getCountdownById: (id: string) => Countdown | undefined
}

export const useCountdownStore = create<CountdownStore>((set, get) => ({
  countdowns: [],
  loading: false,
  error: null,
  fetchCountdowns: async () => {
    set({ loading: true, error: null })
    try {
      const countdowns = await dbService.getCountdowns()
      set({ countdowns, loading: false })
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch countdowns', loading: false })
    }
  },
  addCountdown: async (countdown) => {
    try {
      const newCountdown = await dbService.addCountdown(countdown as Countdown)
      set((state) => ({ countdowns: [...state.countdowns, newCountdown] }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to add countdown' })
    }
  },
  updateCountdown: async (id, updates) => {
    try {
      await dbService.updateCountdown(id, updates)
      set((state) => ({
        countdowns: state.countdowns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update countdown' })
    }
  },
  deleteCountdown: async (id) => {
    try {
      await dbService.deleteCountdown(id)
      set((state) => ({ countdowns: state.countdowns.filter((c) => c.id !== id) }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete countdown' })
    }
  },
  getCountdownById: (id) => {
    return get().countdowns.find((c) => c.id === id)
  },
}))
