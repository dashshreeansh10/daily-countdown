import { ScheduledNotification, NotificationContent, MotivationalQuote } from '../types/notifications'

const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  { id: '1', category: 'Discipline', quote: 'Discipline is the bridge between goals and accomplishment.', used: false },
  { id: '2', category: 'Discipline', quote: 'The difference between who you are and who you want to be is what you do.', used: false },
  { id: '3', category: 'Discipline', quote: 'Success is the sum of small efforts repeated day in and day out.', used: false },
  { id: '4', category: 'Discipline', quote: 'You don\'t have to see the whole staircase, just take the first step.', used: false },
  { id: '5', category: 'Discipline', quote: 'Excellence is not a destination; it is a continuous journey that never ends.', used: false },
  { id: '6', category: 'Consistency', quote: 'Consistency is the key to transformation.', used: false },
  { id: '7', category: 'Consistency', quote: 'Small daily improvements are the key to staggering long-term results.', used: false },
  { id: '8', category: 'Consistency', quote: 'You don\'t rise to the level of your goals. You fall to the level of your systems.', used: false },
  { id: '9', category: 'Consistency', quote: 'Build the habit that will set you free.', used: false },
  { id: '10', category: 'Consistency', quote: 'The secret of getting ahead is getting started.', used: false },
  { id: '11', category: 'Deep Work', quote: 'Deep work is like a superpower in an increasingly distracted world.', used: false },
  { id: '12', category: 'Deep Work', quote: 'Focused attention is the most valuable currency.', used: false },
  { id: '13', category: 'Deep Work', quote: 'The ability to concentrate is the cornerstone of success.', used: false },
  { id: '14', category: 'Deep Work', quote: 'Quality work requires deep focus and sustained effort.', used: false },
  { id: '15', category: 'Deep Work', quote: 'In a world of noise, silence is the rarest commodity.', used: false },
  { id: '16', category: 'Success', quote: 'Success is not final, failure is not fatal.', used: false },
  { id: '17', category: 'Success', quote: 'Your only limit is you.', used: false },
  { id: '18', category: 'Success', quote: 'Success is walking from failure to failure with no loss of enthusiasm.', used: false },
  { id: '19', category: 'Success', quote: 'The only way to do great work is to love what you do.', used: false },
  { id: '20', category: 'Success', quote: 'Every expert was once a beginner.', used: false },
]

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('Notifications are not supported')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Failed to request notification permission:', error)
      return false
    }
  }

  return false
}

export async function sendNotification(content: NotificationContent): Promise<void> {
  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted')
    return
  }

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
        payload: content,
      })
    } else {
      new Notification(content.title, {
        body: content.body,
        icon: content.icon,
        badge: content.badge,
        tag: content.tag,
        data: content.data,
      })
    }
  } catch (error) {
    console.error('Failed to send notification:', error)
  }
}

export function getRandomMotivationalQuote(): MotivationalQuote {
  const unusedQuotes = MOTIVATIONAL_QUOTES.filter((q) => !q.used)

  if (unusedQuotes.length === 0) {
    MOTIVATIONAL_QUOTES.forEach((q) => {
      q.used = false
    })
    return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
  }

  return unusedQuotes[Math.floor(Math.random() * unusedQuotes.length)]
}
