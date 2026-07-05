import { Countdown } from '../../types/countdown'
import { Link } from 'react-router-dom'
import { useCountdownProgress } from '../../hooks/useCountdownProgress'
import { Pin, Archive, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface CountdownCardProps {
  countdown: Countdown
  onDelete?: (id: string) => void
  onPin?: (id: string) => void
  onArchive?: (id: string) => void
}

function CountdownCard({ countdown, onDelete, onPin, onArchive }: CountdownCardProps) {
  const progress = useCountdownProgress(countdown.startDate, countdown.endDate)

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this countdown?')) {
      onDelete?.(countdown.id)
      toast.success('Countdown deleted')
    }
  }

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault()
    onPin?.(countdown.id)
    toast.success(countdown.isPinned ? 'Unpinned' : 'Pinned')
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.preventDefault()
    onArchive?.(countdown.id)
    toast.success(countdown.isArchived ? 'Restored' : 'Archived')
  }

  return (
    <Link
      to={`/countdown/${countdown.id}`}
      className="glass-card hover:shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{countdown.emoji || '📅'}</span>
          <div>
            <h3 className="font-bold text-dark-900 dark:text-white group-hover:text-primary-500 transition-colors">
              {countdown.title}
            </h3>
            <p className="text-sm text-dark-600 dark:text-dark-400">{countdown.category || 'General'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {countdown.isPinned && <Pin size={16} className="text-primary-500" fill="currentColor" />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-center">
        <div className="bg-dark-100 dark:bg-dark-800 rounded-lg p-2">
          <div className="font-bold text-dark-900 dark:text-white">{progress.completedDays}</div>
          <div className="text-xs text-dark-600 dark:text-dark-400">Completed</div>
        </div>
        <div className="bg-dark-100 dark:bg-dark-800 rounded-lg p-2">
          <div className="font-bold text-dark-900 dark:text-white">{progress.remainingDays}</div>
          <div className="text-xs text-dark-600 dark:text-dark-400">Remaining</div>
        </div>
        <div className="bg-primary-100 dark:bg-primary-900/30 rounded-lg p-2">
          <div className="font-bold text-primary-700 dark:text-primary-300">{Math.round(progress.percentage)}%</div>
          <div className="text-xs text-primary-600 dark:text-primary-400">Done</div>
        </div>
      </div>

      <div className="w-full bg-dark-200 dark:bg-dark-700 rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all duration-500"
          style={{ width: `${progress.percentage}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-dark-200 dark:border-dark-700">
        <div className="text-xs text-dark-600 dark:text-dark-400">
          {new Date(countdown.endDate).toLocaleDateString()}
        </div>
        <div className="flex gap-1">
          <button
            onClick={handlePin}
            className="p-1.5 hover:bg-dark-100 dark:hover:bg-dark-800 rounded transition-colors"
            title="Pin"
          >
            <Pin size={14} />
          </button>
          <button
            onClick={handleArchive}
            className="p-1.5 hover:bg-dark-100 dark:hover:bg-dark-800 rounded transition-colors"
            title="Archive"
          >
            <Archive size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={14} className="text-red-500" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CountdownCard
