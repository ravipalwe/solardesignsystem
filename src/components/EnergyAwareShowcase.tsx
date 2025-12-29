import { useState } from 'react'
import EnergyModeIndicator from './EnergyModeIndicator'
import CarbonFootprint from './CarbonFootprint'
import ClickToLoadMedia from './ClickToLoadMedia'
import GridStatusBadge from './GridStatusBadge'
import DataCostBadge from './DataCostBadge'

const EnergyAwareShowcase = () => {
  const [showDataCost, setShowDataCost] = useState(true)

  return (
    <div className="min-h-screen bg-background-appCanvas">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2" style={{ letterSpacing: '-0.01em' }}>
            ⚡ Energy-Aware Components
          </h1>
          <p className="text-sm text-text-secondary">
            Planet-first components for sustainable digital experiences
          </p>
        </div>

        {/* Section 1: Energy Mode & Grid Status */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">System Status</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
                Energy Mode Indicator
              </h3>
              <EnergyModeIndicator showDescription={true} />
              
              <div className="mt-3 flex gap-2">
                <EnergyModeIndicator mode="eco" compact={true} />
                <EnergyModeIndicator mode="standard" compact={true} />
                <EnergyModeIndicator mode="rich" compact={true} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
                Grid Status Badge
              </h3>
              <GridStatusBadge showDetails={true} region="California, USA" />
              
              <div className="mt-3 flex gap-2">
                <GridStatusBadge carbonIntensity={180} compact={true} />
                <GridStatusBadge carbonIntensity={520} compact={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Carbon Footprint */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Carbon Impact</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
                Page Carbon Footprint
              </h3>
              <CarbonFootprint 
                pageSizeKB={250} 
                showBreakdown={true}
                serverLocation="Global CDN"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
                Compact Display
              </h3>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
                <p className="text-sm text-text-secondary mb-4">
                  Carbon badges can be embedded inline in your UI:
                </p>
                <div className="flex flex-wrap gap-2">
                  <CarbonFootprint pageSizeKB={150} compact={true} />
                  <CarbonFootprint pageSizeKB={500} compact={true} />
                  <CarbonFootprint pageSizeKB={1200} compact={true} />
                  <CarbonFootprint pageSizeKB={3000} compact={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Consensual Data Loading */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Consensual Data Loading</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
              Click-to-Load Media
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Users explicitly consent to data transfer. No auto-play, no surprise bandwidth consumption.
            </p>
          </div>

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
        </div>

        {/* Section 4: Data Cost Badge */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Data Cost Transparency</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3" style={{ letterSpacing: '0.05em' }}>
              Data Cost Badge
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Show users the environmental and financial cost of data-heavy actions before they commit.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DataCostBadge
              label="Download PDF"
              icon="📄"
              dataSizeKB={450}
              showCarbonCost={true}
              dismissible={true}
            />

            <DataCostBadge
              label="Load High-Res Images"
              icon="🖼️"
              dataSizeKB={2800}
              showCarbonCost={true}
              showFinancialCost={true}
              dismissible={true}
            />

            <DataCostBadge
              label="Stream Video HD"
              icon="🎬"
              dataSizeKB={12800}
              showCarbonCost={true}
              showFinancialCost={true}
              onAcknowledge={() => console.log('User acknowledged cost')}
            />
          </div>

          {showDataCost && (
            <div className="mt-6 bg-accent-primary/10 border border-accent-primary/30 rounded-card p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-text-primary mb-2">
                    Why Data Cost Badges Matter
                  </h4>
                  <p className="text-xs text-text-secondary mb-3">
                    Data transfer has both environmental and financial costs. By showing these costs upfront, 
                    we empower users to make informed decisions about their digital consumption.
                  </p>
                  <button
                    onClick={() => setShowDataCost(false)}
                    className="text-xs text-text-link hover:underline"
                  >
                    Got it, dismiss
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Documentation Section */}
        <div className="mt-12 pt-8 border-t border-borders-subtle">
          <h2 className="text-lg font-semibold text-text-primary mb-4">About These Components</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3">🌍 Planet-First Design</h3>
              <p className="text-xs text-text-secondary mb-3">
                These components embody the SOLAR framework philosophy: making the environmental 
                and data costs of digital experiences visible and controllable.
              </p>
              <ul className="text-xs text-text-secondary space-y-2">
                <li>• Energy mode awareness</li>
                <li>• Grid carbon intensity monitoring</li>
                <li>• Consensual data loading</li>
                <li>• Transparent cost display</li>
              </ul>
            </div>

            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-3">⚡ Technical Features</h3>
              <p className="text-xs text-text-secondary mb-3">
                Built with performance and accessibility in mind, following SOLAR design principles.
              </p>
              <ul className="text-xs text-text-secondary space-y-2">
                <li>• Zero external dependencies</li>
                <li>• CSS-only animations</li>
                <li>• Full TypeScript support</li>
                <li>• WCAG AA compliant</li>
                <li>• Mobile-first responsive</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <h3 className="text-sm font-semibold text-text-primary mb-3">📚 Integration Notes</h3>
            <p className="text-xs text-text-secondary mb-3">
              These components can be integrated with real-time APIs:
            </p>
            <ul className="text-xs text-text-secondary space-y-2">
              <li>• <strong>Electricity Maps API</strong> for real-time grid carbon intensity</li>
              <li>• <strong>CO2.js</strong> for carbon calculations</li>
              <li>• <strong>Performance API</strong> for page size estimation</li>
              <li>• <strong>Network Information API</strong> for connection quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnergyAwareShowcase

