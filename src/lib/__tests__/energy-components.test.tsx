import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import EnergyModeIndicator from '../components/energy/EnergyModeIndicator'
import CarbonFootprint from '../components/energy/CarbonFootprint'
import DataCostBadge from '../components/energy/DataCostBadge'
import ClickToLoadMedia from '../components/energy/ClickToLoadMedia'

// ---------------------------------------------------------------------------
// EnergyModeIndicator
// ---------------------------------------------------------------------------

describe('EnergyModeIndicator', () => {
  it('renders eco mode correctly', () => {
    render(<EnergyModeIndicator mode="eco" />)
    expect(screen.getByText('Eco Mode')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders standard mode correctly', () => {
    render(<EnergyModeIndicator mode="standard" />)
    expect(screen.getByText('Standard Mode')).toBeInTheDocument()
  })

  it('renders rich mode correctly', () => {
    render(<EnergyModeIndicator mode="rich" />)
    expect(screen.getByText('Rich Mode')).toBeInTheDocument()
  })

  it('shows description when showDescription is true', () => {
    render(<EnergyModeIndicator mode="eco" showDescription={true} />)
    expect(screen.getByText(/High grid intensity/)).toBeInTheDocument()
  })

  it('hides description when showDescription is false', () => {
    render(<EnergyModeIndicator mode="eco" showDescription={false} />)
    expect(screen.queryByText(/High grid intensity/)).not.toBeInTheDocument()
  })

  it('renders compact variant', () => {
    render(<EnergyModeIndicator mode="eco" compact />)
    expect(screen.getByText('Eco Mode')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<EnergyModeIndicator mode="standard" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Energy mode: Standard Mode')
  })
})

// ---------------------------------------------------------------------------
// CarbonFootprint
// ---------------------------------------------------------------------------

describe('CarbonFootprint', () => {
  it('renders with provided page size', () => {
    render(<CarbonFootprint pageSizeKB={250} />)
    expect(screen.getByText('Carbon Footprint')).toBeInTheDocument()
    expect(screen.getByText(/CO₂/)).toBeInTheDocument()
  })

  it('shows breakdown when enabled', () => {
    render(<CarbonFootprint pageSizeKB={500} showBreakdown />)
    expect(screen.getByText('Page Size')).toBeInTheDocument()
    expect(screen.getByText('Data Transfer')).toBeInTheDocument()
    expect(screen.getByText('Grid Intensity')).toBeInTheDocument()
  })

  it('renders compact variant', () => {
    render(<CarbonFootprint pageSizeKB={250} compact />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows server location', () => {
    render(<CarbonFootprint pageSizeKB={250} serverLocation="EU West" />)
    expect(screen.getByText('EU West')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// DataCostBadge
// ---------------------------------------------------------------------------

describe('DataCostBadge', () => {
  it('renders label and data size', () => {
    render(<DataCostBadge label="Download File" dataSizeKB={1024} />)
    expect(screen.getByText('Download File')).toBeInTheDocument()
    expect(screen.getAllByText('1.0 MB').length).toBeGreaterThanOrEqual(1)
  })

  it('shows carbon cost by default', () => {
    render(<DataCostBadge label="Test" dataSizeKB={500} />)
    expect(screen.getByText('Carbon Cost')).toBeInTheDocument()
  })

  it('shows financial cost when enabled', () => {
    render(<DataCostBadge label="Test" dataSizeKB={500} showFinancialCost />)
    expect(screen.getByText('Estimated Cost')).toBeInTheDocument()
  })

  it('calls onAcknowledge when button clicked', () => {
    const onAck = vi.fn()
    render(<DataCostBadge label="Test" dataSizeKB={500} onAcknowledge={onAck} />)
    fireEvent.click(screen.getByText('Continue Anyway'))
    expect(onAck).toHaveBeenCalledOnce()
  })

  it('dismisses when cancel clicked', () => {
    render(<DataCostBadge label="Test" dataSizeKB={500} dismissible />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })

  it('shows correct size level', () => {
    render(<DataCostBadge label="Test" dataSizeKB={200} />)
    expect(screen.getByText('Light')).toBeInTheDocument()
  })

  it('shows Heavy for large files', () => {
    render(<DataCostBadge label="Test" dataSizeKB={10240} />)
    expect(screen.getByText('Heavy')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// ClickToLoadMedia
// ---------------------------------------------------------------------------

describe('ClickToLoadMedia', () => {
  it('renders placeholder with data cost info', () => {
    render(<ClickToLoadMedia type="image" src="/test.jpg" dataSizeKB={850} />)
    expect(screen.getByText('Image not loaded')).toBeInTheDocument()
    expect(screen.getAllByText('850 KB').length).toBeGreaterThanOrEqual(1)
  })

  it('shows video label for video type', () => {
    render(<ClickToLoadMedia type="video" src="/test.mp4" />)
    expect(screen.getByText('Video not loaded')).toBeInTheDocument()
  })

  it('shows load button', () => {
    render(<ClickToLoadMedia type="image" src="/test.jpg" />)
    expect(screen.getByRole('button', { name: /load image/i })).toBeInTheDocument()
  })

  it('enters loading state when clicked', () => {
    render(<ClickToLoadMedia type="image" src="/test.jpg" />)
    fireEvent.click(screen.getByRole('button', { name: /load image/i }))
    expect(screen.getByText(/loading image/i)).toBeInTheDocument()
  })
})
