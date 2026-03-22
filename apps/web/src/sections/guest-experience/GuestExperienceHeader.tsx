import { useState } from 'react'
import { Star, MessageSquare, Bell } from 'lucide-react'
import { KpiPill } from '@/components/KpiPill'
import { NegativeAlertModal } from './NegativeAlertModal'

export function GuestExperienceHeader() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            Guest Experience
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Real-time sentiment, CRM profiles &amp; service recovery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <KpiPill icon={<Star size={12} />} label="AVG SCORE" value="6.4 / 10" status="warning" />
          <KpiPill
            icon={<MessageSquare size={12} />}
            label="TOTAL REVIEWS"
            value="284"
            trend="+12"
            trendDir="up"
            trendSemantic="neutral"
          />
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-colors hover:brightness-95"
            style={{
              background: 'var(--status-error-bg)',
              borderColor: 'rgba(220, 38, 38, 0.25)',
              color: 'var(--status-error)',
            }}
            onClick={() => setModalOpen(true)}
          >
            <Bell size={12} />1 Negative Alert
          </div>
        </div>
      </div>

      {modalOpen && <NegativeAlertModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
