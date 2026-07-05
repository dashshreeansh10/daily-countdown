import { useEffect, useState } from 'react'
import { useCountdownProgress } from '../../hooks/useCountdownProgress'

interface CountdownTimerProps {
  startDate: Date
  endDate: Date
  showSeconds?: boolean
}

function CountdownTimer({ startDate, endDate, showSeconds = true }: CountdownTimerProps) {
  const progress = useCountdownProgress(startDate, endDate)
  const [displayTime, setDisplayTime] = useState('00:00:00')

  useEffect(() => {
    const hours = String(progress.hoursRemaining).padStart(2, '0')
    const minutes = String(progress.minutesRemaining).padStart(2, '0')
    const seconds = String(progress.secondsRemaining).padStart(2, '0')

    if (showSeconds) {
      setDisplayTime(`${hours}:${minutes}:${seconds}`)
    } else {
      setDisplayTime(`${hours}:${minutes}`)
    }
  }, [progress, showSeconds])

  return (
    <div className="text-center">
      <div className="text-5xl sm:text-6xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700 mb-2">
        {displayTime}
      </div>
      <div className="text-sm text-dark-600 dark:text-dark-400">
        {progress.remainingDays} days remaining
      </div>
    </div>
  )
}

export default CountdownTimer
