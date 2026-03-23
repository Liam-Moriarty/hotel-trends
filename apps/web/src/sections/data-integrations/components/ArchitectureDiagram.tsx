import { ChevronRight } from 'lucide-react'

const COLUMNS = [
  {
    id: 'source',
    label: 'Source Systems',
    labelColor: 'var(--text-muted)',
    nodes: ['PMS', 'CRS', 'POS', 'MICE'],
    nodeBg: 'var(--surface-container-high)',
    nodeBorder: 'var(--border-subtle)',
    nodeText: 'var(--text-secondary)',
  },
  {
    id: 'lake',
    label: 'Cloud Data Lake',
    labelColor: 'var(--accent-cool)',
    nodes: ['Raw Zone', 'Transform', 'Curated'],
    nodeBg: 'var(--accent-cool-muted)',
    nodeBorder: 'rgba(74, 114, 196, 0.30)',
    nodeText: 'var(--accent-cool)',
  },
  {
    id: 'ai',
    label: 'AI & Analytics',
    labelColor: 'var(--accent-violet)',
    nodes: ['Forecasting', 'ML Models', 'Dashboards'],
    nodeBg: 'var(--accent-violet-muted)',
    nodeBorder: 'rgba(124, 107, 184, 0.30)',
    nodeText: 'var(--accent-violet)',
  },
  {
    id: 'dist',
    label: 'Distribution',
    labelColor: 'var(--status-warning)',
    nodes: ['Reports', 'Alerts', 'APIs'],
    nodeBg: 'var(--status-warning-bg)',
    nodeBorder: 'rgba(217, 119, 6, 0.30)',
    nodeText: 'var(--status-warning)',
  },
]

export function ArchitectureDiagram() {
  return (
    <div className="w-full">
      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        Data Architecture
      </p>
      <p className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>
        End-to-end data flow from source systems to distribution
      </p>

      <div className="flex items-start justify-between gap-0">
        {COLUMNS.map((col, colIdx) => (
          <div key={col.id} className="flex items-start gap-0 flex-1">
            {/* Column */}
            <div className="flex flex-col gap-3 flex-1">
              {/* Column header */}
              <div
                className="pb-2 text-center"
                style={{ borderBottom: `2px solid ${col.labelColor}` }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: col.labelColor }}
                >
                  {col.label}
                </p>
              </div>

              {/* Nodes */}
              <div className="flex flex-col gap-2">
                {col.nodes.map(node => (
                  <div
                    key={node}
                    className="px-3 py-2 rounded-lg border text-xs font-medium text-center"
                    style={{
                      background: col.nodeBg,
                      borderColor: col.nodeBorder,
                      color: col.nodeText,
                    }}
                  >
                    {node}
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow between columns */}
            {colIdx < COLUMNS.length - 1 && (
              <div
                className="flex flex-col items-center justify-start shrink-0 px-2"
                style={{ paddingTop: 48 }}
              >
                <ChevronRight size={16} style={{ color: 'var(--border-default)' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div
        className="mt-8 p-4 rounded-lg"
        style={{
          background: 'var(--surface-container-high)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-muted)' }}
        >
          Layer Description
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            {
              label: 'Source Systems',
              desc: 'PMS, CRS, POS, and MICE integration points',
              color: 'var(--text-muted)',
            },
            {
              label: 'Cloud Data Lake',
              desc: 'Three-zone architecture: Raw → Transform → Curated',
              color: 'var(--accent-cool)',
            },
            {
              label: 'AI & Analytics',
              desc: 'Forecasting models, ML pipelines, live dashboards',
              color: 'var(--accent-violet)',
            },
            {
              label: 'Distribution',
              desc: 'Reports, smart alerts, and external API delivery',
              color: 'var(--status-warning)',
            },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-2">
              <span
                className="w-2 h-2 rounded-full mt-0.5 shrink-0"
                style={{ background: item.color }}
              />
              <div>
                <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.label}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
