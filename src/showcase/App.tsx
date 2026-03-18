import { useState } from 'react'
import { EnergyAwareShowcase } from './EnergyAwareShowcase'
import { DesignSystemShowcase } from './DesignSystemShowcase'

function App() {
  const [view, setView] = useState<'energy' | 'design'>('energy')

  return (
    <div className="min-h-screen bg-background-appCanvas">
      {/* Navigation */}
      <nav
        className="bg-background-cardSurface border-b border-borders-subtle sticky top-0 z-50"
        role="navigation"
        aria-label="Main"
      >
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">☀️</span>
              <h1 className="text-lg font-bold text-text-primary">SOLAR Design System</h1>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Showcase sections">
              <button
                role="tab"
                aria-selected={view === 'energy'}
                onClick={() => setView('energy')}
                className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                  view === 'energy'
                    ? 'bg-accent-primary text-black'
                    : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
                }`}
              >
                Energy-Aware
              </button>
              <button
                role="tab"
                aria-selected={view === 'design'}
                onClick={() => setView('design')}
                className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                  view === 'design'
                    ? 'bg-accent-primary text-black'
                    : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
                }`}
              >
                Design System
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div role="tabpanel">
        {view === 'energy' && <EnergyAwareShowcase />}
        {view === 'design' && <DesignSystemShowcase />}
      </div>
    </div>
  )
}

export default App
