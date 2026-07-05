export interface ScheduledNotification {
  id: string
  countdownId: string
  time: string // HH:MM format
  timezone?: string
  enabled: boolean
  recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  lastSentAt?: Date
}

export interface NotificationContent {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  data?: Record<string, any>
}

export interface MotivationalQuote {
  id: string
  category: string
  quote: string
  used: boolean
}
