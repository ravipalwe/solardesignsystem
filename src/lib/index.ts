// ============================================================================
// Solar Design System v2.0 — Public API
// ============================================================================

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

export {
  // Dashboard
  Header,
  StatsGrid,
  ChartCard,
  RecentActivity,
  TopContent,
  // Energy-aware
  EnergyModeIndicator,
  CarbonFootprint,
  ClickToLoadMedia,
  GridStatusBadge,
  DataCostBadge,
  CarbonBudgetBar,
  AdaptiveImage,
  DeferredContent,
  PrintCarbonLabel,
  SustainabilityScorecard,
  // Form
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Button,
  // UI
  Card,
  Badge,
  Avatar,
  Skeleton,
  Alert,
  Tooltip,
  Modal,
  Tabs,
  ToastProvider,
  useToast,
} from './components'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export { EnergyAwareProvider, useEnergyContext } from './context/EnergyContext'
export type { EnergyAwareProviderProps, EnergyContextValue } from './context/EnergyContext'

export { ThemeProvider, useTheme, createTheme } from './context/ThemeContext'
export type { SolarTheme, ThemeTokens, ThemeProviderProps, ThemeContextValue } from './context/ThemeContext'

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export {
  useGridIntensity,
  getIntensityLevel,
  getSuggestedMode,
  useCarbonCost,
  calculateCarbonGrams,
  getImpactLevel,
  getComparison,
  useDeviceEnergyProfile,
  useVisibilityPause,
  useResourceObserver,
  useCarbonBudget,
} from './hooks'

export type {
  EnergyProfile,
  EnergyBudget,
  BatteryInfo,
  NetworkInfo,
  VisibilityPauseOptions,
  VisibilityPauseState,
  ResourceBreakdown,
  ResourceObserverState,
  CarbonBudgetState,
  CarbonBudgetOptions,
  BudgetStatus,
} from './hooks'

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

export { tokens, colors, spacing, radii, fontFamily, letterSpacing } from './tokens'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type {
  TimeRange,
  EnergyMode,
  GridIntensityLevel,
  MediaType,
  SizeLevel,
  ImpactLevel,
  StatItem,
  HeaderProps,
  StatsGridProps,
  ChartDataPoint,
  ChartCardProps,
  ActivityItem,
  RecentActivityProps,
  ContentItem,
  TopContentProps,
  EnergyModeIndicatorProps,
  CarbonFootprintProps,
  ClickToLoadMediaProps,
  GridStatusBadgeProps,
  DataCostBadgeProps,
} from './types'
