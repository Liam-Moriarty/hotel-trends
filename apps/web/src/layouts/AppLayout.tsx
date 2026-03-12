import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import { FlowtingChatbot } from '@/components/FlowtingChatbot'

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed(v => !v)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto">
          <Outlet />

          <FlowtingChatbot />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
