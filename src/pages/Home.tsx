import { useEffect } from 'react'
import { useCountdownStore } from '../store/countdownStore'
import CountdownCard from '../components/countdown/CountdownCard'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

function Home() {
  const { countdowns, fetchCountdowns, deleteCountdown, updateCountdown } = useCountdownStore()

  useEffect(() => {
    fetchCountdowns()
  }, [])

  const pinnedCountdowns = countdowns.filter((c) => c.isPinned && !c.isArchived)
  const otherCountdowns = countdowns.filter((c) => !c.isPinned && !c.isArchived)

  const handleDelete = async (id: string) => {
    await deleteCountdown(id)
  }

  const handlePin = async (id: string) => {
    const countdown = countdowns.find((c) => c.id === id)
    if (countdown) {
      await updateCountdown(id, { isPinned: !countdown.isPinned })
    }
  }

  const handleArchive = async (id: string) => {
    const countdown = countdowns.find((c) => c.id === id)
    if (countdown) {
      await updateCountdown(id, { isArchived: !countdown.isArchived })
    }
  }

  if (countdowns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-2">No Countdowns Yet</h2>
        <p className="text-dark-600 dark:text-dark-400 mb-6">Start your journey by creating your first countdown</p>
        <Link to="/countdown/new" className="btn-primary">
          <Plus size={20} className="inline mr-2" />
          Create Countdown
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Welcome back!</h2>
        <Link to="/countdown/new" className="btn-primary btn-sm">
          <Plus size={16} className="inline mr-1" />
          New
        </Link>
      </div>

      {pinnedCountdowns.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">📌 Pinned</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedCountdowns.map((countdown) => (
              <CountdownCard
                key={countdown.id}
                countdown={countdown}
                onDelete={handleDelete}
                onPin={handlePin}
                onArchive={handleArchive}
              />
            ))}
          </div>
        </div>
      )}

      {otherCountdowns.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">All Countdowns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCountdowns.map((countdown) => (
              <CountdownCard
                key={countdown.id}
                countdown={countdown}
                onDelete={handleDelete}
                onPin={handlePin}
                onArchive={handleArchive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
