export interface Countdown {
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  emoji?: string
  color?: string
  category?: string
  priority?: 'low' | 'medium' | 'high'
  isPinned?: boolean
  isArchived?: boolean
  timezone?: string
  createdAt: Date
  updatedAt: Date
}

export interface CountdownProgress {
  countdownId: string
  totalDays: number
  completedDays: number
  remainingDays: number
  percentage: number
  hoursRemaining: number
  minutesRemaining: number
  secondsRemaining: number
}

export interface JournalEntry {
  id: string
  countdownId: string
  date: Date
  mood?: string
  notes?: string
  wins?: string[]
  failures?: string[]
  lessons?: string[]
  rating?: number
  imageUrl?: string
}

export interface Milestone {
  id: string
  countdownId: string
  date: Date
  title: string
  description?: string
  isCompleted: boolean
}

export interface StreakData {
  appOpenStreak: number
  goalStreak: number
  journalStreak: number
  notificationReadStreak: number
}

export interface Statistics {
  totalCountdowns: number
  finishedCountdowns: number
  activeCountdowns: number
  avgCompletion: number
  longestStreak: number
  totalJournalEntries: number
}
