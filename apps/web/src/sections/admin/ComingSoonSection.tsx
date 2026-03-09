import type { AdminTab } from '@/interface'

interface ComingSoonSectionProps {
  tabs: AdminTab[]
  activeTab: string
}

export function ComingSoonSection({ tabs, activeTab }: ComingSoonSectionProps) {
  return (
    <p className="text-muted-foreground mt-8">
      {tabs.find(t => t.id === activeTab)?.label} — coming soon.
    </p>
  )
}
