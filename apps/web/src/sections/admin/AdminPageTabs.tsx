import type { AdminTab } from '@/interface'

interface AdminPageTabsProps {
  tabs: AdminTab[]
  activeTab: string
  onTabChange: (id: string) => void
}

export function AdminPageTabs({ tabs, activeTab, onTabChange }: AdminPageTabsProps) {
  return (
    <div className="inline-flex items-center bg-muted rounded-lg p-1 gap-0.5 mb-6">
      {tabs.map(t => {
        const isActive = activeTab === t.id
        return (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}
