import { z } from 'zod'

// ---------------------------------------------------------------------------
// Energy Usage — /hotels/SAND01/hubos-energy
// One document per hourly reading slot for a given date.
// Matches EnergyDataPoint: { time, actual, target }
// ---------------------------------------------------------------------------

export const HubOsEnergyReadingSchema = z.object({
  hotelId: z.string(),
  date: z.string(), // "2024-01-15" — used for daily grouping/queries
  time: z.string(), // "06:00", "07:00" … — XAxis dataKey in AreaChart
  actual: z.number(), // kWh consumed in that hour (actual)
  target: z.number(), // kWh AI-optimised target for that hour
  // Optional enrichment for future Hub OS integration — not consumed by chart yet
  source: z.enum(['HVAC', 'Lighting', 'Kitchen', 'Mixed']).optional(),
  zone: z.string().optional(), // e.g. "Floor 1", "Restaurant", "Back of House"
})

export type HubOsEnergyReading = z.infer<typeof HubOsEnergyReadingSchema>

// ---------------------------------------------------------------------------
// Food Waste — /hotels/SAND01/hubos-food-waste
// One document per day.
// Matches FoodWasteDataPoint: { day, kg }
// Target (8kg) is a UI constant in the chart — not stored per-doc.
// ---------------------------------------------------------------------------

export const HubOsFoodWasteSchema = z.object({
  hotelId: z.string(),
  date: z.string(), // "2024-01-15" — ISO date for querying
  day: z.string(), // "Mon", "Tue" … — XAxis dataKey in BarChart
  kg: z.number(), // kg of food waste recorded that day
  // Optional enrichment
  mealPeriod: z.enum(['Breakfast', 'Lunch', 'Dinner', 'All Day']).optional(),
  notes: z.string().optional(),
})

export type HubOsFoodWaste = z.infer<typeof HubOsFoodWasteSchema>
