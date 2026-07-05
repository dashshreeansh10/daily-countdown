import { useEffect, useState } from 'react'
import { useCountdownStore } from '../store/countdownStore'
import StatsCard from '../components/stats/StatsCard'
import { Calendar, TrendingUp, Award, Zap } from 'lucide-react'

function Statistics() {
  const { countdowns, fetchCountdowns } = useCountdownStore()
  const [stats, setStats] = useState({
    totalCountdowns: 0,
    activeCountdowns: 0,
    completedCountdowns: 0,
    avgCompletion: 0,
  })

  useEffect(() => {
    fetchCountdowns()
  }, [])

  useEffect(() => {
    const activeCountdowns = countdowns.filter((c) => !c.isArchived).length
    const completedCountdowns = countdowns.filter(
      (c) => c.endDate < new Date() && !c.isArchived
    ).length

    const avgCompletion = activeCountdowns > 0
      ? countdowns
          .filter((c) => !c.isArchived)
          .reduce((acc, c) => {
            const total = c.endDate.getTime() - c.startDate.getTime()
            const elapsed = Date.now() - c.startDate.getTime()
            return acc + Math.min(100, (elapsed / total) * 100)
          }, 0) / activeCountdowns
      : 0

    setStats({
      totalCountdowns: countdowns.length,
      activeCountdowns,
      completedCountdowns,
      avgCompletion: Math.round(avgCompletion),
    })
  }, [countdowns])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Statistics</h1>
        <p className="text-dark-600 dark:text-dark-400">Track your progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Countdowns"
          value={stats.totalCountdowns}
          icon={<Calendar size={24} />}
          color="primary"
        />
        <StatsCard
          title="Active"
          value={stats.activeCountdowns}
          icon={<Zap size={24} />}
          color="success"
        />
        <StatsCard
          title="Completed"
          value={stats.completedCountdowns}
          icon={<Award size={24} />}
          color="warning"
        />
        <StatsCard
          title="Avg Progress"
          value={`${stats.avgCompletion}%`}
          icon={<TrendingUp size={24} />}
          color="primary"
        />
      </div>
    </div>
  )
}

export default Statistics
