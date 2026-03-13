import { indexCollection } from './indexing.js'

// Call the Indexing Function for Each Collection
// Create a top-level indexing entry point that indexes all relevant collections:

export async function indexHotelData(hotelId: string) {
  await indexCollection(
    hotelId,
    'snapshots',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) =>
      `Snapshot ${d.date}: occupancy ${d.occupancy}%, RevPAR $${d.revpar}, ` +
      `ADR $${d.adr}, health score ${d.healthScore}/100.`
  )

  await indexCollection(
    hotelId,
    'alerts',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) => `Alert on ${d.createdAt}: ${d.title}. ${d.description}`
  )

  await indexCollection(
    hotelId,
    'sentiment',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) => `Review from ${d.source} on ${d.date} (score ${d.score}/5): ${d.reviewText}`
  )

  console.log('All collections indexed for hotel', hotelId)
}
