export function occupancyColor(occ: number): string {
  if (occ >= 85) return 'bg-status-success'
  if (occ >= 60) return 'bg-status-warning'
  return 'bg-status-error'
}

export function heatmapBg(val: number | null): string {
  if (val === null) return 'heatmap-empty'
  if (val >= 85) return 'heatmap-high'
  if (val >= 70) return 'heatmap-med-high'
  if (val >= 55) return 'heatmap-med'
  return 'heatmap-low'
}
