import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from '../components/dashboard/Header'
import StatsGrid from '../components/dashboard/StatsGrid'
import ChartCard from '../components/dashboard/ChartCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import TopContent from '../components/dashboard/TopContent'
import type { StatItem, ChartDataPoint, ActivityItem, ContentItem } from '../types'

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

describe('Header', () => {
  it('renders title', () => {
    render(<Header title="My Dashboard" />)
    expect(screen.getByText('My Dashboard')).toBeInTheDocument()
  })

  it('renders subtitle', () => {
    render(<Header title="Test" subtitle="Description here" />)
    expect(screen.getByText('Description here')).toBeInTheDocument()
  })

  it('renders user avatar', () => {
    render(<Header title="Test" userInitials="RP" />)
    expect(screen.getByText('RP')).toBeInTheDocument()
  })

  it('has banner role', () => {
    render(<Header title="Test" />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// StatsGrid
// ---------------------------------------------------------------------------

describe('StatsGrid', () => {
  const stats: StatItem[] = [
    { label: 'Views', value: '100K', change: '+10%', changeType: 'positive', icon: '👁️' },
    { label: 'Revenue', value: '$5K', change: '-2%', changeType: 'negative', icon: '💰' },
  ]

  it('renders all stats', () => {
    render(<StatsGrid stats={stats} />)
    expect(screen.getByText('Views')).toBeInTheDocument()
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('100K')).toBeInTheDocument()
    expect(screen.getByText('$5K')).toBeInTheDocument()
  })

  it('shows change badges', () => {
    render(<StatsGrid stats={stats} />)
    expect(screen.getByText('+10%')).toBeInTheDocument()
    expect(screen.getByText('-2%')).toBeInTheDocument()
  })

  it('renders empty when no stats', () => {
    const { container } = render(<StatsGrid stats={[]} />)
    expect(container.querySelectorAll('[role="listitem"]')).toHaveLength(0)
  })
})

// ---------------------------------------------------------------------------
// ChartCard
// ---------------------------------------------------------------------------

describe('ChartCard', () => {
  const data: ChartDataPoint[] = [
    { label: 'Mon', value: 10 },
    { label: 'Tue', value: 20 },
    { label: 'Wed', value: 15 },
  ]

  it('renders title', () => {
    render(<ChartCard title="Weekly Views" data={data} />)
    expect(screen.getByText('Weekly Views')).toBeInTheDocument()
  })

  it('renders chart labels', () => {
    render(<ChartCard data={data} />)
    expect(screen.getByText('Mon')).toBeInTheDocument()
    expect(screen.getByText('Tue')).toBeInTheDocument()
  })

  it('renders summaries', () => {
    render(
      <ChartCard
        data={data}
        summaries={[{ label: 'Average', value: '15' }]}
      />,
    )
    expect(screen.getByText('Average')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// RecentActivity
// ---------------------------------------------------------------------------

describe('RecentActivity', () => {
  const activities: ActivityItem[] = [
    { type: 'test', message: 'Something happened', time: '1h ago', icon: '🎉' },
  ]

  it('renders activities', () => {
    render(<RecentActivity activities={activities} />)
    expect(screen.getByText('Something happened')).toBeInTheDocument()
    expect(screen.getByText('1h ago')).toBeInTheDocument()
  })

  it('shows empty state', () => {
    render(<RecentActivity activities={[]} />)
    expect(screen.getByText('No recent activity')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// TopContent
// ---------------------------------------------------------------------------

describe('TopContent', () => {
  const items: ContentItem[] = [
    { title: 'My Post', views: '10K', engagement: '5%', revenue: '$100', thumbnail: '📹' },
  ]

  it('renders items', () => {
    render(<TopContent items={items} />)
    expect(screen.getByText('My Post')).toBeInTheDocument()
    expect(screen.getByText('10K views')).toBeInTheDocument()
  })

  it('shows empty state', () => {
    render(<TopContent items={[]} />)
    expect(screen.getByText('No content available')).toBeInTheDocument()
  })
})
