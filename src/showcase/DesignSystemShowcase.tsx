import { useState } from 'react'
import {
  Header,
  StatsGrid,
  ChartCard,
  RecentActivity,
  TopContent,
} from '../lib'
import type { StatItem, ChartDataPoint, ActivityItem, ContentItem } from '../lib'

// ---------------------------------------------------------------------------
// Sample data — kept in the showcase only, never inside library components
// ---------------------------------------------------------------------------

const sampleStats: StatItem[] = [
  { label: 'Total Views', value: '487.2K', change: '+12.5%', changeType: 'positive', icon: '👁️' },
  { label: 'Subscribers', value: '+4.8K', change: '+8.3%', changeType: 'positive', icon: '👥' },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', changeType: 'positive', icon: '💬' },
  { label: 'Revenue', value: '$9.8K', change: '+15.2%', changeType: 'positive', icon: '💰' },
]

const sampleChartData: ChartDataPoint[] = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 48 },
  { label: 'Thu', value: 61 },
  { label: 'Fri', value: 55 },
  { label: 'Sat', value: 68 },
  { label: 'Sun', value: 72 },
]

const sampleActivities: ActivityItem[] = [
  { type: 'new_subscriber', message: 'Gained 150 new subscribers', time: '2 hours ago', icon: '👥' },
  { type: 'milestone', message: 'Reached 50K total views milestone', time: '5 hours ago', icon: '🎉' },
  { type: 'comment', message: 'New comment on "10 Productivity Hacks"', time: '8 hours ago', icon: '💬' },
  { type: 'revenue', message: 'Received $450 in revenue', time: '1 day ago', icon: '💰' },
]

const sampleContent: ContentItem[] = [
  { title: '10 Productivity Hacks That Changed My Life', views: '125K', engagement: '6.2%', revenue: '$1.2K', thumbnail: '📹' },
  { title: 'Building a Side Project in 30 Days', views: '98K', engagement: '5.8%', revenue: '$950', thumbnail: '🎬' },
  { title: 'My Morning Routine for Success', views: '87K', engagement: '5.5%', revenue: '$820', thumbnail: '📺' },
]

// ---------------------------------------------------------------------------
// Showcase
// ---------------------------------------------------------------------------

export const DesignSystemShowcase = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="min-h-screen bg-background-appCanvas">
      <Header
        title="Creator Analytics"
        subtitle="Track your content performance"
        userInitials="JD"
      />

      <main className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Time Range Selector */}
        <div className="mb-6 flex gap-2" role="group" aria-label="Time range">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              aria-pressed={timeRange === range}
              className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                timeRange === range
                  ? 'bg-accent-primary text-black'
                  : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>

        <StatsGrid stats={sampleStats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ChartCard
            title="Views Over Time"
            data={sampleChartData}
            summaries={[
              { label: 'Average Daily Views', value: '57.3K' },
              { label: 'Peak Day', value: '72K' },
            ]}
          />
          <TopContent items={sampleContent} />
        </div>

        <div className="mt-6">
          <RecentActivity activities={sampleActivities} />
        </div>
      </main>
    </div>
  )
}
