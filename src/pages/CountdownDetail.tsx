import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCountdownStore } from '../store/countdownStore'
import { useCountdownProgress } from '../hooks/useCountdownProgress'
import CountdownTimer from '../components/countdown/CountdownTimer'
import ProgressRing from '../components/countdown/ProgressRing'
import { ArrowLeft, Edit2, Trash2, Archive } from 'lucide-react'
import toast from 'react-hot-toast'

function CountdownDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { countdowns, fetchCountdowns, deleteCountdown, updateCountdown } = useCountdownStore()
  const [countdown, setCountdown] = useState(countdowns.find((c) => c.id === id))
  const progress = countdown ? useCountdownProgress(countdown.startDate, countdown.endDate) : null

  useEffect(() => {
    fetchCountdowns()
  }, [])

  useEffect(() => {
    const found = countdowns.find((c) => c.id === id)
    setCountdown(found)
  }, [countdowns, id])

  if (!countdown) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <p className="text-dark-600 dark:text-dark-400">Countdown not found</p>
        <Link to="/countdowns" className="btn-primary mt-4">
          <ArrowLeft size={16} className="inline mr-2" />
          Back
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this countdown?')) {
      await deleteCountdown(countdown.id)
      toast.success('Countdown deleted')
      navigate('/countdowns')
    }
  }

  const handleArchive = async () => {
    await updateCountdown(countdown.id, { isArchived: !countdown.isArchived })
    toast.success(countdown.isArchived ? 'Restored' : 'Archived')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/countdowns" className="flex items-center gap-2 text-primary-500 hover:text-primary-600">
          <ArrowLeft size={20} />
          Back
        </Link>
        <div className="flex gap-2">
          <Link to={`/countdown/${countdown.id}/edit`} className="btn-secondary btn-sm">
            <Edit2 size={16} className="inline mr-1" />
            Edit
          </Link>
          <button onClick={handleArchive} className="btn-secondary btn-sm">
            <Archive size={16} className="inline mr-1" />
            Archive
          </button>
          <button onClick={handleDelete} className="btn-secondary btn-sm text-red-500">
            <Trash2 size={16} className="inline mr-1" />
            Delete
          </button>
        </div>
      </div>

      <div className="glass-card text-center py-8">
        <h1 className="text-4xl font-bold mb-2">{countdown.emoji} {countdown.title}</h1>
        {countdown.description && <p className="text-dark-600 dark:text-dark-400 mb-4">{countdown.description}</p>}
      </div>

      {progress && (
        <div>
          <div className="glass-card flex items-center justify-center py-8">
            <CountdownTimer startDate={countdown.startDate} endDate={countdown.endDate} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">{progress.completedDays}</div>
              <div className="text-dark-600 dark:text-dark-400">Days Completed</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">{progress.remainingDays}</div>
              <div className="text-dark-600 dark:text-dark-400">Days Remaining</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">{progress.totalDays}</div>
              <div className="text-dark-600 dark:text-dark-400">Total Days</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold text-primary-500 mb-2">{Math.round(progress.percentage)}%</div>
              <div className="text-dark-600 dark:text-dark-400">Progress</div>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-dark-600 dark:text-dark-400">Category</div>
            <div className="font-semibold text-dark-900 dark:text-white">{countdown.category || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-dark-600 dark:text-dark-400">Priority</div>
            <div className="font-semibold text-dark-900 dark:text-white">{countdown.priority || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm text-dark-600 dark:text-dark-400">Start Date</div>
            <div className="font-semibold text-dark-900 dark:text-white">
              {new Date(countdown.startDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-dark-600 dark:text-dark-400">End Date</div>
            <div className="font-semibold text-dark-900 dark:text-white">
              {new Date(countdown.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountdownDetail
