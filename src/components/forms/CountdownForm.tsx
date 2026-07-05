import { useState } from 'react'
import { Countdown } from '../../types/countdown'
import { validateCountdownTitle, validateDateRange } from '../../utils/validationUtils'
import toast from 'react-hot-toast'

interface CountdownFormProps {
  initialData?: Countdown
  onSubmit: (data: Omit<Countdown, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  isLoading?: boolean
}

function CountdownForm({ initialData, onSubmit, isLoading = false }: CountdownFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
    emoji: initialData?.emoji || '📅',
    color: initialData?.color || '#0ea5e9',
    category: initialData?.category || '',
    priority: initialData?.priority || 'medium',
    timezone: initialData?.timezone || 'UTC',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Validate title
    const titleError = validateCountdownTitle(formData.title)
    if (titleError) newErrors.title = titleError

    // Validate dates
    const startDate = new Date(formData.startDate)
    const endDate = new Date(formData.endDate)
    const dateError = validateDateRange(startDate, endDate)
    if (dateError) newErrors.endDate = dateError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description,
        startDate,
        endDate,
        emoji: formData.emoji,
        color: formData.color,
        category: formData.category,
        priority: formData.priority as 'low' | 'medium' | 'high',
        timezone: formData.timezone,
        isPinned: false,
        isArchived: false,
      })
      toast.success('Countdown created successfully!')
    } catch (error) {
      toast.error('Failed to create countdown')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
          Countdown Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g., JEE Preparation"
          className="input-field"
          disabled={isLoading}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add any notes or details..."
          className="input-field h-24 resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input-field"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input-field"
            disabled={isLoading}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Emoji
          </label>
          <input
            type="text"
            name="emoji"
            value={formData.emoji}
            onChange={handleChange}
            maxLength={2}
            className="input-field"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Color
          </label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-full h-12 rounded-lg cursor-pointer border-2 border-dark-200 dark:border-dark-700"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Exam, Fitness, Vacation"
            className="input-field"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
            disabled={isLoading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? 'Creating...' : 'Create Countdown'}
      </button>
    </form>
  )
}

export default CountdownForm
