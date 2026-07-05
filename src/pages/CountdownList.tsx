import { useEffect, useState } from 'react'
import { useCountdownStore } from '../store/countdownStore'
import CountdownCard from '../components/countdown/CountdownCard'
import { Link } from 'react-router-dom'
import { Plus, Filter } from 'lucide-react'

function CountdownList() {
  const { countdowns, fetchCountdowns, deleteCountdown, updateCountdown } = useCountdownStore()
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    fetchCountdowns()
  }, [])

  const filteredCountdowns = countdowns.filter((c) => {
    if (!c.isArchived) {
      if (filterCategory !== 'all' && c.category !== filterCategory) return false
      if (filterPriority !== 'all' && c.priority !== filterPriority) return false
      return true
    }
    return false
  })

  const categories = [...new Set(countdowns.map((c) => c.category).filter(Boolean))]

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">All Countdowns</h1>
        <Link to="/countdown/new" className="btn-primary btn-sm">
          <Plus size={16} className="inline mr-1" />
          New
        </Link>
      </div>

      <div className="glass-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Filter size={20} />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
              Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="input-field"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {filteredCountdowns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dark-600 dark:text-dark-400">No countdowns match your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountdowns.map((countdown) => (
            <CountdownCard
              key={countdown.id}
              countdown={countdown}
              onDelete={handleDelete}
              onPin={handlePin}
              onArchive={handleArchive}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CountdownList
