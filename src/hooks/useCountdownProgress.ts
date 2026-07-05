import { useState, useEffect } from 'react'
import { CountdownProgress } from '../types/countdown'

export function useCountdownProgress(startDate: Date, endDate: Date) {
  const [progress, setProgress] = useState<CountdownProgress>({
    countdownId: '',
    totalDays: 0,
    completedDays: 0,
    remainingDays: 0,
    percentage: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    secondsRemaining: 0,
  })

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date()
      const start = new Date(startDate)
      const end = new Date(endDate)

      const totalTime = end.getTime() - start.getTime()
      const elapsedTime = now.getTime() - start.getTime()
      const remainingTime = end.getTime() - now.getTime()

      const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24))
      const completedDays = Math.floor(elapsedTime / (1000 * 60 * 60 * 24))
      const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24))
      const percentage = (elapsedTime / totalTime) * 100

      const hoursRemaining = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutesRemaining = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      const secondsRemaining = Math.floor((remainingTime % (1000 * 60)) / 1000)

      setProgress({
        countdownId: '',
        totalDays: Math.max(0, totalDays),
        completedDays: Math.max(0, completedDays),
        remainingDays: Math.max(0, remainingDays),
        percentage: Math.min(100, Math.max(0, percentage)),
        hoursRemaining: Math.max(0, hoursRemaining),
        minutesRemaining: Math.max(0, minutesRemaining),
        secondsRemaining: Math.max(0, secondsRemaining),
      })
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)

    return () => clearInterval(interval)
  }, [startDate, endDate])

  return progress
}
