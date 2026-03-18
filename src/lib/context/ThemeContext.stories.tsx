import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider, useTheme } from './ThemeContext'
import type { SolarTheme } from './ThemeContext'

function ThemeDemo() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const themes: SolarTheme[] = ['dark', 'light', 'dim', 'system']

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-text-secondary text-sm mb-1">
          Current: <span className="text-text-primary font-medium">{theme}</span>
          {theme === 'system' && (
            <span className="text-text-tertiary"> → {resolvedTheme}</span>
          )}
        </p>
      </div>

      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${
              theme === t
                ? 'bg-accent-primary text-background-appCanvas'
                : 'bg-background-badgeNeutral text-text-primary hover:bg-background-cardSurfaceHover'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
          <h3 className="text-text-primary font-medium mb-2">Card Surface</h3>
          <p className="text-text-secondary text-sm">Secondary text on card</p>
          <p className="text-text-tertiary text-xs mt-1">Tertiary helper text</p>
        </div>
        <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
          <h3 className="text-accent-primary font-medium mb-2">Accent Colors</h3>
          <div className="flex flex-wrap gap-2">
            <span className="w-6 h-6 rounded-full bg-accent-primary" />
            <span className="w-6 h-6 rounded-full bg-accent-solar-amber" />
            <span className="w-6 h-6 rounded-full bg-accent-oled-rose" />
            <span className="w-6 h-6 rounded-full bg-accent-deep-teal" />
            <span className="w-6 h-6 rounded-full bg-accent-purple" />
            <span className="w-6 h-6 rounded-full bg-accent-cyan" />
            <span className="w-6 h-6 rounded-full bg-accent-success" />
          </div>
        </div>
      </div>

      <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
        <h3 className="text-text-primary font-medium mb-3">Form Preview</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Input field"
            className="w-full px-3 py-2 bg-background-badgeNeutral border border-borders-subtle rounded-input text-text-primary placeholder:text-text-tertiary text-sm"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-accent-primary text-background-appCanvas rounded-button text-sm font-medium">
              Primary
            </button>
            <button className="px-4 py-2 bg-background-badgeNeutral text-text-primary border border-borders-subtle rounded-button text-sm">
              Secondary
            </button>
            <button className="px-4 py-2 bg-accent-oled-rose text-white rounded-button text-sm font-medium">
              Danger
            </button>
          </div>
        </div>
      </div>

      <a href="#" className="text-text-link hover:underline text-sm">
        This is a link →
      </a>
    </div>
  )
}

function ThemeDemoWrapper() {
  return (
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  )
}

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeDemoWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ThemeDemoWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
