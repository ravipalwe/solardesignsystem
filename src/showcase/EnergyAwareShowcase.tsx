import { useState } from 'react'
import {
  EnergyModeIndicator,
  CarbonFootprint,
  ClickToLoadMedia,
  GridStatusBadge,
  DataCostBadge,
} from '../lib'

export const EnergyAwareShowcase = () => {
  const [showDataCost, setShowDataCost] = useState(true)

  return (
    <div className="min-h-screen bg-background-appCanvas">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold text-text-primary mb-2"
            style={{ letterSpacing: '-0.01em' }}
          >
            Energy-Aware Components
          </h1>
          <p className="text-sm text-text-secondary">
            Planet-first components for sustainable digital experiences
          </p>
        </div>

        {/* Section 1: Energy Mode & Grid Status */}
        <section className="mb-8" aria-labelledby="system-status-heading">
          <h2 id="system-status-heading" className="text-lg font-semibold text-text-primary mb-4">
            System Status
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3
                className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3"
                style={{ letterSpacing: '0.05em' }}
              >
                Energy Mode Indicator
              </h3>
              <EnergyModeIndicator showDescription={true} />
              <div className="mt-3 flex gap-2">
                <EnergyModeIndicator mode="eco" compact />
                <EnergyModeIndicator mode="standard" compact />
                <EnergyModeIndicator mode="rich" compact />
              </div>
            </div>

            <div>
              <h3
                className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3"
                style={{ letterSpacing: '0.05em' }}
              >
                Grid Status Badge
              </h3>
              <GridStatusBadge showDetails region="California, USA" />
              <div className="mt-3 flex gap-2">
                <GridStatusBadge carbonIntensity={180} compact />
                <GridStatusBadge carbonIntensity={520} compact />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Carbon Footprint */}
        <section className="mb-8" aria-labelledby="carbon-heading">
          <h2 id="carbon-heading" className="text-lg font-semibold text-text-primary mb-4">
            Carbon Impact
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3
                className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3"
                style={{ letterSpacing: '0.05em' }}
              >
                Page Carbon Footprint
              </h3>
              <CarbonFootprint pageSizeKB={250} showBreakdown serverLocation="Global CDN" />
            </div>

            <div>
              <h3
                className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3"
                style={{ letterSpacing: '0.05em' }}
              >
                Compact Display
              </h3>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
                <p className="text-sm text-text-secondary mb-4">
                  Carbon badges can be embedded inline in your UI:
                </p>
                <div className="flex flex-wrap gap-2">
                  <CarbonFootprint pageSizeKB={150} compact />
                  <CarbonFootprint pageSizeKB={500} compact />
                  <CarbonFootprint pageSizeKB={1200} compact />
                  <CarbonFootprint pageSizeKB={3000} compact />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Consensual Data Loading */}
        <section className="mb-8" aria-labelledby="click-load-heading">
          <h2 id="click-load-heading" className="text-lg font-semibold text-text-primary mb-4">
            Consensual Data Loading
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            Users explicitly consent to data transfer. No auto-play, no surprise bandwidth consumption.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClickToLoadMedia
              type="image"
              src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800"
              alt="Nature landscape"
              thumbnail="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=50&q=10"
              dataSizeKB={850}
              height="250px"
            />
            <ClickToLoadMedia
              type="video"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              dataSizeKB={5120}
              height="250px"
            />
          </div>
        </section>

        {/* Section 4: Data Cost Badge */}
        <section className="mb-8" aria-labelledby="data-cost-heading">
          <h2 id="data-cost-heading" className="text-lg font-semibold text-text-primary mb-4">
            Data Cost Transparency
          </h2>
          <p className="text-sm text-text-secondary mb-4">
            Show users the environmental and financial cost of data-heavy actions before they commit.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DataCostBadge label="Download PDF" icon="📄" dataSizeKB={450} dismissible />
            <DataCostBadge
              label="Load High-Res Images"
              icon="🖼️"
              dataSizeKB={2800}
              showFinancialCost
              dismissible
            />
            <DataCostBadge
              label="Stream Video HD"
              icon="🎬"
              dataSizeKB={12800}
              showFinancialCost
              onAcknowledge={() => console.log('User acknowledged cost')}
            />
          </div>

          {showDataCost && (
            <div className="mt-6 bg-accent-primary/10 border border-accent-primary/30 rounded-card p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl" aria-hidden="true">💡</span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    Why Data Cost Badges Matter
                  </h4>
                  <p className="text-xs text-text-secondary mb-3">
                    Data transfer has both environmental and financial costs. By showing these costs
                    upfront, we empower users to make informed decisions about their digital consumption.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDataCost(false)}
                    className="text-xs text-text-link hover:underline"
                  >
                    Got it, dismiss
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
