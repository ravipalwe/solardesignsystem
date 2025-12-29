import { useState } from 'react'
import DesignSystem from './components/DesignSystem'
import EnergyAwareShowcase from './components/EnergyAwareShowcase'

function App() {
  const [view, setView] = useState<'energy' | 'design'>('energy')

  return (
    <div className="min-h-screen bg-background-appCanvas">
      {/* Navigation */}
      <nav className="bg-background-cardSurface border-b border-borders-subtle sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">☀️</span>
              <h1 className="text-lg font-bold text-text-primary">SOLAR Design System</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('energy')}
                className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                  view === 'energy'
                    ? 'bg-accent-primary text-black'
                    : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
                }`}
              >
                ⚡ Energy-Aware
              </button>
              <button
                onClick={() => setView('design')}
                className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                  view === 'design'
                    ? 'bg-accent-primary text-black'
                    : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
                }`}
              >
                🎨 Design System
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      {view === 'energy' && <EnergyAwareShowcase />}
      {view === 'design' && <DesignSystem />}
    </div>
  )
}

export default App

