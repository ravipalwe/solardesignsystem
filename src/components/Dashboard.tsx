import { useState } from 'react'
import Header from './Header'
import StatsGrid from './StatsGrid'
import ChartCard from './ChartCard'
import RecentActivity from './RecentActivity'
import TopContent from './TopContent'

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="min-h-screen bg-background-appCanvas">
      <Header />
      <main className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                timeRange === range
                  ? 'bg-accent-primary text-black border-none'
                  : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <StatsGrid timeRange={timeRange} />

        {/* Charts and Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard timeRange={timeRange} />
          <TopContent timeRange={timeRange} />
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
          <RecentActivity />
        </div>
      </main>
    </div>
  )
}

export default Dashboard

