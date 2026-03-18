// ============================================================================
// Solar Design System — Type Definitions
// ============================================================================

// ---------------------------------------------------------------------------
// Common
// ---------------------------------------------------------------------------

export type TimeRange = '7d' | '30d' | '90d'

export type EnergyMode = 'eco' | 'standard' | 'rich'

export type GridIntensityLevel = 'very-low' | 'low' | 'moderate' | 'high' | 'very-high'

export type MediaType = 'image' | 'video'

export type SizeLevel = 'light' | 'moderate' | 'heavy' | 'very-heavy'

export type ImpactLevel = 'excellent' | 'good' | 'fair' | 'high'

// ---------------------------------------------------------------------------
// Dashboard Components
// ---------------------------------------------------------------------------

export interface StatItem {
  /** Metric label displayed above the value */
  label: string
  /** Formatted metric value */
  value: string
  /** Change indicator (e.g., "+12.5%") */
  change: string
  /** Direction of the change */
  changeType: 'positive' | 'negative'
  /** Emoji or icon string */
  icon: string
}

export interface HeaderProps {
  /** Main heading text */
  title?: string
  /** Subtitle / description */
  subtitle?: string
  /** User initials shown in avatar */
  userInitials?: string
  /** Optional callback when avatar is clicked */
  onAvatarClick?: () => void
}

export interface StatsGridProps {
  /** Array of stat items to display */
  stats: StatItem[]
  /** Number of columns on large screens (default: items length or 4) */
  columns?: 1 | 2 | 3 | 4
}

export interface ChartDataPoint {
  /** X-axis label */
  label: string
  /** Numeric value for the bar height */
  value: number
}

export interface ChartCardProps {
  /** Card heading */
  title?: string
  /** Data points for the bar chart */
  data: ChartDataPoint[]
  /** Summary items shown below the chart */
  summaries?: { label: string; value: string }[]
}

export interface ActivityItem {
  /** Activity type identifier */
  type: string
  /** Human-readable activity message */
  message: string
  /** Relative or absolute time string */
  time: string
  /** Emoji or icon string */
  icon: string
}

export interface RecentActivityProps {
  /** Card heading */
  title?: string
  /** List of activities to display */
  activities: ActivityItem[]
}

export interface ContentItem {
  /** Content title */
  title: string
  /** View count (formatted) */
  views: string
  /** Engagement rate (formatted) */
  engagement: string
  /** Revenue (formatted) */
  revenue: string
  /** Emoji/icon thumbnail */
  thumbnail: string
}

export interface TopContentProps {
  /** Card heading */
  title?: string
  /** List of content items to display */
  items: ContentItem[]
}

// ---------------------------------------------------------------------------
// Energy-Aware Components
// ---------------------------------------------------------------------------

export interface EnergyModeIndicatorProps {
  /** Current energy mode. If not provided, auto-detected based on time of day */
  mode?: EnergyMode
  /** Show detailed description below the label */
  showDescription?: boolean
  /** Compact mode — inline badge instead of card */
  compact?: boolean
  /** Optional className for the root element */
  className?: string
}

export interface CarbonFootprintProps {
  /** Page size in KB. If not provided, estimated via Performance API */
  pageSizeKB?: number
  /** Show the detailed breakdown section */
  showBreakdown?: boolean
  /** Server location label for display */
  serverLocation?: string
  /** Compact mode — inline badge */
  compact?: boolean
  /** Carbon intensity override (gCO2/kWh). Default: 475 */
  carbonIntensity?: number
  /** Optional className for the root element */
  className?: string
}

export interface ClickToLoadMediaProps {
  /** Media source URL */
  src: string
  /** Whether the media is an image or video */
  type: MediaType
  /** Alt text for images / accessible label */
  alt?: string
  /** Low-res thumbnail URL (shown blurred behind the placeholder) */
  thumbnail?: string
  /** Estimated data size in KB */
  dataSizeKB?: number
  /** Carbon cost override in grams */
  carbonCostGrams?: number
  /** CSS width value */
  width?: string
  /** CSS height value */
  height?: string
  /** Tailwind border-radius class */
  rounded?: string
  /** Callback fired after media finishes loading */
  onLoad?: () => void
  /** Callback fired if media fails to load */
  onError?: (error: Error) => void
  /** Optional className for the root element */
  className?: string
}

export interface GridStatusBadgeProps {
  /** Grid region label */
  region?: string
  /** Manual carbon intensity override (gCO2/kWh) */
  carbonIntensity?: number
  /** Show the detailed info section */
  showDetails?: boolean
  /** Compact mode — inline badge */
  compact?: boolean
  /** Polling interval in ms (default: 300000 = 5 min). Set 0 to disable polling */
  pollInterval?: number
  /** Optional className for the root element */
  className?: string
}

export interface DataCostBadgeProps {
  /** Action label (e.g., "Load Video", "Download File") */
  label: string
  /** Data size in KB */
  dataSizeKB: number
  /** Show the carbon cost row */
  showCarbonCost?: boolean
  /** Show the estimated financial cost row */
  showFinancialCost?: boolean
  /** Financial cost per MB in cents (default: 10) */
  costPerMB?: number
  /** Callback when the user clicks "Continue Anyway" */
  onAcknowledge?: () => void
  /** Emoji or icon for the action */
  icon?: string
  /** Allow the badge to be dismissed */
  dismissible?: boolean
  /** Optional className for the root element */
  className?: string
}
