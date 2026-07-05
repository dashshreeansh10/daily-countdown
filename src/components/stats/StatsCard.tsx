import React from 'react'

interface StatsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'error'
  trend?: 'up' | 'down'
}

function StatsCard({ title, value, icon, color = 'primary', trend }: StatsCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  }

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-dark-600 dark:text-dark-400">{title}</h3>
        {icon && <div className={`p-2 rounded-lg ${colorClasses[color]}`}>{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white">{value}</div>
        {trend && (
          <div className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
