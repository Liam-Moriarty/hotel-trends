import { indexCollection } from './indexing'

export async function indexHotelData(hotelId: string) {
  await indexCollection(
    hotelId,
    'snapshots',
    d =>
      `Snapshot ${d.date}: occupancy ${d.occupancy}%, RevPAR $${d.revpar}, ` +
      `ADR $${d.adr}, health score ${d.healthScore}/100.`
  )

  await indexCollection(
    hotelId,
    'alerts',
    d => `Alert on ${d.createdAt}: ${d.title}. ${d.description}`
  )

  await indexCollection(
    hotelId,
    'sentiment',
    d => `Review from ${d.source} on ${d.date} (score ${d.score}/5): ${d.reviewText}`
  )

  console.log('All collections indexed for hotel', hotelId)
}
