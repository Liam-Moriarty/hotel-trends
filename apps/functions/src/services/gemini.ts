import { VertexAI, SchemaType } from '@google-cloud/vertexai'
import { runBigQuery, BQ_SCHEMA_HINT } from './bigquery.js'

// The Gemini Answer Service
// Uses function calling so Gemini can query BigQuery for structured data
// (revenue, occupancy, rate plans, rooms) while also using RAG context docs
// for unstructured data (sentiment, alerts, snapshots).

const vertexai = new VertexAI({
  project: 'hotel-trends-stage',
  location: 'us-central1',
})

// Tool definition: lets Gemini call BigQuery when it needs structured data
const bqTool = {
  functionDeclarations: [
    {
      name: 'query_hotel_data',
      description:
        'Run a BigQuery SQL query to retrieve structured hotel data: reservations, revenue, occupancy, rate plans, or room inventory. Use this when the question requires exact numbers, aggregations, or data not found in the context documents.',
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          sql: {
            type: SchemaType.STRING,
            description: 'A valid BigQuery standard SQL query.',
          },
        },
        required: ['sql'],
      },
    },
  ],
}

export async function askGemini(
  contextDocs: Record<string, unknown>[],
  question: string
): Promise<string> {
  const model = vertexai.getGenerativeModel({
    model: 'gemini-2.0-flash-001',
    generationConfig: { maxOutputTokens: 1024 },
    tools: [bqTool],
  })

  const context = contextDocs
    .map((d, i) => `Document ${i + 1}:\n${JSON.stringify(d, null, 2)}`)
    .join('\n\n')

  const systemPrompt = `You are an AI assistant for a hotel management platform called Hytel.
You have two sources of information:
1. CONTEXT DOCUMENTS below (qualitative data: sentiment, alerts, performance snapshots)
2. A BigQuery tool to query structured data (reservations, revenue, occupancy, rate plans, rooms)

Use context documents for questions about guest sentiment, alerts, and performance summaries.
Use the query_hotel_data function to retrieve structured data (rate plans, revenue, occupancy, rooms).
IMPORTANT: When you need structured data, you MUST call query_hotel_data. NEVER return raw SQL as your answer text.
You may use both sources if needed. Always give a specific, helpful answer.

Format your responses using markdown:
- Use tables for structured data (rate plans, room types, availability figures)
- Use bullet points or numbered lists for multiple items
- Use **bold** for key metrics or important values
- Keep responses concise but complete

${BQ_SCHEMA_HINT}

CONTEXT DOCUMENTS:
${context || 'No context documents available.'}

QUESTION: ${question}`

  const chat = model.startChat({ tools: [bqTool] })
  let result = await chat.sendMessage(systemPrompt)

  // Agentic loop: Gemini may call BigQuery one or more times before answering
  for (let i = 0; i < 3; i++) {
    const candidate = result.response.candidates?.[0]
    if (!candidate) break

    const functionCalls = candidate.content.parts.filter(p => p.functionCall)
    if (functionCalls.length === 0) break

    // Execute each BigQuery function call and return results to Gemini
    const functionResponses = await Promise.all(
      functionCalls.map(async part => {
        const call = part.functionCall!
        let queryResult: unknown
        try {
          const rows = await runBigQuery((call.args as Record<string, string>).sql)
          queryResult = rows.length > 0 ? rows : 'No results found.'
        } catch (err) {
          queryResult = `Query error: ${err instanceof Error ? err.message : String(err)}`
        }
        return {
          functionResponse: {
            name: call.name,
            response: { result: queryResult },
          },
        }
      })
    )

    result = await chat.sendMessage(functionResponses)
  }

  const finalCandidate = result.response.candidates?.[0]
  if (!finalCandidate) throw new Error('No response from Gemini')

  const text = finalCandidate.content.parts.find(p => p.text)?.text
  if (!text) throw new Error('No text in response from Gemini')

  return text
}
