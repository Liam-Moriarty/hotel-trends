import { BigQuery } from '@google-cloud/bigquery'

// BigQuery Service
// Executes SQL queries against the hotel_trends dataset.
// Called by Gemini via function calling when the question requires
// structured/analytical data (revenue, occupancy trends, rate plans, rooms).

const PROJECT_ID = 'hotel-trends-stage'
const DATASET_ID = 'hotel_trends'

const bq = new BigQuery({ projectId: PROJECT_ID })

export async function runBigQuery(sql: string): Promise<Record<string, unknown>[]> {
  const [rows] = await bq.query({
    query: sql,
    location: 'asia-southeast1',
    maximumBytesBilled: String(100 * 1024 * 1024), // 100 MB cap
  })

  return (rows as Record<string, unknown>[]).slice(0, 50) // cap at 50 rows to Gemini
}

// Schema hint passed to Gemini so it can write correct SQL
export const BQ_SCHEMA_HINT = `
BigQuery project: ${PROJECT_ID}, dataset: ${DATASET_ID}

Always reference tables with full path using backticks, e.g.:
  SELECT * FROM \`${PROJECT_ID}.${DATASET_ID}.rate_plans\` WHERE hotelId = 'SAND01'

Tables:
- \`${PROJECT_ID}.${DATASET_ID}.reservations\`(hotelId, reservationId, confirmationId, reservationStatus, arrivalDate DATE, departureDate DATE, nights INT, totalAmount FLOAT, currencyCode, roomType, roomNumber, roomClass, ratePlanCode, marketCode, sourceCode, channel, paymentMethod, guaranteeCode, vipCode, createdBy)
- \`${PROJECT_ID}.${DATASET_ID}.availability\`(hotelId, date DATE, totalRooms INT, occupiedRooms INT, availableRooms INT, occupancyRate FLOAT)
- \`${PROJECT_ID}.${DATASET_ID}.rate_plans\`(hotelId, ratePlanCode, ratePlanName, marketCode, sourceCode, channel, isRefundable BOOL, cancellationPolicy, commissionPct FLOAT, roomType, ratePerNight FLOAT)
- \`${PROJECT_ID}.${DATASET_ID}.rooms\`(hotelId, roomNumber, roomType, roomClass, floor INT, maxOccupancy INT, baseRatePerNight FLOAT, isActive BOOL)

Always include WHERE hotelId = 'SAND01'. Use standard SQL only.
`.trim()
