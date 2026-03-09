import { useState } from 'react'
import { adminUsers, adminTabs } from '@/mocks'
import { AdminPageHeader } from '@/sections/admin/AdminPageHeader'
import { AdminPageTabs } from '@/sections/admin/AdminPageTabs'
import { UserManagementSection } from '@/sections/admin/UserManagementSection'
import { ComingSoonSection } from '@/sections/admin/ComingSoonSection'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('user-management')

  return (
    <div className="min-h-screen bg-background text-foreground p-8 text-sm">
      <div className="max-w-5xl mx-auto">
        <AdminPageHeader />

        <AdminPageTabs tabs={adminTabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'user-management' ? (
          <UserManagementSection users={adminUsers} />
        ) : (
          <ComingSoonSection tabs={adminTabs} activeTab={activeTab} />
        )}
      </div>
    </div>
  )
}
