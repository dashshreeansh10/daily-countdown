import { useNavigate } from 'react-router-dom'
import { useCountdownStore } from '../store/countdownStore'
import CountdownForm from '../components/forms/CountdownForm'
import { Countdown } from '../types/countdown'
import { useState } from 'react'

function CreateCountdown() {
  const navigate = useNavigate()
  const { addCountdown } = useCountdownStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: Omit<Countdown, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true)
    try {
      await addCountdown(data)
      navigate('/countdowns')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Create New Countdown</h1>
        <p className="text-dark-600 dark:text-dark-400">Start tracking your journey towards your goals</p>
      </div>

      <div className="glass-card p-6">
        <CountdownForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default CreateCountdown
