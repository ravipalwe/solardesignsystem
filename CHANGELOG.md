# Changelog

## 2.0.0 (2026-03-17)

### Breaking Changes
- Complete library restructure with new package exports

### Features
- **Dashboard components**: Header, StatsGrid, ChartCard, RecentActivity, TopContent
- **Energy-aware components**: EnergyModeIndicator, CarbonFootprint, ClickToLoadMedia, GridStatusBadge, DataCostBadge, CarbonBudgetBar, AdaptiveImage, DeferredContent, PrintCarbonLabel, SustainabilityScorecard
- **Form components**: Button, Input, Textarea, Select, Checkbox, Radio, Switch
- **Hooks**: useGridIntensity, useCarbonCost, useDeviceEnergyProfile, useVisibilityPause, useResourceObserver, useCarbonBudget
- **Context**: EnergyAwareProvider with useEnergyContext
- **Design tokens**: Colors, spacing, radii, typography as JS constants
- **Storybook**: 80 stories across all component categories
- **Testing**: 77 unit tests with Vitest + React Testing Library

### Infrastructure
- Dual ESM/UMD library build via Vite
- TypeScript declarations
- Tailwind CSS configuration export
- Storybook 10 with a11y addon

## 1.0.0

- Initial release with dashboard showcase app
