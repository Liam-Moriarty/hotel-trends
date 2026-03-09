interface StarRatingProps {
  /** Raw score value */
  score: number
  /** The scale the score is on (e.g. 5 or 10) */
  outOf: number
  className?: string
}

/**
 * Renders a 1–5 star rating. Normalises scores out of 10 automatically.
 */
export function StarRating({ score, outOf, className }: StarRatingProps) {
  const normalised = outOf === 10 ? score / 2 : score
  return (
    <div className={`flex gap-0.5 ${className ?? ''}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={i <= Math.round(normalised) ? 'text-yellow-400' : 'text-muted-foreground'}
        >
          ★
        </span>
      ))}
    </div>
  )
}
