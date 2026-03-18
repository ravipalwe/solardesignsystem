import { useState, createContext, useContext, forwardRef } from 'react'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>')
  return ctx
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export interface TabsProps {
  /** The controlled active tab value */
  value?: string
  /** Default active tab (uncontrolled) */
  defaultValue?: string
  /** Called when active tab changes */
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Tabs = ({ value, defaultValue, onValueChange, children, className = '' }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const activeTab = value ?? internalValue

  const setActiveTab = (val: string) => {
    if (value === undefined) setInternalValue(val)
    onValueChange?.(val)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// TabsList
// ---------------------------------------------------------------------------

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={`inline-flex items-center gap-1 p-1 bg-background-badgeNeutral rounded-lg ${className}`}
      {...rest}
    >
      {children}
    </div>
  ),
)
TabsList.displayName = 'TabsList'

// ---------------------------------------------------------------------------
// TabsTrigger
// ---------------------------------------------------------------------------

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, className = '', ...rest }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext()
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(value)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-base ease-solar outline-none focus-visible:shadow-solar-focus ${
          isActive
            ? 'bg-background-cardSurface text-text-primary shadow-solar-sm'
            : 'text-text-secondary hover:text-text-primary'
        } ${className}`}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
TabsTrigger.displayName = 'TabsTrigger'

// ---------------------------------------------------------------------------
// TabsContent
// ---------------------------------------------------------------------------

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className = '', ...rest }, ref) => {
    const { activeTab } = useTabsContext()
    if (activeTab !== value) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={`mt-3 animate-fadeIn ${className}`}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
TabsContent.displayName = 'TabsContent'

// ---------------------------------------------------------------------------
// Export compound
// ---------------------------------------------------------------------------

export default Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
