import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Getting Started/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Planet-first component library for React. Every component is engineered to consume less power by default.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Welcome: Story = {
  render: () => (
    <div data-theme="dark" style={{ background: '#000', minHeight: '100vh', padding: '40px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: '#EDEDED', letterSpacing: '-0.02em', margin: 0 }}>
              Solar Design System
            </h1>
            <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 6, background: 'rgba(200,225,90,0.15)', color: '#C8E15A' }}>
              v2.0
            </span>
          </div>
          <p style={{ fontSize: 16, color: '#9C9C9C', lineHeight: 1.6, margin: 0 }}>
            Planet-first component library for React. Every component is engineered to consume less power by default — dark-first colors, OLED-optimized surfaces, system fonts, and <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: 14, color: '#C8E15A' }}>prefers-reduced-motion</code> respected everywhere.
          </p>
        </div>

        {/* Quick Start */}
        <Section title="Quick Start">
          <Step number={1} title="Clone the repository">
            <CodeBlock lang="bash" code={`git clone https://github.com/ravipalwe/solardesignsystem.git\ncd solardesignsystem && npm install`} />
          </Step>
          <Step number={2} title="Start Storybook">
            <CodeBlock lang="bash" code="npm run storybook" />
            <p style={{ fontSize: 13, color: '#9C9C9C', marginTop: 8 }}>Opens at <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#EDEDED' }}>http://localhost:6006</code></p>
          </Step>
          <Step number={3} title="Import components">
            <CodeBlock lang="tsx" code={`import { Button, Card, Alert, Modal } from '@solar-ds/design-system'\nimport '@solar-ds/design-system/styles'`} />
          </Step>
        </Section>

        {/* Components */}
        <Section title="Component Library">
          <ComponentGroup label="Form" color="#C8E15A" items={['Button', 'Input', 'Textarea', 'Select', 'Checkbox', 'Switch', 'RadioGroup']} />
          <ComponentGroup label="UI" color="#14B8A6" items={['Card', 'Badge', 'Avatar', 'Alert', 'Modal', 'Toast', 'Tabs', 'Tooltip', 'Skeleton']} />
          <ComponentGroup label="Energy" color="#F59E0B" items={['EnergyMode', 'CarbonFootprint', 'ClickToLoad', 'GridStatus', 'DataCostBadge']} />
        </Section>

        {/* Themes */}
        <Section title="Themes">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <ThemeCard name="Dark" value="#000000" desc="Default. OLED-optimized." active />
            <ThemeCard name="Light" value="#FAFAF9" desc="Warm white." />
            <ThemeCard name="Dim" value="#0A0A0A" desc="Night mode." />
          </div>
          <CodeBlock lang="html" code='<html data-theme="dark">' />
        </Section>

        {/* Principles */}
        <Section title="Design Principles">
          <div style={{ display: 'grid', gap: 8 }}>
            <Principle icon="◼" text="Dark-first — Pure black canvas. Off pixels save OLED battery." />
            <Principle icon="Aa" text="System fonts — Zero HTTP requests for typography." />
            <Principle icon="⚡" text="GPU-light — CSS transitions, minimal shadows, no heavy compositing." />
            <Principle icon="⌨" text="focus-visible — Keyboard-only focus rings, not mouse clicks." />
            <Principle icon="◉" text="prefers-reduced-motion — All animations respect user settings." />
          </div>
        </Section>

        {/* Links */}
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <a href="https://github.com/ravipalwe/solardesignsystem" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: '#C8E15A', color: '#000', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="https://solardesignsystem.org" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 10, background: 'transparent', color: '#EDEDED', fontSize: 14, fontWeight: 500, textDecoration: 'none', border: '1px solid #303030' }}>
            Website
          </a>
        </div>
      </div>
    </div>
  ),
}

/* Helper Components */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: '#EDEDED', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #1E1E1E' }}>{title}</h2>
      {children}
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: '#C8E15A', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{number}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#EDEDED', marginBottom: 8 }}>{title}</div>
        {children}
      </div>
    </div>
  )
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div style={{ background: '#0E0E0E', border: '1px solid #1E1E1E', borderRadius: 8, padding: '12px 16px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 8, right: 12, fontSize: 10, fontWeight: 600, color: '#646464', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{lang}</div>
      <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: '#E5E5E5', fontFamily: 'Monaco, Menlo, monospace', whiteSpace: 'pre-wrap' }}>{code}</pre>
    </div>
  )
}

function ComponentGroup({ label, color, items }: { label: string; color: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#9C9C9C', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map(item => (
          <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#0E0E0E', border: '1px solid #1E1E1E', borderRadius: 6, fontSize: 12, fontFamily: 'Monaco, Menlo, monospace', color: '#EDEDED' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function ThemeCard({ name, value, desc, active }: { name: string; value: string; desc: string; active?: boolean }) {
  return (
    <div style={{ background: '#0E0E0E', border: `1px solid ${active ? '#C8E15A' : '#1E1E1E'}`, borderRadius: 10, padding: 16, textAlign: 'center' }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, background: value, border: '1px solid #303030', margin: '0 auto 8px' }} />
      <div style={{ fontSize: 13, fontWeight: 600, color: '#EDEDED' }}>{name}</div>
      <div style={{ fontSize: 11, color: '#646464', fontFamily: 'Monaco, Menlo, monospace' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#9C9C9C', marginTop: 4 }}>{desc}</div>
    </div>
  )
}

function Principle({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: '#0E0E0E', border: '1px solid #1E1E1E', borderRadius: 8 }}>
      <span style={{ fontSize: 14, color: '#C8E15A', fontWeight: 600, width: 24, textAlign: 'center', flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 13, color: '#9C9C9C', lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}
