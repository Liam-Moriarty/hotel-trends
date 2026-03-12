import { indexCollection } from './indexing'

// Call the Indexing Function for Each Collection
// Create a top-level indexing entry point that indexes all relevant collections:

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
