export function occupancyColor(occ: number): string {
  if (occ >= 85) return 'bg-green-500'
  if (occ >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
}

export function heatmapBg(val: number | null): string {
  if (val === null) return 'bg-transparent text-transparent'
  if (val >= 85) return 'bg-indigo-600 text-white'
  if (val >= 70) return 'bg-indigo-500 text-white'
  if (val >= 55) return 'bg-indigo-400 text-white'
  return 'bg-slate-700 text-slate-400'
}
