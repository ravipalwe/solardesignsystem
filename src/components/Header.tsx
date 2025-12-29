const Header = () => {
  return (
    <header className="border-b border-borders-subtle bg-background-cardSurface">
      <div className="container mx-auto px-6 py-4 max-w-7xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary" style={{ letterSpacing: '-0.01em' }}>
            Creator Analytics
          </h1>
          <p className="text-sm text-text-secondary mt-1">Track your content performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-background-badgeNeutral border border-borders-subtle flex items-center justify-center">
            <span className="text-accent-primary font-semibold">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

