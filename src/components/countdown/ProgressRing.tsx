import React from 'react'

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  label?: string
}

function ProgressRing({ percentage, size = 200, strokeWidth = 8, label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-dark-200 dark:text-dark-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="progress-ring text-primary-500 transition-all duration-500"
        />
      </svg>
      {label && (
        <div className="absolute text-center">
          <div className="text-3xl font-bold text-dark-900 dark:text-white">{Math.round(percentage)}%</div>
          <div className="text-sm text-dark-600 dark:text-dark-400">{label}</div>
        </div>
      )}
    </div>
  )
}

export default ProgressRing
