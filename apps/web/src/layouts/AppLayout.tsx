import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { PAGES } from '@/constants'
import { useState } from 'react'

const AppLayout = () => {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const PageComponent = PAGES[currentPage as keyof typeof PAGES] || PAGES['dashboard']

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(v => !v)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
