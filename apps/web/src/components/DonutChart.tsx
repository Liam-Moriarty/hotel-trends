import type { SentimentBreakdown } from '@/interface'

interface DonutChartProps {
  data: SentimentBreakdown[]
  size?: number
  strokeWidth?: number
}

/**
 * SVG-based donut chart using the SentimentBreakdown data shape.
 * No external chart library dependency — purely SVG arcs.
 */
export function DonutChart({ data, size = 160, strokeWidth = 20 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const cx = size / 2
  const cy = size / 2
  const radius = cx - strokeWidth / 2 - 2

  let cumulative = 0

  const segments = data.map(d => {
    const pct = d.value / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const endAngle = (cumulative + pct) * 2 * Math.PI - Math.PI / 2
    cumulative += pct

    const x1 = cx + radius * Math.cos(startAngle)
    const y1 = cy + radius * Math.sin(startAngle)
    const x2 = cx + radius * Math.cos(endAngle)
    const y2 = cy + radius * Math.sin(endAngle)
    const largeArc = pct > 0.5 ? 1 : 0

    return {
      ...d,
      d: `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-36 h-36">
      {segments.map(s => (
        <path
          key={s.label}
          d={s.d}
          fill="none"
          stroke={s.color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  )
}
