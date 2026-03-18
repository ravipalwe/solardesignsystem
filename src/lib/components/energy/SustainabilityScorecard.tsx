import { useMemo } from 'react'
import { useResourceObserver } from '../../hooks/useResourceObserver'
import { useDeviceEnergyProfile } from '../../hooks/useDeviceEnergyProfile'

export interface SustainabilityScorecardProps {
  /** Show detailed breakdown (default: true) */
  showDetails?: boolean
  /** Show recommendations (default: true) */
  showRecommendations?: boolean
  /** Target score (default: 80) */
  targetScore?: number
  /** Compact mode */
  compact?: boolean
  /** Optional className */
  className?: string
}

interface ScoreCategory {
  label: string
  score: number
  maxScore: number
  detail: string
}

function getScoreColor(score: number, target: number) {
  const ratio = score / target
  if (ratio >= 1) return { color: 'text-accent-success', bgColor: 'bg-accent-success/20' }
  if (ratio >= 0.7) return { color: 'text-accent-primary', bgColor: 'bg-accent-primary/20' }
  if (ratio >= 0.5) return { color: 'text-accent-solar-amber', bgColor: 'bg-accent-solar-amber/20' }
  return { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20' }
}

const SustainabilityScorecard = ({
  showDetails = true,
  showRecommendations = true,
  targetScore = 80,
  compact = false,
  className = '',
}: SustainabilityScorecardProps) => {
  const resources = useResourceObserver()
  const profile = useDeviceEnergyProfile()

  const categories = useMemo((): ScoreCategory[] => {
    const cats: ScoreCategory[] = []

    // Page weight (0-25)
    const weightMB = resources.totalKB / 1024
    let weightScore = 25
    if (weightMB > 5) weightScore = 0
    else if (weightMB > 2) weightScore = 5
    else if (weightMB > 1) weightScore = 10
    else if (weightMB > 0.5) weightScore = 15
    else if (weightMB > 0.2) weightScore = 20
    cats.push({
      label: 'Page Weight',
      score: weightScore,
      maxScore: 25,
      detail: `${weightMB.toFixed(1)} MB total`,
    })

    // Carbon per view (0-25)
    let carbonScore = 25
    if (resources.carbonGrams > 2) carbonScore = 0
    else if (resources.carbonGrams > 1.5) carbonScore = 5
    else if (resources.carbonGrams > 1.0) carbonScore = 10
    else if (resources.carbonGrams > 0.5) carbonScore = 15
    else if (resources.carbonGrams > 0.2) carbonScore = 20
    cats.push({
      label: 'Carbon Footprint',
      score: carbonScore,
      maxScore: 25,
      detail: `${resources.carbonGrams.toFixed(2)}g CO₂ per view`,
    })

    // Resource efficiency (0-20)
    const imageRatio = resources.breakdown.images / Math.max(resources.totalBytes, 1)
    let efficiencyScore = 20
    if (imageRatio > 0.7) efficiencyScore = 5
    else if (imageRatio > 0.5) efficiencyScore = 10
    else if (imageRatio > 0.3) efficiencyScore = 15
    cats.push({
      label: 'Resource Efficiency',
      score: efficiencyScore,
      maxScore: 20,
      detail: `${(imageRatio * 100).toFixed(0)}% images, ${resources.resourceCount} resources`,
    })

    // Dark mode (0-15)
    const darkModeScore = profile.prefersDarkMode ? 15 : 5
    cats.push({
      label: 'Dark Mode',
      score: darkModeScore,
      maxScore: 15,
      detail: profile.prefersDarkMode ? 'Active (OLED savings)' : 'Not active',
    })

    // Motion (0-15)
    const motionScore = profile.prefersReducedMotion ? 15 : 10
    cats.push({
      label: 'Motion Efficiency',
      score: motionScore,
      maxScore: 15,
      detail: profile.prefersReducedMotion ? 'Reduced motion' : 'Standard animations',
    })

    return cats
  }, [resources, profile])

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0)
  const maxPossible = categories.reduce((sum, c) => sum + c.maxScore, 0)
  const colors = getScoreColor(totalScore, targetScore)

  const recommendations = useMemo(() => {
    const recs: string[] = []
    if (resources.totalKB > 500) recs.push('Reduce page weight — consider lazy loading images')
    if (resources.breakdown.images > resources.totalBytes * 0.5) recs.push('Images account for >50% of weight — use WebP/AVIF or lower resolution')
    if (resources.breakdown.scripts > 100 * 1024) recs.push('JavaScript bundle is large — consider code splitting')
    if (!profile.prefersDarkMode) recs.push('Enable dark mode for OLED energy savings')
    if (resources.carbonGrams > 1.0) recs.push('Carbon footprint exceeds 1g — target <0.5g per view')
    if (recs.length === 0) recs.push('Great job! This page meets sustainability targets.')
    return recs
  }, [resources, profile])

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 bg-background-cardSurface border border-borders-subtle rounded-card ${className}`}
        role="status"
        aria-label={`Sustainability score: ${totalScore} out of ${maxPossible}`}
      >
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${colors.bgColor}`}>
          <span className={`text-lg font-bold ${colors.color}`}>{totalScore}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-text-primary">Sustainability Score</p>
          <p className="text-xs text-text-tertiary">of {maxPossible} points</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-6 ${className}`}
      role="region"
      aria-label="Sustainability Scorecard"
    >
      {/* Header with score */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-1">Sustainability Score</h3>
          <p className="text-xs text-text-tertiary">Target: {targetScore} points</p>
        </div>
        <div className={`flex items-center justify-center w-14 h-14 rounded-full ${colors.bgColor}`}>
          <div className="text-center">
            <span className={`text-xl font-bold ${colors.color}`}>{totalScore}</span>
            <p className="text-xs text-text-tertiary">/{maxPossible}</p>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      {showDetails && (
        <div className="space-y-3 mb-6">
          {categories.map((cat) => {
            const pct = (cat.score / cat.maxScore) * 100
            const catColor = getScoreColor(cat.score, cat.maxScore * 0.7)
            return (
              <div key={cat.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-text-primary">{cat.label}</span>
                  <span className="text-xs text-text-tertiary">
                    {cat.score}/{cat.maxScore}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-background-badgeNeutral rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${catColor.color.replace('text-', 'bg-')}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-text-tertiary">{cat.detail}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Recommendations */}
      {showRecommendations && recommendations.length > 0 && (
        <div className="pt-4 border-t border-borders-subtle">
          <h4 className="text-xs font-semibold text-text-primary mb-2">Recommendations</h4>
          <ul className="space-y-1.5">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-accent-primary mt-0.5" aria-hidden="true">→</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SustainabilityScorecard
