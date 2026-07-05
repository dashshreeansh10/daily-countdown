import { format, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

export function formatDate(date: Date, fmt: string = 'MMM dd, yyyy'): string {
  return format(new Date(date), fmt)
}

export function getDaysBetween(start: Date, end: Date): number {
  return differenceInDays(new Date(end), new Date(start))
}

export function getHoursBetween(start: Date, end: Date): number {
  return differenceInHours(new Date(end), new Date(start))
}

export function getMinutesBetween(start: Date, end: Date): number {
  return differenceInMinutes(new Date(end), new Date(start))
}

export function getSecondsBetween(start: Date, end: Date): number {
  return differenceInSeconds(new Date(end), new Date(start))
}

export function isToday(date: Date): boolean {
  const today = new Date()
  const checkDate = new Date(date)
  return today.toDateString() === checkDate.toDateString()
}

export function isDatePast(date: Date): boolean {
  return new Date(date) < new Date()
}

export function getProgressPercentage(start: Date, end: Date): number {
  const totalDays = getDaysBetween(start, end)
  const completedDays = getDaysBetween(start, new Date())
  return Math.min(100, Math.max(0, (completedDays / totalDays) * 100))
}
