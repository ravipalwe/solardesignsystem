import React, { useState } from 'react'

const DesignSystem = () => {
  const [activeTimeRange, setActiveTimeRange] = useState('7d')
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('option1')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('radio1')
  const [switchChecked, setSwitchChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('tab1')
  const [sliderValue, setSliderValue] = useState(50)
  const [showModal, setShowModal] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="min-h-screen bg-background-appCanvas text-text-primary font-sans">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Header */}
        <header className="bg-background-cardSurface border border-borders-subtle rounded-card px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold" style={{ letterSpacing: '-0.01em' }}>
            Solar Design System
          </h1>
          <p className="text-sm text-text-secondary mt-1">Version 1.0.0</p>
        </header>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Colors</h2>
          
          {/* Background Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Background</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background-appCanvas border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-background-appCanvas border border-borders-subtle rounded-input mb-2"></div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">App Canvas</p>
                <p className="text-xs text-text-tertiary">#000000</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-background-cardSurface border border-borders-subtle rounded-input mb-2"></div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Card Surface</p>
                <p className="text-xs text-text-tertiary">#121212</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-background-cardSurfaceHover border border-borders-subtle rounded-input mb-2"></div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Card Surface Hover</p>
                <p className="text-xs text-text-tertiary">#1A1A1A</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-background-badgeNeutral border border-borders-subtle rounded-input mb-2"></div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Badge Neutral</p>
                <p className="text-xs text-text-tertiary">#262626</p>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Text</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <p className="text-text-primary text-sm mb-2">Primary Text</p>
                <p className="text-xs text-text-tertiary">#E5E5E5</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <p className="text-text-secondary text-sm mb-2">Secondary Text</p>
                <p className="text-xs text-text-tertiary">#A3A3A3</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <p className="text-text-tertiary text-sm mb-2">Tertiary Text</p>
                <p className="text-xs text-text-tertiary">#737373</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <p className="text-text-link text-sm mb-2">Link Text</p>
                <p className="text-xs text-text-tertiary">#DDEE88</p>
              </div>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold mb-4">Accent</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-accent-primary rounded-input mb-2 flex items-center justify-center">
                  <span className="text-black font-bold">Primary</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Primary</p>
                <p className="text-xs text-text-tertiary">#DDEE88</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 bg-accent-primary-dim rounded-input mb-2 flex items-center justify-center">
                  <span className="text-black font-bold">Primary Dim</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Primary Dim</p>
                <p className="text-xs text-text-tertiary">#BBDD55</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-solar-amber font-bold">Solar Amber</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Solar Amber</p>
                <p className="text-xs text-text-tertiary">#F59E0B</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-oled_rose font-bold">OLED Rose</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">OLED Rose</p>
                <p className="text-xs text-text-tertiary">#E11D48</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-deep-teal font-bold">Deep Teal</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Deep Teal</p>
                <p className="text-xs text-text-tertiary">#0D9488</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-purple font-bold">Purple</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Purple</p>
                <p className="text-xs text-text-tertiary">#A78BFA</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-cyan font-bold">Cyan</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Cyan</p>
                <p className="text-xs text-text-tertiary">#22D3EE</p>
              </div>
              <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className="w-full h-16 rounded-input mb-2 flex items-center justify-center">
                  <span className="text-accent-success font-bold">Success</span>
                </div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Success</p>
                <p className="text-xs text-text-tertiary">#34D399</p>
              </div>
            </div>
          </div>

          {/* Border Colors */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Borders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background-cardSurface border-2 border-borders-subtle rounded-card p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Subtle</p>
                <p className="text-xs text-text-tertiary">#262626</p>
              </div>
              <div className="bg-background-cardSurface border-2 border-borders-contrast rounded-card p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Contrast</p>
                <p className="text-xs text-text-tertiary">#404040</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Typography</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.01em' }}>Heading 1</h1>
              <p className="text-xs text-text-tertiary">24px / Bold / -0.01em letter spacing</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Heading 2</h2>
              <p className="text-xs text-text-tertiary">18px / Semibold</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Heading 3</h3>
              <p className="text-xs text-text-tertiary">14px / Semibold</p>
            </div>
            <div>
              <p className="text-sm mb-2">Body Primary</p>
              <p className="text-xs text-text-tertiary">14px / Regular</p>
            </div>
            <div>
              <p className="text-sm text-text-secondary mb-2">Body Secondary</p>
              <p className="text-xs text-text-tertiary">14px / Regular / Secondary color</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">Label</p>
              <p className="text-xs text-text-tertiary">12px / Medium / Uppercase / 0.05em letter spacing</p>
            </div>
            <div>
              <p className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.01em' }}>24,567</p>
              <p className="text-xs text-text-tertiary">Stat Value - 24px / Bold / -0.01em letter spacing</p>
            </div>
            <div>
              <p className="text-xl font-bold mb-2">1,234</p>
              <p className="text-xs text-text-tertiary">Stat Metric - 20px / Bold</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-2">Small Text</p>
              <p className="text-xs text-text-tertiary">12px / Regular / Tertiary color</p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Spacing Scale</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-4">
            {[
              { name: 'XS', value: '4px', class: 'xs' },
              { name: 'SM', value: '8px', class: 'sm' },
              { name: 'MD', value: '16px', class: 'md' },
              { name: 'LG', value: '24px', class: 'lg' },
              { name: 'XL', value: '32px', class: 'xl' },
            ].map(({ name, value, class: spacingClass }) => (
              <div key={name} className="flex items-center gap-4">
                <div className="w-20">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">{name}</p>
                  <p className="text-xs text-text-tertiary">{value}</p>
                </div>
                <div className="flex-1 flex items-center">
                  <div className={`bg-accent-primary h-4`} style={{ width: value }}></div>
                  <span className="ml-2 text-xs text-text-tertiary">w-{spacingClass}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Border Radius</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Card', value: '24px', class: 'rounded-card' },
              { name: 'Button', value: '9999px', class: 'rounded-button' },
              { name: 'Input', value: '12px', class: 'rounded-input' },
              { name: 'Badge', value: '6px', class: 'rounded-badge' },
            ].map(({ name, value, class: radiusClass }) => (
              <div key={name} className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
                <div className={`bg-accent-primary h-16 mb-2 ${radiusClass}`}></div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">{name}</p>
                <p className="text-xs text-text-tertiary">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Buttons</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">Primary Button</p>
              <button className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors">
                Primary Button
              </button>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">Secondary Button</p>
              <button className="bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors">
                Secondary Button
              </button>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">Time Range Buttons</p>
              <div className="flex gap-2">
                {['1d', '7d', '30d', '90d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveTimeRange(range)}
                    className={`px-4 py-2 rounded-button text-sm font-semibold transition-colors ${
                      activeTimeRange === range
                        ? 'bg-accent-primary text-black'
                        : 'bg-background-cardSurface text-text-primary border border-borders-subtle hover:bg-background-cardSurfaceHover'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stat Card Component */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Stat Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👁️', label: 'Total Views', value: '1.2M', change: '+12.5%', positive: true },
              { icon: '💬', label: 'Engagement', value: '45.2K', change: '-3.2%', positive: false },
              { icon: '💰', label: 'Revenue', value: '$12.4K', change: '+8.1%', positive: true },
              { icon: '📊', label: 'Growth', value: '24.5%', change: '+5.2%', positive: true },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 hover:bg-background-cardSurfaceHover transition-colors flex flex-col"
              >
                <div className="text-2xl mb-4">{stat.icon}</div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">{stat.label}</p>
                <p className="text-2xl font-bold mb-2" style={{ letterSpacing: '-0.01em' }}>{stat.value}</p>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold w-fit ${
                    stat.positive
                      ? 'text-accent-success'
                      : 'text-accent-oled_rose'
                  }`}
                  style={{
                    backgroundColor: stat.positive ? 'rgba(52, 211, 153, 0.2)' : 'rgba(225, 29, 72, 0.2)'
                  }}
                >
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chart Card Component */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Chart Card</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
              <h3 className="text-lg font-semibold mb-6">Views Over Time</h3>
              <div className="h-48 flex items-end justify-between gap-2 mb-4">
                {[65, 45, 80, 55, 90, 70, 85].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-accent-primary hover:bg-accent-primary-dim transition-all rounded-t-sm"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  ></div>
                ))}
              </div>
              <div className="border-t border-borders-subtle pt-4 mt-4 flex justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Total</p>
                  <p className="text-xl font-bold">1.2M</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Average</p>
                  <p className="text-xl font-bold">171K</p>
                </div>
              </div>
            </div>
            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
              <h3 className="text-lg font-semibold mb-6">Engagement Metrics</h3>
              <div className="h-48 flex items-end justify-between gap-2 mb-4">
                {[50, 60, 45, 70, 55, 65, 75].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-accent-primary hover:bg-accent-primary-dim transition-all rounded-t-sm"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  ></div>
                ))}
              </div>
              <div className="border-t border-borders-subtle pt-4 mt-4 flex justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Total</p>
                  <p className="text-xl font-bold">45.2K</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-secondary mb-1">Average</p>
                  <p className="text-xl font-bold">6.5K</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Item Component */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Activity Item</h2>
          <div className="space-y-3">
            {[
              { icon: '📹', message: 'New video published: "Getting Started with React"', time: '2 hours ago' },
              { icon: '💬', message: 'Comment received on "Advanced TypeScript Tips"', time: '5 hours ago' },
              { icon: '👍', message: '100 likes reached on "CSS Grid Tutorial"', time: '1 day ago' },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="bg-background-badgeNeutral border border-borders-subtle rounded-input p-4 hover:bg-background-cardSurfaceHover transition-colors flex items-start gap-4"
              >
                <div className="text-xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary mb-1">{activity.message}</p>
                  <p className="text-xs text-text-tertiary">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Item Component */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Content Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                thumbnail: '🎬',
                title: 'Getting Started with React Hooks',
                views: '12.5K',
                engagement: '1.2K',
                revenue: '$245',
              },
              {
                thumbnail: '📚',
                title: 'Advanced TypeScript Patterns for Modern Development',
                views: '8.9K',
                engagement: '890',
                revenue: '$180',
              },
            ].map((content, idx) => (
              <div
                key={idx}
                className="bg-background-badgeNeutral border border-borders-subtle rounded-input p-4 hover:bg-background-cardSurfaceHover transition-colors flex items-start gap-4"
              >
                <div className="text-3xl flex-shrink-0">{content.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2">{content.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <span className="text-accent-cyan">👁️</span> {content.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-accent-purple">💬</span> {content.engagement}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-accent-success">💰</span> {content.revenue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Input Fields */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Input Fields</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
                Text Input
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text here..."
                className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
                Search Input
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">🔍</span>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
                Textarea
              </label>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter multiple lines of text..."
                rows={4}
                className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
                Disabled Input
              </label>
              <input
                type="text"
                value="Disabled input"
                disabled
                className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input px-4 py-2.5 text-sm text-text-tertiary cursor-not-allowed opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Select/Dropdown */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Select / Dropdown</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-2">
              Select Option
            </label>
            <select
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              className="w-full bg-background-badgeNeutral border border-borders-subtle rounded-input px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-colors"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </section>

        {/* Checkbox */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Checkbox</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                className="w-4 h-4 bg-background-badgeNeutral border border-borders-subtle rounded-badge text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 focus:ring-offset-background-appCanvas cursor-pointer"
              />
              <span className="text-sm text-text-primary">Checkbox Label</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={true}
                disabled
                className="w-4 h-4 bg-background-badgeNeutral border border-borders-subtle rounded-badge cursor-not-allowed opacity-50"
              />
              <span className="text-sm text-text-tertiary">Disabled Checkbox</span>
            </label>
          </div>
        </section>

        {/* Radio Buttons */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Radio Buttons</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                value="radio1"
                checked={radioValue === 'radio1'}
                onChange={(e) => setRadioValue(e.target.value)}
                className="w-4 h-4 bg-background-badgeNeutral border border-borders-subtle text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-text-primary">Radio Option 1</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                value="radio2"
                checked={radioValue === 'radio2'}
                onChange={(e) => setRadioValue(e.target.value)}
                className="w-4 h-4 bg-background-badgeNeutral border border-borders-subtle text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-text-primary">Radio Option 2</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="radio-group"
                value="radio3"
                checked={radioValue === 'radio3'}
                onChange={(e) => setRadioValue(e.target.value)}
                className="w-4 h-4 bg-background-badgeNeutral border border-borders-subtle text-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-sm text-text-primary">Radio Option 3</span>
            </label>
          </div>
        </section>

        {/* Switch/Toggle */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Switch / Toggle</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={switchChecked}
                  onChange={(e) => setSwitchChecked(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 rounded-button transition-colors ${
                    switchChecked ? 'bg-accent-primary' : 'bg-background-badgeNeutral'
                  } border border-borders-subtle`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      switchChecked ? 'translate-x-5' : 'translate-x-0.5'
                    } mt-0.5`}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-text-primary">Toggle Switch</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" checked={true} disabled className="sr-only" />
                <div className="w-11 h-6 rounded-button bg-accent-primary border border-borders-subtle opacity-50 cursor-not-allowed">
                  <div className="w-5 h-5 bg-white rounded-full translate-x-5 mt-0.5"></div>
                </div>
              </div>
              <span className="text-sm text-text-tertiary">Disabled Switch</span>
            </label>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Tabs</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <div className="flex gap-2 mb-6 border-b border-borders-subtle">
              {['tab1', 'tab2', 'tab3'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === tab
                      ? 'border-accent-primary text-text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab === 'tab1' ? 'Overview' : tab === 'tab2' ? 'Analytics' : 'Settings'}
                </button>
              ))}
            </div>
            <div className="text-sm text-text-secondary">
              {activeTab === 'tab1' && 'Overview content goes here...'}
              {activeTab === 'tab2' && 'Analytics content goes here...'}
              {activeTab === 'tab3' && 'Settings content goes here...'}
            </div>
          </div>
        </section>

        {/* Badges/Tags */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Badges / Tags</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 bg-background-badgeNeutral border border-borders-subtle rounded-badge text-xs font-semibold text-text-primary">
                Default Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-success"
                style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)' }}
              >
                Success Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-oled_rose"
                style={{ backgroundColor: 'rgba(225, 29, 72, 0.2)' }}
              >
                Error Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-deep-teal"
                style={{ backgroundColor: 'rgba(13, 148, 136, 0.2)' }}
              >
                Info Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-solar-amber"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
              >
                Warning Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-cyan"
                style={{ backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
              >
                Cyan Badge
              </span>
              <span
                className="inline-flex items-center px-2 py-1 rounded-badge text-xs font-semibold text-accent-purple"
                style={{ backgroundColor: 'rgba(167, 139, 250, 0.2)' }}
              >
                Purple Badge
              </span>
              <span className="inline-flex items-center px-2 py-1 bg-accent-primary rounded-badge text-xs font-semibold text-black">
                Primary Badge
              </span>
            </div>
          </div>
        </section>

        {/* Alerts/Notifications */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Alerts / Notifications</h2>
          <div className="space-y-3">
            <div
              className="bg-background-cardSurface border border-borders-subtle rounded-card p-4 flex items-start gap-3"
              style={{ borderLeftColor: '#34D399', borderLeftWidth: '3px' }}
            >
              <span className="text-accent-success text-xl">✓</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">Success Alert</p>
                <p className="text-sm text-text-secondary">This is a success message notification.</p>
              </div>
            </div>
            <div
              className="bg-background-cardSurface border border-borders-subtle rounded-card p-4 flex items-start gap-3"
              style={{ borderLeftColor: '#E11D48', borderLeftWidth: '3px' }}
            >
              <span className="text-accent-oled_rose text-xl">⚠</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">Error Alert</p>
                <p className="text-sm text-text-secondary">This is an error message notification.</p>
              </div>
            </div>
            <div
              className="bg-background-cardSurface border border-borders-subtle rounded-card p-4 flex items-start gap-3"
              style={{ borderLeftColor: '#0D9488', borderLeftWidth: '3px' }}
            >
              <span className="text-accent-deep-teal text-xl">ℹ</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">Info Alert</p>
                <p className="text-sm text-text-secondary">This is an informational message notification.</p>
              </div>
            </div>
            <div
              className="bg-background-cardSurface border border-borders-subtle rounded-card p-4 flex items-start gap-3"
              style={{ borderLeftColor: '#F59E0B', borderLeftWidth: '3px' }}
            >
              <span className="text-accent-solar-amber text-xl">⚠</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">Warning Alert</p>
                <p className="text-sm text-text-secondary">This is a warning message notification.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bars */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Progress Bars</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Progress</span>
                <span>{sliderValue}%</span>
              </div>
              <div className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-primary transition-all"
                  style={{ width: `${sliderValue}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Success Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full overflow-hidden">
                <div className="h-full bg-accent-success" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Error Progress</span>
                <span>30%</span>
              </div>
              <div className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full overflow-hidden">
                <div className="h-full bg-accent-oled_rose" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Warning Progress</span>
                <span>60%</span>
              </div>
              <div className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full overflow-hidden">
                <div className="h-full bg-accent-solar-amber" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-text-secondary mb-2">
                <span>Info Progress</span>
                <span>45%</span>
              </div>
              <div className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full overflow-hidden">
                <div className="h-full bg-accent-deep-teal" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Slider/Range */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Slider / Range</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <label className="block text-xs font-medium uppercase tracking-wider text-text-secondary mb-4">
              Range Slider: {sliderValue}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-2 bg-background-badgeNeutral border border-borders-subtle rounded-full appearance-none cursor-pointer accent-accent-primary"
            />
          </div>
        </section>

        {/* Dividers */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Dividers</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 space-y-6">
            <div>
              <p className="text-sm text-text-primary mb-4">Content above divider</p>
              <div className="border-t border-borders-subtle"></div>
              <p className="text-sm text-text-primary mt-4">Content below divider</p>
            </div>
            <div>
              <p className="text-sm text-text-primary mb-4">Content above contrast divider</p>
              <div className="border-t border-borders-contrast"></div>
              <p className="text-sm text-text-primary mt-4">Content below contrast divider</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary">Left</span>
              <div className="flex-1 border-t border-borders-subtle"></div>
              <span className="text-sm text-text-secondary">Right</span>
            </div>
          </div>
        </section>

        {/* Avatar Components */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Avatars</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-background-badgeNeutral border border-borders-subtle flex items-center justify-center text-accent-primary font-semibold text-sm">
                JD
              </div>
              <div className="w-12 h-12 rounded-full bg-background-badgeNeutral border border-borders-subtle flex items-center justify-center text-accent-primary font-semibold">
                AB
              </div>
              <div className="w-16 h-16 rounded-full bg-background-badgeNeutral border border-borders-subtle flex items-center justify-center text-accent-primary font-semibold text-lg">
                CD
              </div>
              <div className="w-20 h-20 rounded-full bg-background-badgeNeutral border-2 border-accent-primary flex items-center justify-center text-accent-primary font-semibold text-xl">
                EF
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Loading States</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-borders-subtle border-t-accent-primary rounded-full animate-spin"></div>
                <span className="text-sm text-text-secondary">Loading...</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border-2 border-borders-subtle border-t-accent-primary rounded-full animate-spin"></div>
                <span className="text-sm text-text-secondary">Loading...</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-accent-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Empty States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-12 text-center">
              <div className="text-4xl mb-4">📭</div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">No Items Found</h3>
              <p className="text-sm text-text-secondary mb-4">There are no items to display at this time.</p>
              <button className="bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primary-dim transition-colors">
                Add Item
              </button>
            </div>
            <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">No Results</h3>
              <p className="text-sm text-text-secondary mb-4">Try adjusting your search criteria.</p>
              <button className="bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
        </section>

        {/* Tooltip */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Tooltip</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <div className="relative inline-block">
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primary-dim transition-colors"
              >
                Hover for Tooltip
              </button>
              {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-background-cardSurface border border-borders-subtle rounded-input px-3 py-2 text-xs text-text-primary whitespace-nowrap z-10">
                  This is a tooltip message
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-borders-subtle"></div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Modal/Dialog */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Modal / Dialog</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primaryDim transition-colors"
            >
              Open Modal
            </button>
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
                <div
                  className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">Modal Title</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary mb-6">
                    This is a modal dialog example. Click outside or the close button to dismiss.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primary-dim transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Navigation Items */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Navigation Items</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <nav className="space-y-1">
              {[
                { icon: '🏠', label: 'Home', active: true },
                { icon: '📊', label: 'Dashboard', active: false },
                { icon: '📈', label: 'Analytics', active: false },
                { icon: '⚙️', label: 'Settings', active: false },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-2 rounded-input text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-background-badgeNeutral text-text-primary'
                      : 'text-text-secondary hover:bg-background-cardSurfaceHover hover:text-text-primary'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Layout Examples */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Layout Examples</h2>
          <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
            <h3 className="text-sm font-semibold mb-4">Container</h3>
            <div className="bg-background-badgeNeutral border border-borders-subtle rounded-input p-4">
              <p className="text-xs text-text-secondary mb-2">Max Width: 1280px</p>
              <p className="text-xs text-text-secondary mb-2">Padding: 24px horizontal, 24px vertical</p>
              <p className="text-xs text-text-tertiary">Classes: container mx-auto px-6 py-6 max-w-7xl</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DesignSystem
