interface Props {
  pct: number
  color: string
  size?: number
}

export function RingIndicator({ pct, color, size = 40 }: Props) {
  const r = 16,
    cx = 20,
    cy = 20
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-active)" strokeWidth={4} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontWeight="bold"
        fill="var(--text-primary)"
      >
        {pct}%
      </text>
    </svg>
  )
}
